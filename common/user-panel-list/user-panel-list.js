import React from 'react';
import './user-panel-list.scss';
import Button from '@mui/material/Button';
import { Checkbox } from 'semantic-ui-react';
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

const UserPanelList = ({
  Users = [],
  Title = '',
  options = [{
    name: 'test', job: () => { console.log('test') }
  }],
  adminMuteFunc = (source) => { console.log(source) },
  adminTurnCameraFunc = (source) => { console.log(source) },
  changeSpeakerOff = (source) => {console.log(source)},
}) => {
  const validList = [];
  const unvalidList = [];
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [currentComponent, setCurrentComponent] = React.useState(null);
  const [expanded, setExpended] = React.useState(null);
  const [displayUnvalidList, setDisplayUnvalidList] = React.useState(false);
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };
  Users.map(
    (videoPanelComponent, index) => {
      const item = (<div key={videoPanelComponent.uid}
        className={'user-panel-wrapper-list ' + (expanded === index ? 'expand' : '')}
        id={videoPanelComponent.uid} 
        onClick={
          () => {
            expanded === index  && setExpended(null);
          }
        }
        >
        <div className="button-list">
          <Button
            id={videoPanelComponent.uid}
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            color="inherit"
            variant="outlined"
            size="small"
            onClick={event => {
              setAnchorEl(event.currentTarget);
              setCurrentComponent(videoPanelComponent);
            }}
          >
            ...
          </Button>
          <Menu
            id={videoPanelComponent.uid}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            {options.map(option =>
              <MenuItem onClick={
                () => {
                  option.job(currentComponent);
                  handleClose(currentComponent);
                }
              }>{option.name}</MenuItem>)}
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
                width='25rem' height='25rem' onClick={() => adminMuteFunc(videoPanelComponent)} />
            }
          </div>
          <div className='icon'>
            {
              <img
                src={videoPanelComponent.work ?
                  '../../assets/common/icons/camera1.svg' :
                  '../../assets/common/icons/camera1-off.svg'}
                width='25rem' height='25rem' onClick={() => adminTurnCameraFunc(videoPanelComponent)} />
            }
          </div>
          <div className='icon'>
            {
              <img width='25rem' height='25rem'
                onClick={
                  () => {changeSpeakerOff(videoPanelComponent)}
                }
                src={videoPanelComponent.speakerOff ?
                  '../../assets/common/icons/speaker-off.svg' :
                  '../../assets/common/icons/speaker-on.svg'} />
            }
          </div>
          <div className='icon'>
            {
              <img width='25rem' height='25rem'
                onClick={
                  () => {
                    if (expanded !== null) {
                      setExpended(null);
                    } else {
                      setExpended(index);
                    }
                  }
                }
                src={'../../assets/common/icons/expand-alt.svg'} />
            }
          </div>
        </div>
      </div>);
      if (videoPanelComponent.work)
        validList.push(item);
      else
        unvalidList.push(item);
    }
  )
  return (
    <div className='whole-user-list'>
      <div className='title'><p>{Title}</p></div>
      <div>?????????????????????</div>
      <div className='user'>{validList}</div>
      <div><Checkbox label={'?????????????????????'} onChange={(e, data) => {setDisplayUnvalidList(data.checked)}}></Checkbox></div>
      <div className='user'>{displayUnvalidList ? unvalidList : []}</div>
    </div>
  );
};

export { UserPanelList };