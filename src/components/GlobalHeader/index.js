import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdArrowDropDown,
} from 'react-icons/md';
import { useLastLocation } from 'react-router-last-location';

import { isLoggedIn, getSessionData, logout } from '../../helpers/session';
import theme from '../../styles/theme';
import {
  Container,
  NavigationButtons,
  NavigationButton,
  LoginButton,
  UserInfo,
  Name,
  ArrowDown,
  Dropdown,
  DropdownItem,
} from './styles';

function GlobalHeader({ history }) {
  const lastLocation = useLastLocation();
  const { t } = useTranslation();
  const { user } = getSessionData();
  const [userInfoHover, setUserInfoHover] = useState(true);

  const [canGoBack, setCanGoBack] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownRef = useRef(null);
  const escapeListener = useCallback((e) => {
    if (e.key === 'Escape') {
      setShowDropdown(false);
    }
  }, []);

  const clickListener = useCallback(
    (e) => {
      if (!dropdownRef.current?.contains(e.target)) {
        setShowDropdown(false);
      }
    },
    [dropdownRef.current]
  );

  function checkCanGoBack() {
    if (lastLocation) {
      return true;
    }

    if (!lastLocation) {
      const artistRegex = new RegExp('/artists/[0-9]');
      const genreRegex = new RegExp('/genres/[0-9]');
      const playlistRegex = new RegExp('/playlists/[0-9]');
      const albumRegex = new RegExp('/albums/[0-9]');
      const libraryPlaylistRegex = new RegExp('/library/playlists');
      const libraryArtistRegex = new RegExp('/library/artists');
      const searchRegex = new RegExp('/search');

      if (
        history.location.pathname.match(artistRegex) ||
        history.location.pathname.match(genreRegex) ||
        history.location.pathname.match(playlistRegex) ||
        history.location.pathname.match(albumRegex) ||
        history.location.pathname.match(libraryPlaylistRegex) ||
        history.location.pathname.match(libraryArtistRegex) ||
        history.location.pathname.match(searchRegex)
      ) {
        return true;
      }
    }

    return false;
  }

  useEffect(() => {
    setCanGoBack(checkCanGoBack());
    // Attach the listeners on component mount.
    document.addEventListener('click', clickListener);
    document.addEventListener('keyup', escapeListener);
    // Detach the listeners on component unmount.
    return () => {
      document.removeEventListener('click', clickListener);
      document.removeEventListener('keyup', escapeListener);
    };
  }, []);

  function handleShowDropdown() {
    setShowDropdown(!showDropdown);
  }

  function handleGoBack() {
    if (lastLocation) {
      history.goBack();
    }

    if (!lastLocation) {
      const artistRegex = new RegExp('/artists/[0-9]');
      const genreRegex = new RegExp('/genres/[0-9]');
      const playlistRegex = new RegExp('/playlists/[0-9]');
      const albumRegex = new RegExp('/albums/[0-9]');
      const libraryPlaylistRegex = new RegExp('/library/playlists');
      const libraryArtistRegex = new RegExp('/library/artists');
      const searchRegex = new RegExp('/search');

      if (
        history.location.pathname.match(artistRegex) ||
        history.location.pathname.match(genreRegex) ||
        history.location.pathname.match(playlistRegex) ||
        history.location.pathname.match(albumRegex) ||
        history.location.pathname.match(libraryPlaylistRegex) ||
        history.location.pathname.match(libraryArtistRegex) ||
        history.location.pathname.match(searchRegex)
      ) {
        history.push('/');
      }
    }
  }

  return (
    <Container>
      <NavigationButtons>
        <NavigationButton onClick={handleGoBack} hover={canGoBack}>
          <MdKeyboardArrowLeft color={theme.colors.primary} size={24} />
        </NavigationButton>
        <NavigationButton onClick={history.goForward} hover>
          <MdKeyboardArrowRight color={theme.colors.primary} size={24} />
        </NavigationButton>
      </NavigationButtons>

      {isLoggedIn() ? (
        <UserInfo
          ref={dropdownRef}
          menuHover={userInfoHover}
          onClick={handleShowDropdown}
        >
          <Name>{user.name}</Name>
          <ArrowDown>
            <MdArrowDropDown size={24} color={theme.colors.primary} />
          </ArrowDown>
          {showDropdown && (
            <Dropdown>
              <DropdownItem
                onClick={logout}
                onMouseOut={() => setUserInfoHover(true)}
                onMouseEnter={() => setUserInfoHover(false)}
              >
                {t('global_header.logout_button')}
              </DropdownItem>
            </Dropdown>
          )}
        </UserInfo>
      ) : (
        <LoginButton onClick={() => history.push('/login')}>
          {t('global_header.login_button')}
        </LoginButton>
      )}
    </Container>
  );
}

export default GlobalHeader;
