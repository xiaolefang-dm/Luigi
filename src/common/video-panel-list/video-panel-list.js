import React from 'react';
import './video-panel-list.scss';

/**  To be noticed: 
 * VideoPanelComponent: {
 *   name: test,
 *   url: xxxxx.flv,
 *   online: false,
 *   selected: false,
 * }
*/

const VideoPanelList = ({ VideoPanelComponentList = [], Title = '' }) => {
  const list = [];
  VideoPanelComponentList.map(
    (videoPanelComponent) => {
      list.push(
        <div key={videoPanelComponent.url} className={'video-panel-wrapper-list'} id={videoPanelComponent.url}>
          {
            <video id={videoPanelComponent.url} width="100%"></video>
          }
          <div className="name-list">{videoPanelComponent.name}</div>
        </div>
      )
    }
  )
  return (
    <div className='whole-list'>
      <div className='title'><p>{Title}</p></div>
      <div className='video'>{list}</div>
    </div>
  );
};

export { VideoPanelList };