import React from 'react';
import Img from 'react-image';

import noImage from '../../images/no-image.jpg';

function Loader({ style }) {
  return <div style={{ ...style, background: '#000' }} />;
}

function Image(props) {
  return (
    <Img
      {...props}
      src={[props.src, noImage]}
      loader={<Loader style={props.style} />}
    />
  );
}

export default React.memo(Image);
