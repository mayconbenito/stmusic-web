import React from 'react';
import Img from 'react-image';

import noImage from '../../images/no-image.jpg';

function Loader({ style }) {
  return <div style={{ ...style, background: '#000' }} />;
}

function Image(props) {
  const { src, style } = props;
  return (
    <Img
      {...props}
      src={[src, noImage]}
      loader={<Loader style={style} />}
    />
  );
}

export default React.memo(Image);
