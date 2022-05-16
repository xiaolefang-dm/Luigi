import React from 'react';
import './main-page.scss';
import { VideoPanel } from '../../../../common/video-panel/video-panel.js';
import { VideoPanelList } from '../../../../common/video-panel-list/video-panel-list.js';
import { UserPanelList } from '../../../../common/user-panel-list/user-panel-list';
import { Button, Container, Input, Divider, Icon, Label } from 'semantic-ui-react'

var adminPasswd = '';
var passwd = '';
const MainPage = ({ uid, cloudCameras, selectVideoFunc = () => { },
  addVideoFunc = () => { },
  deleteVideoFunc = () => { },
  switchMeeting = () => { },
  changePasswd = () => { },
  changeAdminPasswd = () => { },
  users = [],
  chats = [],
  meetingOn = false }) => {
  console.log(users)
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
      <div className='video'><VideoPanel name='' flvVideoId='bigScreen' /></div>
      <div className='MessageControlPanel'>
        <div className='ControlPanel'>
          <Container>
            <h1>会议控制</h1>
            <Button className={meetingOn ? 'enableMeeting' : 'disableMeeting'} onClick={() => { switchMeeting() }}>
              <Label >{meetingOn ? '关闭会议' : '启动会议'}</Label>
            </Button>
            <div className='pswdSetting'>
              <Input className='input' onChange={(e, info) => adminPasswd = info.value} />
              <Button className='button' onClick={() => changeAdminPasswd(JSON.stringify({ adminPasswd: adminPasswd }))}>修改管理员密码</Button>
            </div>
            <div className='pswdSetting'>
              <Input className='input' onChange={(e, info) => passwd = info.value} />
              <Button className='button' onClick={() => changePasswd(JSON.stringify({ adminPasswd: passwd }))}>修改普通用户密码</Button>
            </div>
          </Container>
        </div>
        <div className='MessagePanel'>
          <Container>
            <h1>聊天记录</h1>
            {chats.map(chat => <p className='chat'>{chat}</p>)}
          </Container>
        </div>
      </div>
    </div>
    <div className='UserList'>
      <UserPanelList
        Title={'在线用户'}
        Users={users} />
    </div>
  </div>
}

export default MainPage;