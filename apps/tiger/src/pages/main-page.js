import React from 'react';
import './main-page.scss';
import { VideoPanel } from '../../../../common/video-panel/video-panel.js';
import { VideoPanelList } from '../../../../common/video-panel-list/video-panel-list.js';
import { UserPanelList } from '../../../../common/user-panel-list/user-panel-list';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { Divider, Grid, Header, Icon, Item, Table } from 'semantic-ui-react'
import TextField from '@mui/material/TextField';

const scrollToBottom = (id) => {
  const element = document.getElementById(id);
  if (element)
    element.scrollTop = element.scrollHeight;
}

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
  pushStreamFunc = () => { },
  close = () => { },
  users = [],
  chats = [],
  options = [],
  meetingOn = false }) => {


  React.useEffect(() => {
    scrollToBottom('chats');
  }, [chats])

  return <div className='MainPage'>
    <div className='VideoList'>
      <VideoPanelList
        Title={'在线视频'}
        VideoPanelComponentList={cloudCameras}
        selectVideo={selectVideoFunc}
        addVideo={addVideoFunc}
        deleteStream={deleteVideoFunc}
        pushStream={pushStreamFunc}
        bigScreenVideoComonentId={'bigScreen'}
      />
    </div>
    <div className='VideoPanel'>
      <div className='video'><VideoPanel name='' flvVideoId='bigScreen' /></div>
      <div className='MessageControlPanel'>
        <div className='ControlPanel'>
          <Box sx={{ width: '100%' }}>
            <Stack spacing={2}>
              <Item>
                <Header as='h3'>
                  会议控制
                </Header>
              </Item>
              <Item>
                <Button className={'enableMeeting'} onClick={() => { switchMeeting() }} color={meetingOn ? "success" : "error"}
                  variant="contained">
                  {meetingOn ? '关闭会议' : '启动会议'}
                </Button>
              </Item>
              <Item>

                <TextField className='input' size='massive' label='设置管理成员密码' onChange={(e, info) => adminPasswd = e.target.value} />
                <Button variant="contained" className='button' onClick={() => changeAdminPasswd(JSON.stringify({ adminPasswd: adminPasswd }))} color="success">修改密码</Button>
              </Item>
              <Item>
                <TextField className='input' size='massive' label='设置会议成员密码' onChange={(e, info) => passwd = e.target.value} />
                <Button variant="contained" className='button' onClick={() => changePasswd(JSON.stringify({ adminPasswd: passwd }))}
                  color="success">修改密码</Button>
              </Item>
            </Stack>
          </Box>
        </div>
        <div className='MessagePanel'>
          <Divider horizontal>
            <Header as='h4'>
              <Icon name='bar chart' />
              聊天记录
            </Header>
          </Divider>
          <div id='chats'>
            {chats.map((chat, index) => <p
              key={`chat-id-${index}`}
              id={index === chats.length - 1 ? `last` : `chat-id-${index}`}
              className='chat'>{chat}</p>)}
          </div>
        </div>
      </div>
    </div>
    <div className='UserCloseList'>
      <div className='CloseIcon'>
        <Button variant="contained" onClick={() => close()}>退出</Button>
      </div>
      <div className='UserList'>
        <UserPanelList
          Title={`在线用户(共${users.length}人在线)`}
          Users={users}
          adminMuteFunc={adminMuteFunc}
          adminTurnCameraFunc={adminTurnCameraFunc}
          options={options}
        />
      </div>
    </div>
  </div>
}

export default MainPage;