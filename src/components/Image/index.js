import React from 'react';
import { Img } from 'react-image';

function Loader({ style }) {
  return <div style={{ ...style, background: '#000' }} />;
}

function Image(props) {
  const { src, style, fallback } = props;
  return (
    <Img {...props} src={[src, fallback]} loader={<Loader style={style} />} />
  );
}

export default Image;
