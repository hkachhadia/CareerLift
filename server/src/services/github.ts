export const fetchGitHubData = async (username: string) => {
  try {
    const headers: Record<string, string> = {
      Accept: 'application/vnd.github.v3+json',
    };

    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `token ${process.env.GITHUB_TOKEN}`;
    }

    const userResponse = await fetch(`https://api.github.com/users/${username}`, { headers });
    if (!userResponse.ok) throw new Error('GitHub User not found');
    const userData = await userResponse.json();

    const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`, { headers });
    const reposData = await reposResponse.json();

    let totalStars = 0;
    let languages = new Set<string>();

    reposData.forEach((repo: any) => {
      totalStars += repo.stargazers_count;
      if (repo.language) languages.add(repo.language);
    });

    return {
      username: userData.login,
      publicRepos: userData.public_repos,
      followers: userData.followers,
      totalStars,
      languages: Array.from(languages),
      githubScore: Math.min(100, (totalStars * 2) + (userData.public_repos * 1) + (userData.followers * 0.5)),
    };
  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    return null;
  }
};
