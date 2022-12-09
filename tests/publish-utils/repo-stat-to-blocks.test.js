import {
    repoStatToBlocks,
    getMrkdwnBlock,
    getFormattedDate,
} from '../../src/publish-utils/format-utils';

describe('Formatting general repo stat the right way', () => {
    it('works', () => {
        const repoStat = {
            timePeriod: {
                since: '2022-11-25T11:59:51.411Z',
                until: '2022-11-26T11:59:51.411Z',
            },
            newIssues: 13,
            resolvedIssues: 5,
            closedAsStaleIssues: 3,
            newPulls: 0,
            mergedPulls: 3,
            remainingIssues: 1293,
        };

        const {
            timePeriod,
            newIssues,
            resolvedIssues,
            closedAsStaleIssues,
            newPulls,
            mergedPulls,
            remainingIssues,
        } = repoStat;

        const expected = [
            getMrkdwnBlock(`*${getFormattedDate(timePeriod.since)}*`),
            {
                type: 'header',
                text: {
                    type: 'plain_text',
                    text: '⚡ General repo statistics',
                    emoji: true,
                },
            },
            getMrkdwnBlock(`*Resolved issues:* ${resolvedIssues}`),
            getMrkdwnBlock(`*New issues:* ${newIssues}`),
            getMrkdwnBlock(`*Closed as stale:* ${closedAsStaleIssues}`),
            getMrkdwnBlock(`*New pull requests:* ${newPulls}`),
            getMrkdwnBlock(`*Merged pull requests:* ${mergedPulls}`),
            getMrkdwnBlock(`*Remaining issues:* ${remainingIssues}`),
        ];

        const statBlocks = repoStatToBlocks(repoStat);

        expect(statBlocks).toStrictEqual(expected);
    });
});
