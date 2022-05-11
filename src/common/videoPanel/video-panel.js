import './video-panel.scss';
import React from 'react';

const VideoPanel = ({ name = '', wrapperId = '',
  isFlv = true, flvVideoId = '' }) => {

  return (
    <div className={'video-panel-wrapper '} id={wrapperId}>
      {isFlv &&
        <video id={flvVideoId} width="100%"></video>
      }
      <div className="name">{decodeURI(name)}</div>
    </div>
  );
};

export { VideoPanel };
