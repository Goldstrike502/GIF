import { hasDayCalandarStyles, isDayStartDay, isDayEndDay } from '../../Selectors';
import * as React from 'react';
import { PriceRange, PriceRangeStyles } from '../../Types/ContentTypes';
import { Calendar } from 'react-yearly-calendar';
import * as Moment from 'moment';
import { VacationModel } from '../../Types/index';
import { extendMoment, DateRange } from 'moment-range';
import { Link } from 'react-router-dom';
const moment = extendMoment(Moment);
interface PriceCalendarProps {
  prices: PriceRange[];
  selectedVacation: VacationModel;
  selectedPrices?: PriceRange[];
  onRangeSelect?: (from: Moment.Moment, to: Moment.Moment, prices: PriceRange[]) => any;
}
interface PriceCalendarState {
  year: number;
  discount: number;
}

export class PriceCalendar extends React.Component<PriceCalendarProps, PriceCalendarState> {
  state = {
    year: new Date().getMonth() >= 8 ? new Date().getFullYear() + 1 : new Date().getFullYear(),
    discount: 0.0
  };
  nextYear(): any {
    this.setState({year: this.state.year + 1});
  }
  previousYear(): any {
    this.setState({year: this.state.year - 1});
  }
  render() {
    const { year } = this.state;
    const customCLassesForPrices = {
      lastminute: (day: Moment.Moment) => hasDayCalandarStyles(this.props.prices, day, 'lastminute'),
      changedayStart: (day: Moment.Moment) => isDayStartDay(this.props.prices, day),
      changedayEnd: (day: Moment.Moment) => isDayEndDay(this.props.prices, day),
      blocked: (day: Moment.Moment) => hasDayCalandarStyles(this.props.prices, day, 'block'),
      hoogseizoen: (day: Moment.Moment) => hasDayCalandarStyles(this.props.prices, day, 'hoogseizoen'),
      midseizoen: (day: Moment.Moment) => hasDayCalandarStyles(this.props.prices, day, 'midseizoen'),
    };
    // console.log('prices in render', this.props.prices);
    const selectedRange = this.props.selectedVacation ?
      moment.range(this.props.selectedVacation.from, this.props.selectedVacation.to) : false;
    return (
      <div className="price-calendar">
        <div className="calendar-container">
          {this.state.year > new Date().getFullYear() ? <a onClick={() => this.previousYear()}>Vorig jaar</a> : ''}
          <span>{this.state.year}</span>
          <a onClick={() => this.nextYear()}>Volgend jaar</a>
          <Calendar
            year={year}
            onPickDate={this.onDatePicked}
            customClasses={this.props.prices ? customCLassesForPrices : {}}
            selectRange={true}
            selectedRange={[this.props.selectedVacation.from, this.props.selectedVacation.to]}
            onPickRange={(from, to) => this.onRangeSelect(from, to)}
          />
        </div>
        <section className="prijs-indicatie">
          <aside className="legenda" style={{ float: 'right' }}>Legenda:

            <span className="legenda-item available">Beschikbaar</span>
            <span className="legenda-item lastminute">Lastminute</span>
            <span className="legenda-item blocked">Geblokkeerd</span>
          </aside>
          <h2>Indicatie prijs</h2>
          {(this.props.selectedPrices ?
            <p>Prijzen voor uw geselecteerde periode: {this.props.selectedVacation.from.format('ll')} t/m &nbsp;
              {this.props.selectedVacation.to.format('ll')}</p> : null)}
          <div>
              {this.renderDiscount(this.props.selectedVacation.prices.map(price => this.countDaysNotHoogseizoen(price, selectedRange)).reduce(getSum, 0))}
          </div>
          <div className="prices-container">
            {this.props.selectedPrices && selectedRange ?
              <ul className="prices"> {this.props.selectedPrices
                .map((price, i) =>
                  this.renderPriceForSelectedPeriode(price, selectedRange, i))} </ul> : null}
            <div className="boeken">
              <p>Wilt u boeken? Of meer informatie?
              Om u het beste te kunnen helpen, doen wij dat graag persoonlijk. Neem contact met ons op
              of laat uw telefoon nummer achter en wij helpen u met het boeken van uw perfecte vakantie en
              doen dat graag met een persoonlijke aanbieding. </p>
              <Link className="button" to="/contact">Een persoonlijke vrijblijvende prijsopgave</Link>
              <Link className="button" to="/contact">Neem contact op</Link>
            </div>
          </div>
        
        </section>
      </div>
    );
  }
  countDaysNotHoogseizoen(price: PriceRange, range: DateRange | false): number {
    if ( range && price.styles.indexOf('hoogseizoen') === -1 && price.styles.indexOf('block') === -1) {
      const intersection = range.intersect(moment.range(price.vanaf, price.tot));
      return intersection.duration('days');
    } else {
      return 0;
    }
  }
  renderDiscount(numberOfDays: number): React.ReactNode {
    if (numberOfDays > 7) {
      return <h3 style={{color: 'white'}}>De onderstaande prijzen zijn exclusief {this.getDiscount(numberOfDays)} % korting! </h3>;
    } else {
      return <h3 style={{color: 'white'}}>U heeft geen korting</h3>;
    }
  }
  onDatePicked() {
    // console.log('selecedddddd date', e);
  }
  onRangeSelect(f: Moment.Moment, t: Moment.Moment) {
    const { from, to } = getRelativeFromTo(f, t);
    const selectedRange = moment.range(from, to);
    const prices = this.getPricesForSelectedRange(selectedRange);

    if (this.props.onRangeSelect) {
      this.props.onRangeSelect(from, to, prices);
    }
  }
  getDiscount(duration: number) {
 
      if (duration >= 21) {
        return 20;
      }
      if (duration >= 14) {
        return 15;
      }
      if (duration >= 7) {
        return 10;
      }
      return 0;
  }
  private renderPriceForSelectedPeriode(price: PriceRange, range: DateRange, i: number): string | JSX.Element {
    const intersection = range.intersect(moment.range(price.vanaf, price.tot));
    const duration = intersection.duration('days');
    // const regex = /^\d*\.?\d*$/;
    // tslint:disable-next-line:no-console
    // console.log('price', priceInt);
    return (
      <li className="prijs">
        <div className="">
          {price.styles.map((style => {
            switch (style) {
              case 'block':
                return (<span>
                  <h3><i className="material-icons">event_busy</i>Niet beschikbaar</h3>
                </span>);
              case 'lastminute':
                return (<span>
                  <h3><i className="material-icons">new_releases</i>Lastminute optie beschikbaar</h3>
                </span>);
              default:
                return (<span>
                  <h3><i className="material-icons">hotel</i>Villa beschikbaar</h3>
                </span>);
            }
          }))}

        </div>
        {price.styles.length > 0 ? price.styles[0] : ''}
        <span className="prijs-vanaf">
          VANAF: <span style={{ float: 'right' }}>{intersection.start.format('ll')}</span>
        </span>
        <span className="prijs-tot">
          TOT: <span style={{ float: 'right' }}>{intersection.end.format('ll')}</span>
        </span>
        <span className="prijs-title">{getTitleForStyles(price.styles)}</span>
        {price.styles.indexOf('block') === -1 ? <span className="prijs-price"><h3>{duration} dag{duration > 1 ? 'en' : ''} x &euro; {price.prijs},- = &euro; {Number(price.prijs) * duration},-</h3> </span> : ''}
        {/* <span className="prijs-korting">Inclusief {this.getDiscount(price, duration)}% korting</span> */}
      </li>);
  }

  private getPricesForSelectedRange(selectedRange: DateRange) {
    return this.props.prices.filter(price => {
      const range = moment.range(price.vanaf, price.tot);
      return range.overlaps(selectedRange) || range.contains(selectedRange) || range.intersect(selectedRange);
    });
  }

}
function getRelativeFromTo(f: Moment.Moment, t: Moment.Moment): { from: Moment.Moment, to: Moment.Moment } {
  if (f.isAfter(t)) {
    return { from: t, to: f };
  }
  return { from: f, to: t };
}

function getTitleForStyles(styles: PriceRangeStyles[]): string {
  const titles = {
    block: 'Geblokkeerd / Niet beschikbaar',
    lastminute: 'Lastminute, beperkt beschikbaar'
  };
  return styles.map(style => titles[style] ? titles[style] : 'Beschikbaar').join(' ');
}
function getSum(total: number, num: number) {
  return total + num;
}