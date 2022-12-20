import { formatDate } from '../../src/publish-utils/format-utils';

describe('Formatting date return expected string', () => {
    it('formatDate works', () => {
        const targetDate = '2022-05-17T21:00:00Z';

        const expected = 'Wednesday, 18.05.2022';
        const formattedDate = formatDate(targetDate);

        expect(formattedDate).toStrictEqual(expected);
    });
});
