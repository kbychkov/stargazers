const Octokit = require('@octokit/rest');
const HttpsProxyAgent = require('https-proxy-agent');

const octokit = new Octokit();

module.exports = async (owner, repo) => {
  const config = {
    method: 'GET',
    url: `/repos/${owner}/${repo}/stargazers?per_page=100`,
    headers: {
      accept: 'application/vnd.github.v3.star+json'
    },
    request: {}
  };

  if (process.env.GITHUB_TOKEN) {
    config.headers.authorization = `token ${process.env.GITHUB_TOKEN}`;
  }

  if (process.env.PROXY) {
    config.request.agent = new HttpsProxyAgent(process.env.PROXY);
  }

  const result = await octokit.paginate(config);

  return result;
};
