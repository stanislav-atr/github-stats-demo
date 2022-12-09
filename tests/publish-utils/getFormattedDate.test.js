import { getFormattedDate } from '../../src/publish-utils/format-utils';

describe('Formatting date return expected string', () => {
    it('getFormattedDate works', () => {
        const targetDate = '2022-05-17T21:00:00Z';

        const expected = '<!date^1652821200^{date}|Previous day>';
        const formattedDate = getFormattedDate(targetDate);

        expect(formattedDate).toStrictEqual(expected);
    });
});
