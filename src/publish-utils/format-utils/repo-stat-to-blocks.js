import { getMrkdwnBlock } from './get-mrkdwn-block';
import { getFormattedDate } from './get-formatted-date';

/**
 * Converts general repo stat object to array of Slack blocks
 * @param {Object} repoStat
 * @returns {Object[]}
 */
const repoStatToBlocks = (repoStat) => {
    const {
        timePeriod,
        newIssues,
        resolvedIssues,
        closedAsStaleIssues,
        newPulls,
        mergedPulls,
        remainingIssues,
    } = repoStat;

    const blocks = [
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

    return blocks;
};

export { repoStatToBlocks };
