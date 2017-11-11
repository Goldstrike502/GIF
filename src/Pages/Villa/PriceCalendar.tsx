import * as React from 'react';
import { PriceRange } from '../../Types/ContentTypes';
import { Calendar } from 'react-yearly-calendar';
import * as moment from 'moment';
import nl from 'moment/locale/nl';

interface PriceCalendarProps {
  prices: PriceRange[];
}
interface PriceCalendarState {

}

export class PriceCalendar extends React.Component<PriceCalendarProps, PriceCalendarState> {
  render() {
    moment.locale('nl', nl);
    return (
      <div> 
        <Calendar
            year={2017}
            onPickDate={this.onDatePicked}
        />,
      </div>
    );
  }
  onDatePicked(e) {
      console.log('selecedddddd date', e);
  }
}