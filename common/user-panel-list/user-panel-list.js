import React from 'react';
import './user-panel-list.scss';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

/**  To be noticed: 
 * VideoPanelComponent: {
 *   name: test,
 *   url: xxxxx.flv,
 *   online: false,
 *   selected: false,
 * }
*/

const UserPanelList = ({ Users = [], Title = '', options = [{
  name: 'test', work: () => { console.log('test') }
}], adminMuteFunc = (source) => {console.log(source)}, 
adminTurnCameraFunc = (source) => {console.log(source)}, }) => {
  const list = [];
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  Users.map(
    (videoPanelComponent) => {
      list.push(
        <div key={videoPanelComponent.uid} className={'user-panel-wrapper-list'} id={videoPanelComponent.uid}><div className="button-list">
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            color="inherit"
            variant="outlined"
            size="small"
            onClick={handleClick}
          >
            ...
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            {options.map(option => <MenuItem onClick={() => {
              option.work(videoPanelComponent);
              setAnchorEl(null);
            }}>{option.name}</MenuItem>)}
          </Menu>
        </div>
          <div className="name-list">
            <div className='icon'>
              {decodeURIComponent(videoPanelComponent.user)}
            </div>
            <div className='icon'>
              {
                <img
                  src={videoPanelComponent.speaking ?
                    '../../assets/common/icons/microphone-filled.svg' :
                    '../../assets/common/icons/microphone-off-filled.svg'}
                  width='20rem' height='20rem' onClick={() => adminMuteFunc(videoPanelComponent)} />
              }
            </div>
            <div className='icon'>
              {
                <img
                  src={videoPanelComponent.work ?
                    '../../assets/common/icons/camera1.svg' :
                    '../../assets/common/icons/camera1-off.svg'}
                  width='20rem' height='20rem' onClick={() => adminTurnCameraFunc(videoPanelComponent)} />
              }
            </div>
          </div>
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