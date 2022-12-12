import { activityByTypeToBlocks } from '../../src/publish-utils/format-utils';

describe('Formatting personal activity stat the right way', () => {
    it('works', () => {
        const username = 'test-name';
        const resolvedIssues = 1;
        const newPulls = 2;
        const mergedPulls = 3;
        const pullRequestsReview = 4;
        const totalCommits = 5;
        const totalComments = 6;
        const activityObject = {
            [username]: {
                resolvedIssues,
                newPulls,
                mergedPulls,
                pullRequestsReview,
                totalCommits,
                totalComments,
            },
        };

        const expectedBlocks = [
            [
                {
                    type: 'section',
                    text: {
                        type: 'mrkdwn',
                        text: `*<https://github.com/${username}|${username}>*`,
                    },
                },
                {
                    type: 'section',
                    text: {
                        type: 'plain_text',
                        text: `
Resolved issues: ${resolvedIssues}
Total commit: ${totalCommits}
Pull requests reviews: ${pullRequestsReview}
                    `,
                    },
                },
                {
                    type: 'section',
                    text: {
                        type: 'plain_text',
                        text: `
Merged pull requests: ${mergedPulls}
New pull requests: ${newPulls}
Total comments: ${totalComments}
                    `,
                    },
                },
            ],
        ];
        const result = activityByTypeToBlocks(activityObject);

        expect(expectedBlocks).toStrictEqual(result);
    });
});
