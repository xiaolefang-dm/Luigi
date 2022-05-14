import './video-panel.scss';
import React from 'react';

const VideoPanel = ({ name = '', wrapperId = '', flvVideoId = '' }) => {

  return (
    <div className={'video-panel-wrapper '} id={wrapperId}>
      <video id={flvVideoId} width="100%"></video>
      <div className="name">{decodeURI(name)}</div>
    </div>
  );
};

export { VideoPanel };
