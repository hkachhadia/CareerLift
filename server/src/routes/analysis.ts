import express from 'express';
import multer from 'multer';
import { extractTextFromPDF } from '../services/resumeParser';
import { fetchGitHubData } from '../services/github';
import { generateCareerReport } from '../services/gemini';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/generate-report', upload.single('resume'), async (req: any, res: any) => {
  try {
    const { githubUsername, targetRole } = req.body;
    
    if (!req.file || !targetRole) {
      return res.status(400).json({ error: 'Resume file and Target Role are required.' });
    }

    // 1. Extract Resume Text
    const resumeText = await extractTextFromPDF(req.file.buffer);

    // 2. Fetch GitHub Data
    let githubData = null;
    if (githubUsername) {
      githubData = await fetchGitHubData(githubUsername);
    }

    // 3. Generate AI Report
    const report = await generateCareerReport(resumeText, githubData, targetRole);

    if (!report) {
      return res.status(500).json({ error: 'Failed to generate AI report' });
    }

    res.json({ success: true, report });

  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
