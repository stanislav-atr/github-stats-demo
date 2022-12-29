#!/usr/bin/env node
import * as dotenv from 'dotenv';
import { startOfYesterday, endOfYesterday } from 'date-fns';
import { prepareStats } from '../src/prepare-stats/prepare-stats';
import { printStats } from '../src/print-stats';

dotenv.config();

const {
    COLLECTION_PATH,
    REPO,
    SINCE,
    UNTIL,
} = process.env;

const commonRequestData = {
    owner: REPO.split('/')[0],
    repo: REPO.split('/')[1],
};

const timePeriod = {
    since: SINCE || startOfYesterday().toISOString(),
    until: UNTIL || endOfYesterday().toISOString(),
};

(async () => {console.log('test');
    const statistics = await prepareStats(COLLECTION_PATH, commonRequestData, timePeriod);

    printStats(statistics);
})();
