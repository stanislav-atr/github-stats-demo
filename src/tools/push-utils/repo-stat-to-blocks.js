/**
 * Converts repo stat object to string of Slack blocks
 * @param {Object} repoStat
 * @returns {Array}
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
        {
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: `*Resolved issues:* ${resolvedIssues}`,
            },
        },
        {
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: `*New issues:* ${newIssues}`,
            },
        },
        {
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: `*Closed as stale:* ${closedAsStaleIssues}`,
            },
        },
        {
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: `*New pull requests:* ${newPulls}`,
            },
        },
        {
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: `*Merged pull requests:* ${mergedPulls}`,
            },
        },
        {
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: `*Remaining issues:* ${remainingIssues}`,
            },
        },
    ];

    return blocks;
};

module.exports = {
    repoStatToBlocks,
};
