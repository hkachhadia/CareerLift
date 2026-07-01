import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || 'placeholder' });

export const generateCareerReport = async (resumeText: string, githubData: any, targetRole: string) => {
  try {
    const prompt = `
    Act as an expert AI Career Mentor. I am providing you with a user's extracted resume text and their GitHub statistics.
    The user is aiming for the target role: ${targetRole}.

    Resume Text:
    ${resumeText}

    GitHub Data:
    ${JSON.stringify(githubData)}

    Please analyze this data and generate a comprehensive JSON report containing:
    1. Overall career score (0-100)
    2. Resume score (0-100)
    3. ATS compatibility score (0-100)
    4. Strengths (Array of strings)
    5. Weaknesses (Array of strings)
    6. Missing skills for the target role (Array of strings)
    7. Recommendations (Array of actionable strings)
    8. Skill comparisons (Array of objects with { skillName, currentScore, recommendedScore })

    Output ONLY valid JSON.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      }
    });

    if (response.text) {
      return JSON.parse(response.text);
    }
    throw new Error("Empty response from Gemini");
  } catch (error) {
    console.error('Error generating AI report:', error);
    return null;
  }
};
