import React, { useState, useEffect } from 'react';

const useFetch = (url, options) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(url, options)
      .then((resp) => resp.json())
      .then((data) => {
        setData(data);
      });
  }, [data]);

  return { data, setData }; // 데이터와 갱신 함수를 반환
};

export default useFetch;
