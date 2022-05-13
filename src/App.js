import React from "react";
import AgoraRTC from 'agora-rtc-sdk-ng';
import { getAdminPasswdUrl, jsonHeader, loginService, agoraTokenServiceRTC } from "./configs/xiaohudao/config.js";
import LoginPage from './pages/xiaohudao/login-page.js';
import MainPage from './pages/xiaohudao/main-page.js';

// Agora sdk for Real Time Communication(audio and video).
let agoraRTC = null;

function App() {
  
  var uid = 0;
  var users = [];

  const [cloudCameras,setCloudCameras] = React.useState([]);
  const [user, setUser] = React.useState({});
  const [logged, setLogged] = React.useState(false);
  const [currentSocket, setCurrrentSocket] = React.useState(null);

  const initAgora = async () => {
		agoraRTC = AgoraRTC.createClient({ mode: 'live', codec: 'h264' });
		agoraRTC.setClientRole("host");
		agoraRTC.on('user-published', () => {});
		agoraRTC.on('user-joined', () => {});
		agoraRTC.on('user-left', () => {});
		agoraRTC.on('user-unpublished', () => {});
    if (logged)
		  joinRTCChannel();
	};

  React.useEffect(() => {
    initAgora();
  },[user]);

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
    socket.onopen = function (event) {
        socket.send(`${user.name}---0731---html_browser---${user.uid}`);
    };
    socket.onmessage = function (event) {
      var msg = JSON.parse(event.data);
      if (msg.stream) {
          console.log('checkout the playing list');
          const cloudCamerasNew = [];
          Object.keys( msg.stream ).map(key => 
            cloudCamerasNew.push(msg.stream[key])
          )
          setCloudCameras(cloudCamerasNew)
      }
      if (msg.users) {
          users = msg.users;
          console.log(users);
      }
      if (msg.chats) {
          console.log(msg.chats);
      }
    };
    setCurrrentSocket(socket);
  };

  const agoraRtcLogin = async(name) => {
		uid = Math.floor(Math.random() * 100000);
    const res = await fetch(agoraTokenServiceRTC + `?uid=${uid}&channel_name=tiger`);
		const response = await res.json();
    setUser(
      {
        name:name,
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
      selectVideoFunc={ v => {
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
    />
  }
  return (
    <LoginPage
      loginProcessing={loginProcessing} 
    />
  );
}

export default App;
