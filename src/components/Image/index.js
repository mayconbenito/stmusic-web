import React from 'react';
import { Img } from 'react-image';
import VisibilitySensor from 'react-visibility-sensor';

function Loader({ style }) {
  return <div style={{ ...style, background: '#000' }} />;
}

function Image(props) {
  const { src, style, fallback } = props;
  return (
    <VisibilitySensor>
      <Img {...props} src={[src, fallback]} loader={<Loader style={style} />} />
    </VisibilitySensor>
  );
}

export default React.memo(Image);
