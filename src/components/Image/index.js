import React from 'react';
import { Img } from 'react-image';

import theme from '../../styles/theme';

function Loader({ style }) {
  return <div style={{ ...style, background: theme.colors.black }} />;
}

function Image(props) {
  const { src, style, fallback } = props;
  return (
    <Img {...props} src={[src, fallback]} loader={<Loader style={style} />} />
  );
}

export default Image;
