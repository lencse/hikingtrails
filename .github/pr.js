#!/usr/bin/env node

const core = require('@actions/core');
const { GitHub, context } = require('@actions/github');

async function main() {
    const token = process.env.GITHB_TOKEN;
    const sha = process.env.GITHB_SHA;

    const client = new GitHub(token, {});
    const result = await client.repos.listPullRequestsAssociatedWithCommit({
        owner: context.repo.owner,
        repo: context.repo.repo,
        commit_sha: sha || context.sha,
    });

    console.dir(result.data)
}

main().catch(err => core.setFailed(err.message));
