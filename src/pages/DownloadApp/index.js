import axios from 'axios';
import React, { useEffect, useState } from 'react';

import logo from '../../assets/images/logo.svg';
import {
  Container,
  Logo,
  Description,
  DownloadButton,
  AppVersion,
} from './styles';

export default function DownloadApp() {
  const [downloadInfo, setDownloadInfo] = useState({});
  useEffect(() => {
    async function fetchDownloadInfo() {
      const response = await axios.get(
        'https://api.github.com/repos/mayconbenito/stmusic-mobile/releases/latest'
      );

      setDownloadInfo(response.data);
    }

    fetchDownloadInfo();
  }, []);

  function redirectToDownload() {
    if (downloadInfo)
      window.location.href = `https://github.com/mayconbenito/stmusic-mobile/releases/download/${downloadInfo.tag_name}/stmusic.apk`;
  }
  return (
    <Container>
      <Logo src={logo} />
      <Description>
        Baixe nosso aplicativo e ouça milhares de músicas gratuitamente em
        qualquer lugar.
      </Description>
      <DownloadButton onClick={redirectToDownload}>
        Baixar aplicativo
      </DownloadButton>
      {downloadInfo.tag_name && (
        <AppVersion>Versão {downloadInfo.tag_name}</AppVersion>
      )}
    </Container>
  );
}
