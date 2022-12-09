#!/usr/bin/env node
import * as dotenv from 'dotenv';
import { prepareStats } from '../src/prepare-stats/prepare-stats';
import { publishStats } from '../src/publish-stats';

dotenv.config();

const {
    LEGEND_MESSAGE_URL,
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
    await publishStats(OAUTH_TOKEN, LEGEND_MESSAGE_URL, CHANNEL_ID, statistics);
})();
