import { hasDayCalandarStyles } from '../../Selectors';
import * as React from 'react';
import { PriceRange } from '../../Types/ContentTypes';
import { Calendar } from 'react-yearly-calendar';
import * as moment from 'moment';
import { Moment } from 'moment';

interface PriceCalendarProps {
  prices: PriceRange[];
  selectedRange: Moment[];
  selectedPrices: PriceRange[];
  onRangeSelect?: (from: Moment, to: Moment, prices: PriceRange[]) => void;
  }
interface PriceCalendarState {

}

export class PriceCalendar extends React.Component<PriceCalendarProps, PriceCalendarState> {
  render() {
    const customCLassesForPrices = {
      lastminute: (day: moment.Moment) => hasDayCalandarStyles(this.props.prices, day, 'lastminute'),
      blocked: (day: moment.Moment) => hasDayCalandarStyles(this.props.prices, day, 'block'),
      hoogseizoen: (day: moment.Moment) => hasDayCalandarStyles(this.props.prices, day, 'hoogseizoen'),
      midseizoen: (day: moment.Moment) => hasDayCalandarStyles(this.props.prices, day, 'midseizoen'),
    };
    return (
      <div className="price-calendar"> 
        <Calendar
            year={2017}
            onPickDate={this.onDatePicked}
            customClasses={this.props.prices ? customCLassesForPrices : {}}
            selectRange={true}
            selectedRange={this.props.selectedRange}
            onPickRange={(from, to) => this.onRangeSelect(from, to)}
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
  onRangeSelect(from: Moment, to: Moment) {
    const prices = this.props.prices.filter(price => 
      from.isBetween(price.vanaf, price.tot) || to.isBetween(price.vanaf, price.tot) || 
      (from.isBefore(price.vanaf) && to.isAfter(price.tot)));
    if (this.props.onRangeSelect) {
      this.props.onRangeSelect(from, to, prices);
    }
  }
  onDatePicked(e) {
      console.log('selecedddddd date', e);
  }
}