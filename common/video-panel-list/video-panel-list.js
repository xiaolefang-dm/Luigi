import React from 'react';
import { Checkbox } from 'semantic-ui-react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FlvJs from 'flv.js';
import './video-panel-list.scss';

/**  To be noticed: 
 * VideoPanelComponent: {
 *   name: test,
 *   url: xxxxx.flv,
 *   online: false,
 *   selected: false,
 * }
*/
const options = [
  { key: 'edit', icon: 'edit', text: 'Edit Post', value: 'edit' },
  { key: 'delete', icon: 'delete', text: 'Remove Post', value: 'delete' },
  { key: 'hide', icon: 'hide', text: 'Hide Post', value: 'hide' },
]

var flvPlayer1 = null;

var flvPlayers = [];

const VideoPanelList = ({
  VideoPanelComponentList = [], Title = '',
  selectVideo = (v) => { console.log(v) },
  addVideo = (v) => { console.log('test') },
  deleteStream = (v) => { console.log(v) },
  pushStream = (v) => { console.log(v) },
  bigScreenVideoComonentId = ''
}) => {

  const validList = [];
  const unvalidList = [];
  const [customName, setCustomName] = React.useState('');
  const [streamSource, setStreamSource] = React.useState('');
  const [bigScreenUrl, setBigScreenUrl] = React.useState('');
  const [displayUnvalidList, setDisplayUnvalidList] = React.useState(false);

  flvPlayers.map(flvPlayer2 => {
    flvPlayer2.pause();
    flvPlayer2.unload();
    flvPlayer2.detachMediaElement();
    flvPlayer2.destroy();
    flvPlayer2 = null;
  })
  flvPlayers = [];
  VideoPanelComponentList.map(
    (videoPanelComponent) => {
      if (videoPanelComponent.valid)
        setTimeout(() => {
          let videoElement = document.getElementById(videoPanelComponent.url + '-video');
          let flvPlayer = FlvJs.createPlayer({ type: 'flv', url: `https://xhd.deepmirror.com.cn:8088/live/${videoPanelComponent.url}.flv` }, {
            enableStashBuffer: false,
            fixAudioTimestampGap: false,
            isLive: true
          });
          flvPlayer.detachMediaElement();
          flvPlayer.unload();
          flvPlayer.on(FlvJs.ERROR, (err, detail) => {
            console.warn('Flv Player error', err, detail);
            flvPlayer.detachMediaElement();
            flvPlayer.unload();
            // Reset the player and retry.
            setTimeout(() => {
              console.warn('Flv Player reset');
              flvPlayer.attachMediaElement(videoElement);
              flvPlayer.load();
              flvPlayer.play();
              flvPlayers.push(flvPlayer);
            }, 200);
          });
          flvPlayer.attachMediaElement(videoElement);
          flvPlayer.load();
          flvPlayer.play();
          flvPlayers.push(flvPlayer);
        }, 200);
      const item = <div key={videoPanelComponent.url} className={'video-panel-wrapper-list'} id={videoPanelComponent.url}>
        {
          <video id={videoPanelComponent.url + '-video'} onClick={() => {
            if (videoPanelComponent.valid && bigScreenVideoComonentId) {
              if (bigScreenUrl !== videoPanelComponent.url)
                setTimeout(() => {
                  if (flvPlayer1) {
                    flvPlayer1.detachMediaElement();
                    flvPlayer1.unload();
                  }
                  let videoElement1 = document.getElementById(bigScreenVideoComonentId);
                  flvPlayer1 = FlvJs.createPlayer({ type: 'flv', url: `https://xhd.deepmirror.com.cn:8088/live/${videoPanelComponent.url}.flv` }, {
                    enableStashBuffer: false,
                    fixAudioTimestampGap: false,
                    isLive: true
                  });
                  flvPlayer1.on('error', (err, detail) => {
                    console.warn('Flv Player error', err, detail);
                    flvPlayer1.detachMediaElement();
                    flvPlayer1.unload();
                    // Reset the player and retry.
                    setTimeout(() => {
                      console.warn('Flv Player reset');
                      flvPlayer1.attachMediaElement(videoElement1);
                      flvPlayer1.load();
                      flvPlayer1.play();
                    }, 200);
                    setBigScreenUrl(videoPanelComponent.url)
                  });
                  flvPlayer1.attachMediaElement(videoElement1);
                  flvPlayer1.load();
                  flvPlayer1.play();
                  setBigScreenUrl(videoPanelComponent.url)
                }, 200);
            } else
              window.alert(`?????????????????????????????????????????????????????????...`)
          }} width="100%"></video>
        }
        <div className="name-list">
          {videoPanelComponent.name}
          {
            <img
              src={videoPanelComponent.valid ?
                '../../assets/common/icons/online.svg' :
                '../../assets/common/icons/offline.svg'}
              width='5%' height='5%' />
          }
          <Checkbox slider width={'5%'} checked={videoPanelComponent.online} onChange={(e, info) => {
            let value = 'reduce_stream:' + videoPanelComponent.url;
            if (info.checked)
              value = 'add_stream: { "name": "' + videoPanelComponent.name + '", "url": "' + encodeURIComponent(videoPanelComponent.url) + '"}';
            selectVideo(value);
          }}></Checkbox>
        </div>
        <div className='close-list' onClick={() => {
          let value = "reduce_stream_list:" + videoPanelComponent.url;
          if (window.confirm("??????????????????" + videoPanelComponent.name + "?"))
            deleteStream(value);
        }}>????????????</div>
        <div className='push-list' onClick={() => {
          if (videoPanelComponent.valid && videoPanelComponent.online) {
            let value = 'fullscreen---stream---' + videoPanelComponent.url;
            pushStream(value);
          } else {
            window.alert('??????????????????/??????')
          }
        }}>????????????</div>
        <div className='unpush-list' onClick={() => {
          if (videoPanelComponent.valid && videoPanelComponent.online) {
            let value = 'unfullscreen---stream---' + videoPanelComponent.url;
            pushStream(value);
          } else {
            window.alert('??????????????????/??????')
          }
        }}>????????????</div>
      </div >
      if (videoPanelComponent.valid)
        validList.push(item);
      else
        unvalidList.push(item);
    }
  )
  
  return (
    <div className='whole-list'>
      <div className='title'>
        {Title}
      </div>
      <div className='addStream'>
        <div className='empty'></div>
        <div className='content'>
          <TextField size='small' label="???????????????" onChange={(e) => setCustomName(e.target.value)}></TextField><br />
          <TextField size='small' label="?????????code" onChange={(e) => setStreamSource(e.target.value)}></TextField><br />
          <Button onClick={() => {
            const checkedList = VideoPanelComponentList.filter(component => component.url === streamSource)
            if (checkedList.length > 0 && customName && streamSource)
              window.alert("????????????????????????");
            else
              addVideo(customName, streamSource)
          }} color="success" variant="contained">??????</Button>
        </div>
      </div>
      <div>????????????</div>
      <div className='video'>{validList}</div>
      <div><Checkbox label={'????????????'} onChange={(e, data) => { setDisplayUnvalidList(data.checked) }}></Checkbox></div>
      <div className='video'>{displayUnvalidList ? unvalidList : []}</div>
    </div>
  );
};

export { VideoPanelList };