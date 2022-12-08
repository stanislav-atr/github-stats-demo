const { getMrkdwnBlock } = require('./get-mrkdwn-block');

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
        {
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: `🗓️ _for the period from *${timePeriod.since}* to *${timePeriod.until}*_`,
            },
        },
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

module.exports = {
    repoStatToBlocks,
};
