import React, { useEffect, useState } from 'react';
import ContentLayout from '../util/ContentLayout';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import { getBannerList, getNoticeList, getBoardList, getReviewList } from '../services/mainService';
import { getRoleFromToken } from '../util/JwtUtil';
import Chatbot from '../pages/Chatbot/Chatbot';

const LayoutDiv = styled.div`
  display: flex;
  width: 1380px;
  height: 500px;

  .swiper-button-next,
  .swiper-button-prev {
    color: #ffffff;
    font-size: 22px;
  }

  .swiper-pagination-bullet {
    background: #ff6600;
  }
`;

const ContentArea = styled.div`
  margin-top: 445px;
  margin-bottom: 30px;
`;

const BannerImg = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const TitleTextDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
`;

const ViewMore = styled.div`
  cursor: pointer;
`;

const CardAreaDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  justify-content: space-between;
  align-items: center;
  gap: 42px;
  margin-bottom: 70px;
`;

const Card = styled.div`
  width: 316px;
  height: auto;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 58px auto auto;
  padding: 22px;
  border-radius: 8px;
  box-sizing: border-box;
  border: 1px solid lightgray;
  cursor: pointer;

  &:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
  }
`;

const CardTitleTextDiv = styled.div`
  width: 100%;
  font-size: 20px;
  font-weight: 700;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-word;
`;

const CardContentTextDiv = styled.div`
  width: 100%;
  margin-top: 10px;
  margin-bottom: 2px;
  font-size: 14px;
  color: #696969;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  word-break: break-word;
  max-height: calc(1.4em * 3);
`;

const CardMidArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: #4e4e4e;
`;

const ReviewAreDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
  margin-bottom: 80px;
`;

const ReviewCard = styled.div`
  width: 234px;
  height: 200px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr 1fr 17px 1fr;
  padding: 20px;
  box-sizing: border-box;
  border: 1px solid lightgray;
  cursor: pointer;

  &:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
  }
`;

const HospitalNameText = styled.div`
  font-size: 22px;
  font-weight: 600;
  width: 100%;
  height: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const RankDiv = styled.div`
  font-size: 20px;
  margin-bottom: 15px;
`;

const ReviewDiv = styled.div`
  font-size: 15px;
  color: #424242;
  width: 100%;
  overflow: hidden;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const AreaDiv = styled.div`
  margin-top: 6px;
  font-size: 14px;
  color: #696969;
  width: 100%;
  height: 18px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ProfileAreaDiv = styled.div`
  display: flex;
  margin-top: 7px;
  gap: 7px;
  align-items: center;
`;

const AdAreaDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  justify-content: space-between;
  align-items: center;
  gap: 42px;
  margin-bottom: 70px;
`;

const AdTitleDiv = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const AdIcon = styled.img`
  width: 25px;
  height: 20px;
`;

const AdImg = styled.img`
  width: 495px;
  height: 155px;
  object-fit: cover;
`;

