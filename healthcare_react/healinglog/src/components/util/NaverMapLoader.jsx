import { useEffect } from 'react';

const NaverMapLoader = () => {
  useEffect(() => {
    const existingScript = document.getElementById('naver-map-sdk');
    if (!existingScript) {
      const script = document.createElement('script');
      script.id = 'naver-map-sdk';
      script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.REACT_APP_NAVER_MAP_API_ID}`;
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  return null;
};

export default NaverMapLoader;
