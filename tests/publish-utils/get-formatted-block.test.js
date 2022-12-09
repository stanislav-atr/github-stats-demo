import { getMrkdwnBlock } from '../../src/publish-utils/format-utils';

describe('Formatting helpers return expected blocks', () => {
    it('getMrkdwnBlock works', () => {
        const blockText = '*Resolved issues:* 15';
        const expected = {
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: '*Resolved issues:* 15',
            },
        };

        const result = getMrkdwnBlock(blockText);

        expect(result).toStrictEqual(expected);
    });
});
