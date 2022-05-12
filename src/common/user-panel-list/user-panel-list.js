import React from 'react';
import './user-panel-list.scss';

/**  To be noticed: 
 * VideoPanelComponent: {
 *   name: test,
 *   url: xxxxx.flv,
 *   online: false,
 *   selected: false,
 * }
*/

const UserPanelList = ({ Users = [], Title = '' }) => {
  const list = [];
  Users.map(
    (videoPanelComponent) => {
      list.push(
        <div className={'user-panel-wrapper-list'} id={videoPanelComponent.url}>
          {
            <video id={videoPanelComponent.url}  width="100%"></video>
          }
          <div className="name-list">{videoPanelComponent.name}</div>
        </div>
      )
    }
  )
  return (
    <div className='whole-user-list'>
      <div className='title'><p>{Title}</p></div>
      <div className='user'>{list}</div>
    </div>
  );
};

export { UserPanelList };