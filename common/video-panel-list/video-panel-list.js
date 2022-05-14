import React from 'react';
import { Button, Checkbox, Dropdown, Menu, Icon } from 'semantic-ui-react';
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

const VideoPanelList = ({
  VideoPanelComponentList = [], Title = '',
  selectVideo = (v) => { console.log(v) },
  addVideo = (v) => { console.log('test') },
  deleteStream = (v) => { console.log(v) },
  bigScreenVideoComonentId = ''
}) => {

  const list = [];
  const [customName, setCustomName] = React.useState('');
  const [streamSource, setStreamSource] = React.useState('');

  VideoPanelComponentList.map(
    (videoPanelComponent) => {
      if (videoPanelComponent.valid)
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
            }, 200);
          });
          flvPlayer.attachMediaElement(videoElement);
          flvPlayer.load();
          flvPlayer.play();
        }, 200);
      list.push(
        <div key={videoPanelComponent.url} className={'video-panel-wrapper-list'} id={videoPanelComponent.url}>
          {
            <video id={videoPanelComponent.url + '-video'} onClick={() => {
              if (videoPanelComponent.valid && bigScreenVideoComonentId) {
                setTimeout(() => {
                  let videoElement = document.getElementById(bigScreenVideoComonentId);
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
                    }, 200);
                  });
                  flvPlayer.attachMediaElement(videoElement);
                  flvPlayer.load();
                  flvPlayer.play();
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
        </div >
      )
    }
  )
  return (
    <div className='whole-list'>
      <div className='title'>
        {Title}
      </div>
      <div className='addStream'>
        <label>自定义名称</label><input onChange={(e) => setCustomName(e.target.value)}></input><br />
        <label>视频源code</label><input onChange={(e) => setStreamSource(e.target.value)}></input><br />
        <Button onClick={() => {
          const checkedList = VideoPanelComponentList.filter(component => component.url === streamSource)
          if (checkedList.length > 0 && customName && streamSource)
            window.alert("视频源已经加过了");
          else
            addVideo(customName, streamSource)
        }}>添加</Button>
      </div>
      <div className='video'>{list}</div>
    </div>
  );
};

export { VideoPanelList };