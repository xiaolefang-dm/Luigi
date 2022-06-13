import './video-panel.scss';
import React from 'react';

const VideoPanel = ({ name = '', wrapperId = '', flvVideoId = '' }) => {
  const [expanded, setExpended] = React.useState(false);
  return (
    <div className={'video-panel-wrapper ' + (expanded ? 'expand' : '')} id={wrapperId} onClick={()=>{
      setExpended(!expanded)
    }}>
      <video id={flvVideoId} width="100%"></video>
      <div className="name">{decodeURI(name)}</div>
    </div>
  );
};

export { VideoPanel };
