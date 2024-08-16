import React from 'react';
import { transformImageUrl } from '../lib/feature';

const RenderAttachment = ({ url, fileType }) => {
  switch (fileType) {
    case 'audio':
      return <audio controls src={url}>Your browser does not support the audio tag.</audio>;
    case 'video':
      return <video controls preload='none' width="250" src={url}>Your browser does not support the video tag.</video>;
    case 'img':
      return <img src={transformImageUrl(url, 200)} alt="Image file" width="250" height="150" style={{ objectFit: "contain" }} />;
    case 'emoji':
      return <img src={url} alt="Emoji file" width="50" height="50" />;
    default:
      return <p>Unsupported file type</p>;
  }
}

export default RenderAttachment;
