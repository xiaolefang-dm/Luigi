import React from 'react';
import './main-page.scss';
import { VideoPanel } from '../../common/videoPanel/video-panel.js';
import { VideoPanelList } from '../../common/videoPanelList/video-panel-list';

const MainPage = ({ uid }) => {
  return <div className='MainPage'>
    <div className='VideoList'>
      <VideoPanelList
        VideoPanelComponentList={
          [
            {
              name: 'test',
              url: 'xxxxx.flv',
              online: false,
              selected: false,
            },
            {
              name: 'test',
              url: 'xxxxx.flv',
              online: false,
              selected: false,
            },
            {
              name: 'test',
              url: 'xxxxx.flv',
              online: false,
              selected: false,
            },
            {
              name: 'test',
              url: 'xxxxx.flv',
              online: false,
              selected: false,
            },
            {
              name: 'test',
              url: 'xxxxx.flv',
              online: false,
              selected: false,
            },
            {
              name: 'test',
              url: 'xxxxx.flv',
              online: false,
              selected: false,
            },
            {
              name: 'test',
              url: 'xxxxx.flv',
              online: false,
              selected: false,
            },
            {
              name: 'test',
              url: 'xxxxx.flv',
              online: false,
              selected: false,
            },
            {
              name: 'test',
              url: 'xxxxx.flv',
              online: false,
              selected: false,
            },
            {
              name: 'test',
              url: 'xxxxx.flv',
              online: false,
              selected: false,
            },
            {
              name: 'test',
              url: 'xxxxx.flv',
              online: false,
              selected: false,
            },
            {
              name: 'test',
              url: 'xxxxx.flv',
              online: false,
              selected: false,
            },
            {
              name: 'test',
              url: 'xxxxx.flv',
              online: false,
              selected: false,
            },
            {
              name: 'test',
              url: 'xxxxx.flv',
              online: false,
              selected: false,
            },
          ]
        }
      />
    </div>
    <div className='VideoPanel'>
      <VideoPanel />
    </div>
  </div>
}

export default MainPage;