import React from 'react';
import { ClipLoader } from 'react-spinners';

import { Container } from './styles';

function LoadingSpinner({ size, loading }) {
  return (
    <Container>
      <ClipLoader
        sizeUnit="px"
        size={size}
        color="#d99207"
        loading={loading}
      />
    </Container>
  );
}

export default LoadingSpinner;
