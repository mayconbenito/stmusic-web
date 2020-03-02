import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
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
      <Description>{t('download_app.description')}</Description>
      <DownloadButton onClick={redirectToDownload}>
        {t('download_app.download_button')}
      </DownloadButton>
      {downloadInfo.tag_name && (
        <AppVersion>
          {t('download_app.version')}
          {downloadInfo.tag_name}
        </AppVersion>
      )}
    </Container>
  );
}
