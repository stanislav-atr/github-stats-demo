#!/usr/bin/env node
import * as dotenv from 'dotenv';
import { prepareStats } from '../src/prepare-stats/prepare-stats';
import { publishStats } from '../src/publish-stats';
import { MILLISECONDS_IN_DAY } from '../src/constants';

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
    since: SINCE || new Date(Date.now() - MILLISECONDS_IN_DAY).toISOString(),
};

(async () => {
    const statistics = await prepareStats(COLLECTION_PATH, commonRequestData, timePeriod);
    await publishStats(OAUTH_TOKEN, LEGEND_MESSAGE_URL, CHANNEL_ID, statistics);
})();
