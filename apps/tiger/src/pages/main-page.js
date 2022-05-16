import React from 'react';
import './main-page.scss';
import { VideoPanel } from '../../../../common/video-panel/video-panel.js';
import { VideoPanelList } from '../../../../common/video-panel-list/video-panel-list.js';
import { UserPanelList } from '../../../../common/user-panel-list/user-panel-list';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

var adminPasswd = '';
var passwd = '';
const MainPage = ({ uid, cloudCameras, selectVideoFunc = () => { },
  addVideoFunc = () => { },
  deleteVideoFunc = () => { },
  switchMeeting = () => { },
  changePasswd = () => { },
  changeAdminPasswd = () => { },
  adminMuteFunc = () => { },
  adminTurnCameraFunc = () => { },
  users = [],
  chats = [],
  optionsUsers = [],
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
          <h1>会议控制</h1>
          <Button className={'enableMeeting'} onClick={() => { switchMeeting() }} color={meetingOn ? "success" : "error"}
            variant="contained">
            {meetingOn ? '关闭会议' : '启动会议'}
          </Button>
          <div className='pswdSetting'>
            <TextField className='input' size='massive' label='新管理员密码' onChange={(e, info) => adminPasswd = e.target.value} />
            <Button variant="contained" className='button' onClick={() => changeAdminPasswd(JSON.stringify({ adminPasswd: adminPasswd }))} color="success">修改管理员密码</Button>
            <TextField className='input' size='massive' label='新会议密码' onChange={(e, info) => passwd = e.target.value} />
            <Button variant="contained" className='button' onClick={() => changePasswd(JSON.stringify({ adminPasswd: passwd }))}
              color="success">修改普通用户密码</Button>
          </div>
        </div>
        <div className='MessagePanel'>
          <h1>聊天记录</h1>
          {chats.map(chat => <p className='chat'>{chat}</p>)}
        </div>
      </div>
    </div>
    <div className='UserList'>
      <UserPanelList
        Title={'在线用户'}
        Users={users}
        options={optionsUsers}
        adminMuteFunc={adminMuteFunc} 
        adminTurnCameraFunc={adminTurnCameraFunc}
      />
    </div>
  </div>
}

export default MainPage;