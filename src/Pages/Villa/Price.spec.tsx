import { PriceRange } from '../../Types/ContentTypes';
import { hasDayCalandarStyles } from '../../Selectors';
import * as moment from 'moment';

describe('Price calendar functions', () => {
    it('should get style when has blocked price', () => {
        const prices: PriceRange[] = [
            {
                vanaf:  moment().subtract(2, 'day').toDate(),
                tot: moment().add(1).toDate(),
                prijs: '400',
                styles: ['block']
            },
            {
                vanaf:  moment().subtract(2).toDate(),
                tot: moment().add(1).toDate(),
                prijs: '401',
                styles: ['midseizoen']
            }
        ];

        const isTodayBlocked = hasDayCalandarStyles(prices, moment(), 'block');
        const isPreviousWeekBlocked = hasDayCalandarStyles(prices, moment().subtract(1, 'week'), 'block');
        const vanafBlock = hasDayCalandarStyles(prices, moment(prices[0].vanaf), 'block');
        const totBlock = hasDayCalandarStyles(prices, moment(prices[0].tot), 'block');

        expect(isTodayBlocked).toBeTruthy();
        expect(vanafBlock).toBeTruthy();
        expect(totBlock).toBeTruthy();
        expect(isPreviousWeekBlocked).toBeFalsy();
    }); 
});