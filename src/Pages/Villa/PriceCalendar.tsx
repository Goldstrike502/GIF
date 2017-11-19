import { hasDayCalandarStyles } from '../../Selectors';
import * as React from 'react';
import { PriceRange, PriceRangeStyles } from '../../Types/ContentTypes';
import { Calendar } from 'react-yearly-calendar';
import * as Moment from 'moment';
import { VacationModel } from '../../Types/index';
import { extendMoment, DateRange } from 'moment-range';
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
    const selectedRange = this.props.selectedVacation ?
     moment.range(this.props.selectedVacation.from, this.props.selectedVacation.to) : false;
    return (
      <div className="price-calendar"> 
        <Calendar
            year={2017}
            onPickDate={this.onDatePicked}
            customClasses={this.props.prices ? customCLassesForPrices : {}}
            selectRange={true}
            selectedRange={[this.props.selectedVacation.from, this.props.selectedVacation.to]}
            onPickRange={(from, to) => this.onRangeSelect(from, to)}
        />
        <section className="prijs-indicatie">
          <aside className="legenda" style={{float: 'right'}}>Legenda:
            <span className="legenda-item beschikbaar">Beschikbaar</span>
            <span className="legenda-item lastminute">Lastminute</span>
            <span className="legenda-item blocked">Vol geboekt / Geblokkeerd</span>
            </aside>
          <h2>Indicatie prijs</h2>
            {(this.props.selectedPrices ?
              <p>Prijzen voor uw geselecteerde periode: {this.props.selectedVacation.from.format('ll')} t/m &nbsp; 
              {this.props.selectedVacation.to.format('ll')}</p> : null)}
              {this.props.selectedPrices && selectedRange ? 
                this.props.selectedPrices
              .map((price, i) =>
              this.renderPriceForSelectedPeriode(price, selectedRange, i)) : null }
        </section>
      </div>
    );
  }
  onDatePicked(e) {
      console.log('selecedddddd date', e);
  }
  onRangeSelect(f: Moment.Moment, t: Moment.Moment) {
    const {from, to} = getRelativeFromTo(f, t);
    const selectedRange = moment.range(from, to);
    const prices = this.getPricesForSelectedRange(selectedRange);

    if (this.props.onRangeSelect) {
      this.props.onRangeSelect(from, to, prices);
    }
  }
  private renderPriceForSelectedPeriode(price: PriceRange, range: DateRange, i: number): string | JSX.Element {
    const intersection = range.intersect(moment.range(price.vanaf, price.tot));
    return (
    <li className="prijs-row">
      <span className="prijs-vanaf">{intersection.start.format('ll')}</span>
      <span className="prijs-tot">{intersection.end.format('ll')}</span>
      <span className="prijs-title">{getTitleForStyles(price.styles)}</span>
      <span className="prijs-price">{price.prijs}</span>
    </li>);
  }

  private getPricesForSelectedRange(selectedRange: DateRange) {
    return this.props.prices.filter(price => {
      const range = moment.range(price.vanaf, price.tot);
      return range.overlaps(selectedRange) || range.contains(selectedRange);
    });
  }

}
function getRelativeFromTo(f: Moment.Moment, t: Moment.Moment): {from: Moment.Moment, to: Moment.Moment} {
  if (f.isAfter(t)) {
    return {from: t, to: f};
  } 
  return {from: f, to: t};  
}

function getTitleForStyles(styles: PriceRangeStyles[]): string {
  const titles = {
    block: 'Geblokeerd / Niet beschikbaar',
    lastminute: 'Lastminute, beperkt beschikbaar'
  };
  return styles.map(style => titles[style] ? titles[style] : 'Beschikbaar').join(' ');
}
