import { hasDayCalandarStyles } from '../../Selectors';
import * as React from 'react';
import { PriceRange } from '../../Types/ContentTypes';
import { Calendar } from 'react-yearly-calendar';
import * as moment from 'moment';
import { Moment } from 'moment';
import { VacationModel } from '../../Types/index';

interface PriceCalendarProps {
  prices: PriceRange[];
  selectedVacation: VacationModel;
  selectedPrices?: PriceRange[];
  onRangeSelect?: (from: Moment, to: Moment, prices: PriceRange[]) => any;
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
            selectedRange={[this.props.selectedVacation.from, this.props.selectedVacation.to]}
            onPickRange={(from, to) => this.onRangeSelect(from, to)}
        />,
        <section>
          <h2>Indicatie prijs</h2>
          <aside className="legenda">Legenda:
            <span className="legenda-item beschikbaar">Beschikbaar</span>
            <span className="legenda-item lastminute">Lastminute</span>
            <span className="legenda-item blocked">Vol geboekt / Geblokkeerd</span>
            {(this.props.selectedPrices ?
              <p>Prijzen voor uw geselecteerde periode: {this.props.selectedVacation.from.format('ll')} t/m &nbsp; 
              {this.props.selectedVacation.to.format('ll')}</p> : null)}
              {this.props.selectedPrices ? 
                this.props.selectedPrices
              .map((price, i) => <span key={i}>{moment(price.vanaf).format('ll')} </span>) : null }
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