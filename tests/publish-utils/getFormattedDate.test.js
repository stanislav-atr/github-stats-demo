import { formatDate } from '../../src/publish-utils/format-utils';

describe('Formatting date return expected string', () => {
    it('formatDate works', () => {
        const targetDate = '2022-05-17T21:00:00Z';

        const expected = '<!date^1652821200^{date}|Previous day>';
        const formattedDate = formatDate(targetDate);

        expect(formattedDate).toStrictEqual(expected);
    });
});
