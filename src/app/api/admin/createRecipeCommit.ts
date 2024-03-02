import { Octokit } from "octokit";

import type { NextApiRequest, NextApiResponse } from "next";
/*
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Process a POST request

    const octokit = new Octokit({
      auth: process.env.PERSONAL_ACCESS_TOKEN
    })
  
    await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
      owner: 'OWNER',
      repo: 'REPO',
      path: 'PATH',
      message: 'my commit message',
      committer: {
        name: 'Monalisa Octocat',
        email: 'octocat@github.com'
      },
      content: 'bXkgbmV3IGZpbGUgY29udGVudHM=',
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    })  

  } else {
    // Handle any other HTTP method
  }
}

export const createRecipeCommit = async () => {

  const octokit = new Octokit({
    auth: process.env.PERSONAL_ACCESS_TOKEN
  })

  await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
    owner: 'OWNER',
    repo: 'REPO',
    path: 'PATH',
    message: 'my commit message',
    committer: {
      name: 'Monalisa Octocat',
      email: 'octocat@github.com'
    },
    content: 'bXkgbmV3IGZpbGUgY29udGVudHM=',
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })

}
*/
