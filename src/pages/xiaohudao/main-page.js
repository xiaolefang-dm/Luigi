import React from 'react';
import './main-page.scss';
import { VideoPanel } from '../../common/videoPanel/video-panel.js';
import { VideoPanelList } from '../../common/videoPanelList/video-panel-list';
import { UserPanelList } from '../../common/UserPanelList/user-panel-list';

const MainPage = ({ uid }) => {
  return <div className='MainPage'>
    <div className='VideoList'>
      <VideoPanelList
        Title={'在线视频'}
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
      <div className='video'><VideoPanel name='test' /></div>
      <div className='MessagePanel'>
        <p>test</p>
      </div>
    </div>
    <div className='UserList'>
      <UserPanelList
        Title={'在线用户'}
        Users={
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
        } />
    </div>
  </div>
}

export default MainPage;