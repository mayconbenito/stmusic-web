import React from 'react';
import { Img } from 'react-image';
import { LazyLoadComponent } from 'react-lazy-load-image-component';

function Loader({ style }) {
  return <div style={{ ...style, background: '#000' }} />;
}

function Image(props) {
  const { src, style, fallback } = props;
  return (
    <LazyLoadComponent style={style}>
      <Img {...props} src={[src, fallback]} loader={<Loader style={style} />} />
    </LazyLoadComponent>
  );
}

export default React.memo(Image);
