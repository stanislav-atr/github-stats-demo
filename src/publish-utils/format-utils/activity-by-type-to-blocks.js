import { getTextBlock } from './get-text-block';

/**
 * Converts contributor's stats to an array of formatted block messages
 * @param {Object} activitiesByType activity sorted by users and then by type
 * @returns {Array[]}
 */
const activityByTypeToBlocks = (activitiesByType) => {
    const userBlocks = [];

    Object.entries(activitiesByType).forEach((stat) => {
        const username = stat[0];
        const activities = stat[1];
        const {
            resolvedIssues,
            newPulls,
            mergedPulls,
            pullRequestsReview,
            totalCommits,
            totalComments,
        } = activities;

        const userBlock = [
            getTextBlock(`*<https://github.com/${username}|${username}>*`),
            // These are split into two blocks to prevent slack
            // from non-configurable block wrapping
            getTextBlock(`
Resolved issues: ${resolvedIssues}
Total commits: ${totalCommits}
Pull requests reviews: ${pullRequestsReview}`),
            getTextBlock(`
Merged pull requests: ${mergedPulls}
New pull requests: ${newPulls}
Total comments: ${totalComments}`),
        ];

        userBlocks.push(userBlock);
    });

    return userBlocks;
};

export { activityByTypeToBlocks };
