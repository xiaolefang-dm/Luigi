import React from "react";
import AgoraRTC from 'agora-rtc-sdk-ng';
import { getAdminPasswdUrl, jsonHeader, loginService, agoraTokenServiceRTC, changeAdminPasswdUrl, changePasswdUrl, postPackage } from "./config.js";
import LoginPage from './pages/login-page.js';
import MainPage from './pages/main-page.js';

// Agora sdk for Real Time Communication(audio and video).
let agoraRTC = null;

function App() {

  var uid = 0;

  const [cloudCameras, setCloudCameras] = React.useState([]);
  const [user, setUser] = React.useState({});
  const [currentSocket, setCurrrentSocket] = React.useState(null);
  const [chats, setChats] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const [meetingOn, setMeetingOn] = React.useState(false);
  const [peers, setPeers] = React.useState([]);

  const handleUserPublished = async (user1, mediaType) => {
    console.log('User-published ', user1.uid, mediaType);
    await agoraRTC.subscribe(user1, mediaType);
    const peer = peers.filter((r) => r.uid === user1.uid);
    console.log(peer)
    if (peer.length > 0) {
      if (mediaType === 'video' && !peer[0].video_playing) {
        const remoteVideoTrack = user1.videoTrack;

        remoteVideoTrack.play(`${user1.uid}`);
        peer[0].video_playing = true;
      }
      if (mediaType === 'audio' && !peer[0].audio_playing) {
        const remoteAudioTrack = user1.audioTrack;
        remoteAudioTrack.play();
        peer[0].audio_playing = true;
      }
    }
  };

  const handleUserJoined = (user1) => {
    console.log('User-joined ', user1.uid, user);
    //agoraRTC.publish([localAudioTrack, localVideoTrack]);
    const currentPeers = peers;
    if (users.filter((r) => r.uid === user.uid).length === 0) {
      const currentUser = users.filter(user1 => user1.uid === user.uid.toString())
      user1.name = currentUser.length > 0 ? currentUser[0].user : '未知';
      peers.push(user1);
      setPeers(peers);
    }
  };

  const handleUserUnpublished = (user, mediaType) => {
    console.log('Chen: user-unpublished ', user.uid, mediaType);
  };

  const handleUserLeft = (user, mediaType) => {
    console.log('Chen: user-left ', user.uid, mediaType);
    if (users.filter((r) => r.uid === user.uid).length === 1) {
      let idx = 0;
      for (let i = 0; i < users.length; i++) {
        if (users[i].uid === user.uid) {
          idx = i;
          break;
        }
      }
      users.splice(idx, 1);
      setUsers(users);
    }
  };

  const initAgora = () => {
    agoraRTC = AgoraRTC.createClient({ mode: 'live', codec: 'h264' });
    agoraRTC.setClientRole("host");
    agoraRTC.on('user-published', handleUserPublished);
    agoraRTC.on('user-joined', handleUserJoined);
    agoraRTC.on('user-unpublished', handleUserUnpublished);
    agoraRTC.on('user-left', handleUserLeft);
    if (user.uid && user.name && user.appId && user.channelName)
      joinRTCChannel();
  };

  React.useEffect(() => {
    initAgora();
  }, [user]);

  const joinRTCChannel = () => {
    try {
      console.log(user)
      const uid1 = agoraRTC.join(user.appId, user.channelName, user.token, user.uid);
    } catch (e) {
      throw new Error('Join channel failed');
    }
  };

  const socketProcessing = () => {
    const socket = new WebSocket("wss://xhd.deepmirror.com.cn:50802");
    const name = 'admin';
    const uid_1 = Math.ceil(Math.random() * 10000)
    console.log(uid_1);
    socket.onopen = function (event) {
      socket.send(`${name}---0731---html_browser---${uid_1}`);
    };
    socket.onmessage = function (event) {
      var msg = JSON.parse(event.data);
      if (msg.stream) {
        console.log('checkout the playing list');
        const cloudCamerasNew = [];
        Object.keys(msg.stream).map(key =>
          cloudCamerasNew.push(msg.stream[key])
        )
        setCloudCameras(cloudCamerasNew)
      }
      if (msg.users) {
        console.log(msg.users)
        setUsers(msg.users);
      }
      if (msg.chats) {
        setChats(msg.chats);
      }
      if (msg.neworder) {
        setUsers(msg.neworder.users);
      }
      if (msg.adminmeeting) {
        const meeting = msg.adminmeeting;
        if (meeting === 'true') {
          setMeetingOn(true)
        } else {
          setMeetingOn(false)
        }
      }
    };
    setCurrrentSocket(socket);
  };

  const agoraRtcLogin = async (name) => {
    uid = Math.floor(Math.random() * 100000);
    const res = await fetch(agoraTokenServiceRTC + `?uid=${uid}&channel_name=tiger`);
    const response = await res.json();
    setUser(
      {
        name: name,
        appId: response.appId,
        channelName: response.channelName,
        uid: response.uid,
        token: response.token,
      }
    );
    socketProcessing()

  }

  const loginProcessing = async (name, passwd) => {
    if (name === 'admin')
      fetch(getAdminPasswdUrl)
        .then((res) => res.text())
        .then((text) => JSON.parse(text))
        .then((json) => {
          if (passwd !== json.adminPasswd) {
            window.alert("口令错误");
            return false;
          } else {
            window.alert("口令准确")
          }
          agoraRtcLogin(name);
        });
    else
      window.alert('口令错误')
  }
  if (user.uid && user.name && user.appId && user.channelName) {
    return <MainPage
      uid={user.uid}
      cloudCameras={cloudCameras}
      selectVideoFunc={v => {
        currentSocket.send(v)
      }}
      addVideoFunc={
        (name, code) => {
          const data = 'add_stream_list:{"name":"' + name + '", "url":"' + code + '"}';
          currentSocket.send(data);
          window.alert(name + "视频源已经添加完成");
        }
      }
      deleteVideoFunc={
        (value) => {
          currentSocket.send(value);
        }
      }
      pushStreamFunc={
        (value) => {
          currentSocket.send(value);
        }
      }
      options={
        [
          {
            name: '移除用户',
            job: (component) => {
              if (window.confirm('确认要删除用户:' + decodeURI(component.user) + '(' + component.uid + ')'))
                currentSocket.send('logout:' + component.uid);
            }
          },
          {
            name: '修改称呼',
            job: (component) => {
              let user = window.prompt("输入你的名称", '');
              if (user && user !== component.user) {
                currentSocket.send('modify_user_name:' + component.uid + '---' + encodeURI(user));
              }
            }
          },
          {
            name: '上移一位',
            job: (component) => {
              for (let i = 0; i < users.length; i++) {
                if (i !== 0 && users[i] === component) {
                  console.log('user_orders:{"new_position":' + (i - 1).toString() + ', "old_position":' + i.toString() + '}')
                  currentSocket.send('user_orders:{"new_position":' + (i - 1).toString() + ', "old_position":' + i.toString() + '}')
                  break;
                }
              }
            }
          },
          {
            name: '下移一位',
            job: (component) => {
              for (let i = 0; i < users.length; i++) {
                if (i !== users.length - 1 && users[i] === component) {
                  currentSocket.send('user_orders:{"new_position":' + (i + 1).toString() + ', "old_position":' + i.toString() + '}')
                  break;
                }
              }
            }
          },
          {
            name: '推送用户',
            job: (component) => {
              const value =  'fullscreen---user---rtc-user-' + component.uid;
              currentSocket.send(value);
            }
          }
        ]
      }
      switchMeeting={
        () => {
          currentSocket.send('----meeting_on----' + !meetingOn);
        }
      }
      changeAdminPasswd={
        (data) => {
          var postPackageUsed = postPackage;
          postPackageUsed.body = data;
          console.log(postPackageUsed);
          fetch(changeAdminPasswdUrl, postPackageUsed)
            .then(res => {
              window.alert('密码已经修改成功');
            })
            .catch(res => {
              window.alert('密码修改失败');
            })
        }
      }
      changePasswd={
        (data) => {
          var postPackageUsed = postPackage;
          postPackageUsed.body = data;
          console.log(postPackageUsed);
          fetch(changePasswdUrl, postPackageUsed)
            .then(res => {
              window.alert('密码已经修改成功');
            })
            .catch(res => {
              window.alert('密码修改失败');
            })
        }
      }
      chats={chats}
      users={users}
      meetingOn={meetingOn}
      adminMuteFunc={user => {
        if (meetingOn)
          currentSocket.send(`adminmuted---${user.uid}`);
        else
          window.alert('会议尚未开始');
      }}
      adminTurnCameraFunc={user => {
        if (meetingOn)
          currentSocket.send(`adminwork---${user.uid}`)
        else
          window.alert('会议尚未开始');
      }}
    />
  }
  return (
    <LoginPage
      loginProcessing={loginProcessing}
    />
  );
}

export default App;
