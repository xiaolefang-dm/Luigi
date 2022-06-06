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

var flvPlayer = null;

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

  VideoPanelComponentList.map(
    (videoPanelComponent) => {
      if (videoPanelComponent.valid && !videoPanelComponent.play)
        setTimeout(() => {
          let videoElement = document.getElementById(videoPanelComponent.url + '-video');
          let flvPlayer = FlvJs.createPlayer({ type: 'flv', url: `https://xhd.deepmirror.com.cn:8088/live/${videoPanelComponent.url}.flv` });
          flvPlayer.on('error', (err, detail) => {
            console.warn('Flv Player error', err, detail);
            flvPlayer.detachMediaElement();
            flvPlayer.unload();
            // Reset the player and retry.
            setTimeout(() => {
              console.warn('Flv Player reset');
              flvPlayer.attachMediaElement(videoElement);
              flvPlayer.load();
              flvPlayer.play();
              videoPanelComponent.play = true;
            }, 200);
          });
          flvPlayer.attachMediaElement(videoElement);
          flvPlayer.load();
          flvPlayer.play();
          videoPanelComponent.play = true;
        }, 200);
      const item = <div key={videoPanelComponent.url} className={'video-panel-wrapper-list'} id={videoPanelComponent.url}>
        {
          <video id={videoPanelComponent.url + '-video'} onClick={() => {
            if (videoPanelComponent.valid && bigScreenVideoComonentId) {
              if (bigScreenUrl !== videoPanelComponent.url)
                setTimeout(() => {
                  if (flvPlayer) {
                    flvPlayer.detachMediaElement();
                    flvPlayer.unload();
                  }
                  let videoElement = document.getElementById(bigScreenVideoComonentId);
                  flvPlayer = FlvJs.createPlayer({ type: 'flv', url: `https://xhd.deepmirror.com.cn:8088/live/${videoPanelComponent.url}.flv` });
                  flvPlayer.on('error', (err, detail) => {
                    console.warn('Flv Player error', err, detail);
                    flvPlayer.detachMediaElement();
                    flvPlayer.unload();
                    // Reset the player and retry.
                    setTimeout(() => {
                      console.warn('Flv Player reset');
                      flvPlayer.attachMediaElement(videoElement);
                      flvPlayer.load();
                      flvPlayer.play();
                    }, 200);
                    setBigScreenUrl(videoPanelComponent.url)
                  });
                  flvPlayer.attachMediaElement(videoElement);
                  flvPlayer.load();
                  flvPlayer.play();
                  setBigScreenUrl(videoPanelComponent.url)
                }, 200);
            } else
              window.alert(`该视频暂不可用或者没有大屏部件，请检查...`)
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
          if (window.confirm("是否确认删除" + videoPanelComponent.name + "?"))
            deleteStream(value);
        }}>点击删除</div>
        <div className='push-list' onClick={() => {
          if (videoPanelComponent.valid && videoPanelComponent.online) {
            let value = 'fullscreen---stream---' + videoPanelComponent.url;
            pushStream(value);
          } else {
            window.alert('视频没有在线/选择')
          }
        }}>点击推送</div>
        <div className='unpush-list' onClick={() => {
          if (videoPanelComponent.valid && videoPanelComponent.online) {
            let value = 'unfullscreen---stream---' + videoPanelComponent.url;
            pushStream(value);
          } else {
            window.alert('视频没有在线/选择')
          }
        }}>取消推送</div>
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
          <TextField size='small' label="自定义名称" onChange={(e) => setCustomName(e.target.value)}></TextField><br />
          <TextField size='small' label="视频源code" onChange={(e) => setStreamSource(e.target.value)}></TextField><br />
          <Button onClick={() => {
            const checkedList = VideoPanelComponentList.filter(component => component.url === streamSource)
            if (checkedList.length > 0 && customName && streamSource)
              window.alert("视频源已经加过了");
            else
              addVideo(customName, streamSource)
          }} color="success" variant="contained">添加</Button>
        </div>
      </div>
      <div>在线视频</div>
      <div className='video'>{validList}</div>
      <div><Checkbox label={'离线视频'} onChange={(e, data) => {setDisplayUnvalidList(data.checked)}}></Checkbox></div>
      <div className='video'>{displayUnvalidList ? unvalidList : []}</div>
    </div>
  );
};

export { VideoPanelList };