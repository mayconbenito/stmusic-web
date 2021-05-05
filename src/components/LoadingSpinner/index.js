import React from 'react';
import { ClipLoader } from 'react-spinners';

import theme from '../../styles/theme';
import { Container } from './styles';

function LoadingSpinner({ size, loading }) {
  return (
    <Container>
      <ClipLoader
        sizeUnit="px"
        size={size}
        color={theme.colors.primary}
        loading={loading}
      />
    </Container>
  );
}

export default LoadingSpinner;
