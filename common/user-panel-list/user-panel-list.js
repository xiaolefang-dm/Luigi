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
  name: 'test', function: () => { console.log('test') }
}] }) => {
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
              option.function(videoPanelComponent);
              setAnchorEl(null);
            }}>{option.name}</MenuItem>)}
          </Menu>
        </div>
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