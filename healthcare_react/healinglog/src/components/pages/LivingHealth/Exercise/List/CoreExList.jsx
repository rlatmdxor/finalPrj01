import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBookmark } from '../../../../../redux/aerobicSlice';
import styled, { useTheme } from 'styled-components';
import Btn from '../../../../util/Btn';
import { useNavigate } from 'react-router-dom';

const CoreExList = ({ f }) => {
  const url = 'http://127.0.0.1:80/api/anaerobic/corelist';
  const [data, setData] = useState([]);
  const [bookmarkStatus, setBookmarkStatus] = useState({});
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((fetchedData) => setData(fetchedData))
      .catch((error) => console.error('Error:', error));
  }, [data]);

  // const dispatch = useDispatch();
  // const exVoList = useSelector((state) => state.anAerobic);
  const theme = useTheme();
  const navigate = useNavigate();

  // const coreData = exVoList.filter((item) => item.part === 'core' && item.bookmark === 'n');

  const handleToggleBookmark = (no) => {
    const url = 'http://127.0.0.1:80/api/anaerobic/markcore';
    const postData = { no: no };

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log('POST 요청 성공:', data);
        setBookmarkStatus((bookmarkStatus) => ({
          ...bookmarkStatus,
          [no]: data.bookmark,
        }));
      })
      .catch((error) => {
        console.error('POST 요청 에러:', error);
      });
  };

  return (
    <div>
      <ExList>
        <h2>코어</h2>
        {data.map((vo) => (
          <Line key={vo.no}>
            <Star>
              <StarIcon src="/img/EmptyStar.webp" onClick={() => handleToggleBookmark(vo.no)} />
            </Star>
            <Content>
              <div onClick={() => f(vo.name)} style={{ cursor: 'pointer' }}>
                {vo.name}
              </div>
              <div style={{ marginRight: '20px' }}>
                <Btn
                  str={'상세조회'}
                  c={theme.gray}
                  fs={'14'}
                  f={() => {
                    navigate(`/anaerobic/${vo.name}`);
                  }}
                  mt={'0'}
                  mb={'0'}
                  mr={'0'}
                  ml={'0'}
                />
              </div>
            </Content>
          </Line>
        ))}
      </ExList>
    </div>
  );
};

const Line = styled.div`
  display: grid;
  grid-template-columns: 75px 250px;
  justify-items: center;
`;

const Star = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  background-color: rgba(169, 205, 147, 0.4);
  width: 100%;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 10fr 1fr;
  justify-items: center;
  align-items: center;
  background-color: rgba(169, 205, 147, 0.2);
  width: 100%;
  font-size: 16px;
  font-weight: bold;
`;

const StarIcon = styled.img`
  width: 40px;
  height: 40px;
  background-color: unset;
  cursor: pointer;
`;

const ExList = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-auto-rows: 50px;
  justify-self: center;
  align-self: center;
  margin-bottom: 50px;
  row-gap: 3px;
`;

export default CoreExList;
