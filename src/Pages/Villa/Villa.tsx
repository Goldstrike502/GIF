import { ContentfulPhoto } from '../../Contentful';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import * as React from 'react';
interface Props {
    children?: JSX.Element | string;
}
interface State {
    selectedVilla: JSX.Element;
}
export class VillaCompactView extends React.Component<Props, State> {
    render() {
        return (
            <div className="villa-compact-view">

                <Tabs>
                    <TabList>
                        <Tab>Title 1</Tab>
                        <Tab>Title 2</Tab>
                    </TabList>

                    <TabPanel>
                        <h2>Any content 1</h2>
                    </TabPanel>
                    <TabPanel>
                        <h2>Any content 2</h2>
                    </TabPanel>
                </Tabs>

            </div>
        );
    }
}
export interface VillaProps {
    title: string;
    faciliteiten: string;
    description: string;
    plattegrond: ContentfulPhoto;
    infoRechts: string;
    prijsVanaf: string;
}
export const villa: React.StatelessComponent<VillaProps> = props => {
    return (<div>asdf</div>);
};