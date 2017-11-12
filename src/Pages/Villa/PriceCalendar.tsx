import { hasDayCalandarStyles } from '../../Selectors';
import * as React from 'react';
import { PriceRange } from '../../Types/ContentTypes';
import { Calendar } from 'react-yearly-calendar';
import * as moment from 'moment';
import nl from 'moment/locale/nl';
import { Moment } from 'moment';

interface PriceCalendarProps {
  prices: PriceRange[];
  selectedRange: Moment[];
  onRangeSelect?: (from: Moment, to: Moment) => void;
  }
interface PriceCalendarState {

}

export class PriceCalendar extends React.Component<PriceCalendarProps, PriceCalendarState> {
  render() {
    moment.locale('nl', nl);
    const customCLassesForPrices = {
      lastminute: (day: moment.Moment) => hasDayCalandarStyles(this.props.prices, day, 'lastminute')
    };
    console.log('classesss', customCLassesForPrices.lastminute(moment()));
    return (
      <div className="price-calendar"> 
        <Calendar
            year={2017}
            onPickDate={this.onDatePicked}
            customClasses={customCLassesForPrices}
            selectRange={true}
            selectedRange={this.props.selectedRange}
            onPickRange={this.props.onRangeSelect ? this.props.onRangeSelect : () => undefined}
        />,
        <section>
          <h2>Indicatie prijs</h2>
          <aside className="legenda">Legenda:
            <span className="legenda-item beschikbaar">Beschikbaar</span>
            <span className="legenda-item lastminute">Lastminute</span>
            <span className="legenda-item blocked">Vol geboekt / Geblokkeerd</span>

          </aside>
        </section>
      </div>
    );
  }
  onDatePicked(e) {
      console.log('selecedddddd date', e);
  }
}