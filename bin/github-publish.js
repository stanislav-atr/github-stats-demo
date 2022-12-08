#!/usr/bin/env node

require('dotenv').config();

const { prepareStats } = require('../src/prepare-stats/prepare-stats');
const { publishStats } = require('../src/publish-stats');

const {
    OAUTH_TOKEN,
    CHANNEL_ID,
    COLLECTION_PATH,
    REPO,
    SINCE,
    UNTIL,
} = process.env;

const commonRequestData = {
    owner: REPO.split('/')[0],
    repo: REPO.split('/')[1],
};

// Set defaults to last 24h period
const timePeriod = {
    until: UNTIL || new Date().toISOString(),
    since: SINCE || new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
};

(async () => {
    const statistics = await prepareStats(COLLECTION_PATH, commonRequestData, timePeriod);
    // const statistics = {
    //     repoStat: {
    //         timePeriod: { until: '2022-11-21T15:00:00Z', since: '2022-11-20T00:00:00Z' },
    //         newIssues: 136,
    //         resolvedIssues: 128,
    //         closedAsStaleIssues: 4,
    //         newPulls: 4,
    //         mergedPulls: 2,
    //         remainingIssues: 154,
    //     },
    //     activityStat: {
    //         'Sergey-Lyapin': 29,
    //         oatmealine: 1,
    //         'adguard-bot': 30,
    //         mercury233: 1,
    //         Yuki2718: 21,
    //         'github-actions[bot]': 4,
    //         Oniqqqq: 2,
    //         BlazDT: 10,
    //         t3chnob0y: 2,
    //         tox1c90: 1,
    //         jimmysofat6864: 3,
    //         PhoenixIndigo: 1,
    //         T3rm1: 3,
    //         shape55: 1,
    //         zkeq: 1,
    //         sekretneyslysby: 2,
    //         zloyden: 65,
    //         piquark6046: 14,
    //         JobcenterTycoon: 1,
    //         AdamWr: 92,
    //         'Alex-302': 70,
    //         VladisLoveZh: 1,
    //         SebastianRasch: 1,
    //         krystian3w: 1,
    //         ilvjyw: 1,
    //         DandelionSprout: 1,
    //         lica98: 1,
    //         'kou-kee': 1,
    //     },
    //     activitiesByType: {
    //         'Sergey-Lyapin': {
    //             resolvedIssues: 15,
    //             newPulls: 0,
    //             mergedPulls: 0,
    //             pullRequestsReview: 0,
    //             totalCommits: 14,
    //             totalComments: 0,
    //         },
    //         oatmealine: {
    //             resolvedIssues: 0,
    //             newPulls: 0,
    //             mergedPulls: 0,
    //             pullRequestsReview: 0,
    //             totalCommits: 0,
    //             totalComments: 1,
    //         },
    //     },
    // };
    await publishStats(OAUTH_TOKEN, CHANNEL_ID, statistics);
})();
