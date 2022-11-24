#!/usr/bin/env node

require('dotenv').config();

const { prepareStats } = require('../src/prepare-stats/prepare-stats');
const { pushStats } = require('../src/push-stats');

const {
    SLACK_WEBHOOK_URL,
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
    until: UNTIL || new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    since: SINCE || new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
};

(async () => {
    console.log(timePeriod);
    const statistics = await prepareStats(COLLECTION_PATH, commonRequestData, timePeriod);

    await pushStats(statistics, SLACK_WEBHOOK_URL);
})();
