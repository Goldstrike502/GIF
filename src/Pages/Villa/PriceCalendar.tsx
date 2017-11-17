import { hasDayCalandarStyles } from '../../Selectors';
import * as React from 'react';
import { PriceRange } from '../../Types/ContentTypes';
import { Calendar } from 'react-yearly-calendar';
import * as Moment from 'moment';
import { VacationModel } from '../../Types/index';
import { extendMoment } from 'moment-range';
const moment = extendMoment(Moment);
interface PriceCalendarProps {
  prices: PriceRange[];
  selectedVacation: VacationModel;
  selectedPrices?: PriceRange[];
  onRangeSelect?: (from: Moment.Moment, to: Moment.Moment, prices: PriceRange[]) => any;
  }
interface PriceCalendarState {

}

export class PriceCalendar extends React.Component<PriceCalendarProps, PriceCalendarState> {
  render() {
    const customCLassesForPrices = {
      lastminute: (day: Moment.Moment) => hasDayCalandarStyles(this.props.prices, day, 'lastminute'),
      blocked: (day: Moment.Moment) => hasDayCalandarStyles(this.props.prices, day, 'block'),
      hoogseizoen: (day: Moment.Moment) => hasDayCalandarStyles(this.props.prices, day, 'hoogseizoen'),
      midseizoen: (day: Moment.Moment) => hasDayCalandarStyles(this.props.prices, day, 'midseizoen'),
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
  onRangeSelect(from: Moment.Moment, to: Moment.Moment) {
    const selectedRange = moment.range(from, to);
    const prices = this.props.prices.filter(price => {
        const range = moment.range(price.vanaf, price.tot);
        return range.overlaps(selectedRange) || range.contains(selectedRange);
    });
    if (this.props.onRangeSelect) {
      this.props.onRangeSelect(from, to, prices);
    }
  }
  onDatePicked(e) {
      console.log('selecedddddd date', e);
  }
}