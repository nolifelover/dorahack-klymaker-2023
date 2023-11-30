import { useEffect, useRef } from 'react';

export const usePortal = (tagName: keyof HTMLElementTagNameMap) => {
  const portal = useRef(document.createElement(tagName));

  useEffect(() => {
    const current = portal.current;
    document.body.appendChild(portal.current);
    return () => void document.body.removeChild(current);
  }, []);

  return portal;
};
