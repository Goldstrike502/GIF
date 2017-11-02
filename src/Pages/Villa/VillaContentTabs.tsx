import { VillaContentModel } from './Villa';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import * as React from 'react';

interface VillaContentTabsProps {
  content: VillaContentModel;
}
export const VillaContentTabs: React.StatelessComponent<VillaContentTabsProps> = props => {
  return (
  <section className="villa-page-tabs content">
    <h1>{props.content.title}</h1>
    <Tabs defaultIndex={0} >
      <TabList>
        <Tab>Faciliteiten</Tab>
        <Tab>Plattegrond</Tab>
        <Tab>Video</Tab>
      </TabList>
      <TabPanel>
        <p>{props.content.description}</p>
      </TabPanel>
      <TabPanel>
        <p>
          <img 
            src={props.content.plattegrond.fields.file.url} 
            alt={props.content.plattegrond.fields.title}
          />
        </p>
      </TabPanel>
    </Tabs>
  </section>);
};