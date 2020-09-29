import disableScroll from 'disable-scroll';
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { MdMoreVert } from 'react-icons/md';

import { Container, Button, MenuItems, MenuItem } from './styles';

export const ToolbarMenuItem = ({ children, ...props }) => {
  return <MenuItem {...props}>{children}</MenuItem>;
};

function ToolbarMenu({ style, children, ...props }) {
  const [showMenuItems, setShowMenuItems] = useState(false);

  const ref = useRef(null);
  const escapeListener = useCallback((e) => {
    if (e.key === 'Escape') {
      setShowMenuItems(false);
    }
  }, []);

  const clickListener = useCallback(
    (e) => {
      if (!ref.current?.contains(e.target)) {
        setShowMenuItems(false);
      }
    },
    [ref.current]
  );

  useEffect(() => {
    if (showMenuItems) {
      disableScroll.on({
        disableWheel: true,
        disableScroll: true,
        disableKeys: true,
        keyboardKeys: [32, 33, 34, 35, 36, 37, 38, 39, 40],
      });
    } else {
      disableScroll.off();
    }
  }, [showMenuItems]);

  useEffect(() => {
    // Attach the listeners on component mount.
    document.addEventListener('click', clickListener);
    document.addEventListener('keyup', escapeListener);
    // Detach the listeners on component unmount.
    return () => {
      document.removeEventListener('click', clickListener);
      document.removeEventListener('keyup', escapeListener);
      disableScroll.off();
    };
  }, []);

  return (
    <Container ref={ref} {...props} style={style}>
      <Button onClick={() => setShowMenuItems(!showMenuItems)}>
        <MdMoreVert size={24} color="#d99207" />
      </Button>
      <MenuItems showMenuItems={showMenuItems}>{children}</MenuItems>
    </Container>
  );
}

export default ToolbarMenu;
