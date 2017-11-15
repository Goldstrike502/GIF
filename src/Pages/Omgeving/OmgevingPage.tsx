import { StoreState } from '../../Types';
import { OmgevingsMap } from './OmgevingMap';
import * as React from 'react';
import { connect } from 'react-redux';
import { Action, Dispatch } from 'redux';
interface Props {
  zoom: number;
}

interface State {

}
export class Omgeving extends React.Component<Props, State> {
  render() {
    return (
      <OmgevingsMap zoom={15} center={{lat: 43.1336406, lng: 1.3097693}} />
    );
  }
}
function mapStateToProps (state: StoreState): Props {
  return {
    zoom: 2
  };
}
function mapDispatchToProps (dispatch: Dispatch<Action>): Partial<Props> {
  return {
  };
}

export const OmgevingPage = connect(mapStateToProps, mapDispatchToProps)(Omgeving);