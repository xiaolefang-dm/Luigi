import React from "react";
import AgoraRTC from 'agora-rtc-sdk-ng';
import { getAdminPasswdUrl, jsonHeader, loginService, agoraTokenServiceRTC } from "./config.js";
import LoginPage from './pages/login-page.js';
import MainPage from './pages/main-page.js';

// Agora sdk for Real Time Communication(audio and video).
let agoraRTC = null;

function App() {

  var uid = 0;

  const [cloudCameras, setCloudCameras] = React.useState([]);
  const [user, setUser] = React.useState({});
  const [logged, setLogged] = React.useState(false);
  const [currentSocket, setCurrrentSocket] = React.useState(null);
  const [chats, setChats] = React.useState([]);
  const [users, setUsers] = React.useState([]);

  const handleUserPublished = async (user, mediaType) => {
    console.log('User-published ', user.uid, mediaType);
    await agoraRTC.subscribe(user, mediaType);
    const peer = remotePeers.filter((r) => r.uid === user.uid);
    console.log(remotePeers)
    if (mediaType === 'video' && !peer[0].video_playing) {
      const remoteVideoTrack = user.videoTrack;

      remoteVideoTrack.play(user.uid);
      peer[0].video_playing = true;
    }
    if (mediaType === 'audio' && !peer[0].audio_playing) {
      const remoteAudioTrack = user.audioTrack;
      remoteAudioTrack.play();
      peer[0].audio_playing = true;
    }
  };

  const handleUserJoined = (user) => {
    console.log('User-joined ', user.uid, remotePeers);
    //agoraRTC.publish([localAudioTrack, localVideoTrack]);
    if (users.filter((r) => r.uid === user.uid).length === 0) {
      const currentUser = users.filter(user1 => user1.uid === user.uid.toString())
      user.name = currentUser.length > 0 ? currentUser[0].user : '未知';
      users.push(user);
      setUsers(users);
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

  const initAgora = async () => {
    agoraRTC = AgoraRTC.createClient({ mode: 'live', codec: 'h264' });
    agoraRTC.setClientRole("host");
    agoraRTC.on('user-published', handleUserPublished);
    agoraRTC.on('user-joined', handleUserJoined);
    agoraRTC.on('user-unpublished', handleUserUnpublished);
    agoraRTC.on('user-left', handleUserLeft);
    if (logged)
      joinRTCChannel();
  };

  React.useEffect(() => {
    initAgora();
  }, [user]);

  const joinRTCChannel = async () => {
    try {
      const uid1 = agoraRTC.join(user.appId, user.channelName, user.token, user.uid);
      console.log(uid1);
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
        setUsers(msg.users);
      }
      if (msg.chats) {
        setChats(msg.chats);
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
      }
    );
    socketProcessing()
    setLogged(true);

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
  if (logged) {
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
      chats={chats}
      users={users}
    />
  }
  return (
    <LoginPage
      loginProcessing={loginProcessing}
    />
  );
}

export default App;
