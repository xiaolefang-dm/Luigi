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
        <div className={'user-panel-wrapper-list'} id={videoPanelComponent.uid}>
          <div className="name-list">{decodeURIComponent(videoPanelComponent.user)}</div>
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