import { getTextBlock } from './get-text-block';
import { getFormattedDate } from './get-formatted-date';

/**
 * Converts general repo stat object to array of Slack blocks
 * @param {Object} repoStat
 * @returns {Object[]}
 */
const formatRepoStat = (repoStat) => {
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
        getTextBlock(`*${getFormattedDate(timePeriod.since)}*`),
        getTextBlock('⚡ General repo statistics', 'plain_text', 'header'),
        getTextBlock(`*Resolved issues:* ${resolvedIssues}`),
        getTextBlock(`*New issues:* ${newIssues}`),
        getTextBlock(`*Closed as stale:* ${closedAsStaleIssues}`),
        getTextBlock(`*New pull requests:* ${newPulls}`),
        getTextBlock(`*Merged pull requests:* ${mergedPulls}`),
        getTextBlock(`*Remaining issues:* ${remainingIssues}`),
    ];

    return blocks;
};

export { formatRepoStat };