const Main = () => {
  const navi = useNavigate();
  const token = localStorage.getItem('token');

  const [bannerList, setBannerList] = useState([]);
  const [noticeList, setNoticeList] = useState([]);
  const [boardList, setBoardList] = useState([]);
  const [reviewList, setReviewList] = useState([]);

  useEffect(() => {
    if (getRoleFromToken(token) == 'ROLE_ADMIN') {
      window.localStorage.removeItem('token'); // 토큰 삭제
      navi('/');
    }
  }, [navi, token]);

  useEffect(() => {
    const getFetch = async () => {
      try {
        const bannerData = await getBannerList(token);
        const boardData = await getBoardList(token);
        const noticeData = await getNoticeList(token);
        const reviewData = await getReviewList(token);
        setBannerList(bannerData);
        setBoardList(boardData);
        setNoticeList(noticeData);
        setReviewList(reviewData);
      } catch (error) {
        console.error('[ERROR] GET LIST FAIL', error);
      }
    };
    getFetch();
  }, []);

  return (
    <>
      <LayoutDiv>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            waitForTransition: false,
          }}
        >
          {bannerList.map((vo, index) => {
            return (
              <SwiperSlide key={index}>
                <BannerImg src={vo.imageUrl} alt="배너이미지" />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </LayoutDiv>
      <ContentLayout>
        <ContentArea>
          <TitleTextDiv>
            <h2>📄 공지사항</h2>
            <ViewMore
              onClick={() => {
                navi('/notice');
              }}
            >
              {'더보기>'}
            </ViewMore>
          </TitleTextDiv>
          <CardAreaDiv>
            {noticeList.map((vo) => {
              return (
                <Card
                  key={vo.no}
                  onClick={() => {
                    navi(`/notice/detail?bno=${vo.no}`);
                  }}
                >
                  <CardTitleTextDiv>{vo.title}</CardTitleTextDiv>
                  <CardMidArea>
                    <ProfileAreaDiv>{vo.nick}</ProfileAreaDiv>
                  </CardMidArea>
                  <CardContentTextDiv>
                    조회수 {vo.hit} · {vo.enrollDate.slice(0, 10)}
                  </CardContentTextDiv>
                </Card>
              );
            })}
          </CardAreaDiv>
          <TitleTextDiv>
            <h2>🔥 이번주 Hot 꿀팁 </h2>
            <ViewMore
              onClick={() => {
                navi('/board');
              }}
            >
              {'더보기 >'}
            </ViewMore>
          </TitleTextDiv>
          <CardAreaDiv>
            {boardList.slice(0, 3).map((vo) => {
              return (
                <Card
                  key={vo.no}
                  onClick={() => {
                    navi(`/board/detail?bno=${vo.no}`);
                  }}
                >
                  <CardTitleTextDiv>
                    [{vo.categoryName}] {vo.title}
                  </CardTitleTextDiv>
                  <CardMidArea>
                    <ProfileAreaDiv>
                      <Avatar src={vo.profile ? vo.profile : '/broken-image.jpg'} sx={{ width: 22, height: 22 }} />
                      {vo.nick}
                    </ProfileAreaDiv>
                  </CardMidArea>
                  <CardContentTextDiv>
                    추천수 {vo.recommendCount} · {vo.enrollDate.slice(0, 10)}
                  </CardContentTextDiv>
                </Card>
              );
            })}
          </CardAreaDiv>
          <TitleTextDiv>
            <h2>👍 이번주 Best 병원 리뷰</h2>
            <ViewMore
              onClick={() => {
                navi('/review');
              }}
            >
              {'더보기 >'}
            </ViewMore>
          </TitleTextDiv>
          <ReviewAreDiv>
            {reviewList.slice(0, 4).map((vo) => {
              return (
                <ReviewCard
                  key={vo.no}
                  onClick={() => {
                    navi(`/review/detail?bno=${vo.no}`);
                  }}
                >
                  <HospitalNameText>{vo.name}</HospitalNameText>
                  <AreaDiv>
                    {vo.city} {vo.district}
                  </AreaDiv>
                  <RankDiv>{'⭐'.repeat(vo.rating)}</RankDiv>
                  <ReviewDiv>{vo.title}</ReviewDiv>
                  <ProfileAreaDiv>
                    <CardMidArea>
                      <ProfileAreaDiv>
                        <Avatar src={vo.profile ? vo.profile : '/broken-image.jpg'} sx={{ width: 22, height: 22 }} />
                        {vo.nick}
                      </ProfileAreaDiv>
                    </CardMidArea>
                  </ProfileAreaDiv>
                </ReviewCard>
              );
            })}
          </ReviewAreDiv>
          <TitleTextDiv>
            <AdTitleDiv>
              <AdIcon src="https://static-00.iconduck.com/assets.00/ad-icon-2048x1638-osvwd08x.png" />
              <h2>힐링로그 추천 병원</h2>
            </AdTitleDiv>
          </TitleTextDiv>
          <AdAreaDiv>
            <AdImg src="https://lh6.googleusercontent.com/proxy/Xdml5dy74GbBkgtLCNX0ST2-GJOBoOpuCgIW27SiZ4Z2p8q5jxFMXW_-DwoaAu19v5aq62YWN_ExK8EDrt6zBhYtAmtw1XDJiGl5nwdQZrJfhmI9ywhSIeEI6NW1lFPcMrOSajz4A9u6jkGCtard3UeXkj4MHyuA_GxKY0twj7X8nQ1KZsqAy111rgS_URD5eqpjsQIPU-p3pk3wggdRZDwjBd2TVOdC" />
            <AdImg src="https://lh6.googleusercontent.com/proxy/Xdml5dy74GbBkgtLCNX0ST2-GJOBoOpuCgIW27SiZ4Z2p8q5jxFMXW_-DwoaAu19v5aq62YWN_ExK8EDrt6zBhYtAmtw1XDJiGl5nwdQZrJfhmI9ywhSIeEI6NW1lFPcMrOSajz4A9u6jkGCtard3UeXkj4MHyuA_GxKY0twj7X8nQ1KZsqAy111rgS_URD5eqpjsQIPU-p3pk3wggdRZDwjBd2TVOdC" />
          </AdAreaDiv>
        </ContentArea>
      </ContentLayout>
    </>
  );
};

export default Main;
