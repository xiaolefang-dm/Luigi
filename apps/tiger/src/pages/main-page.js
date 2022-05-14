import React from 'react';
import './main-page.scss';
import { VideoPanel } from '../../../../common/video-panel/video-panel.js';
import { VideoPanelList } from '../../../../common/video-panel-list/video-panel-list.js';
import { UserPanelList } from '../../../../common/user-panel-list/user-panel-list';

const MainPage = ({ uid, cloudCameras, selectVideoFunc = () => {}, 
  addVideoFunc = () => {},
  deleteVideoFunc = () => {},
  chats = []}) => {
  return <div className='MainPage'>
    <div className='VideoList'>
      <VideoPanelList
        Title={'在线视频'}
        VideoPanelComponentList={cloudCameras}
        selectVideo={selectVideoFunc}
        addVideo={addVideoFunc}
        deleteStream={deleteVideoFunc}
        bigScreenVideoComonentId={'bigScreen'}
      />
    </div>
    <div className='VideoPanel'>
      <div className='video'><VideoPanel name='' flvVideoId='bigScreen'/></div>
      <div className='MessagePanel'>
        {chats.map(chat => <p className='chat'>{chat}</p>)}
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