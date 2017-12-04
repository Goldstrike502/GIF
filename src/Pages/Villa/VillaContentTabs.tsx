import { VillaContentModel } from '../../Types/ContentTypes';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import * as React from 'react';
import * as ReactMarkdown from 'react-markdown';

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
        <ReactMarkdown source={props.content.description} />
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