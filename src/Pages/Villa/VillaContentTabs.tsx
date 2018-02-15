import { VillaContentModel } from '../../Types/ContentTypes';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import * as React from 'react';
import YouTube from 'react-youtube';
import * as ReactMarkdown from 'react-markdown';

interface VillaContentTabsProps {
  content: VillaContentModel;
}

export const VillaContentTabs: React.StatelessComponent<VillaContentTabsProps> = props => {
  const opts = {
    height: '390',
    width: '640',
  };
  return (
    <section className="villa-page-tabs content">
      <Tabs defaultIndex={0} >
        <TabList>
          <Tab>Faciliteiten</Tab>
          <Tab>Plattegrond</Tab>
          {props.content.youtubeLinks ? <Tab>Video</Tab> : null}
        </TabList>
        <TabPanel>
          <ReactMarkdown source={props.content.description} />
        </TabPanel>
        <TabPanel>
          <div className="plattegrond">
            <img 
              src={props.content.plattegrond.fields.file.url} 
              alt={props.content.plattegrond.fields.title}
            />
        </div>
        </TabPanel>
        {props.content.youtubeLinks ? <TabPanel>
          <section className="videos">
            {props.content.youtubeLinks.map(link =>
              <YouTube
                key={link}
                videoId={link}
                opts={opts}
              />)}
          </section>
        </TabPanel> : null}
      </Tabs>
    </section>);
};