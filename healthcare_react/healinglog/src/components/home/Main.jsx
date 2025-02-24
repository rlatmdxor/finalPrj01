import React from 'react';
import ContentLayout from '../util/ContentLayout';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import styled from 'styled-components';

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
  margin-top: 430px;
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
`;

const CardAreaDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  justify-content: space-between;
  align-items: center;
  gap: 51px;
  margin-bottom: 60px;
`;

const Card = styled.div`
  width: 305px;
  height: 170px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 55px 1fr;
  padding: 17px;
  border-radius: 8px;
  box-sizing: border-box;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
  border: 1px solid lightgray;
`;

const CardTitleTextDiv = styled.div`
  width: 100%;
  font-size: 20px;
  font-weight: 800;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-word;
`;

const CardContentTextDiv = styled.div`
  width: 100%;
  margin-top: 12px;
  font-size: 14px;
  color: #4e4e4e;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  word-break: break-word;
  max-height: calc(1.4em * 3);
`;

const SmallCardAreaDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  justify-content: space-between;
  align-items: center;
  gap: 37px;
  margin-bottom: 60px;
`;

const SmallCard = styled.div`
  width: 225px;
  height: 300px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 150px 1fr;
  padding: 17px;
  border-radius: 8px;
  box-sizing: border-box;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
  border: 1px solid lightgray;
`;

const CardImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
`;

const Main = () => {
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
            delay: 3500,
            disableOnInteraction: false,
          }}
        >
          <SwiperSlide>
            <BannerImg src="https://www.kdca.go.kr/cdc/img/new/newsBanner_034.jpg" alt="메인배너1" />
          </SwiperSlide>
          <SwiperSlide>
            <BannerImg src="https://www.kdca.go.kr/cdc/img/new/newsBanner_030.jpg" alt="메인배너2" />
          </SwiperSlide>
          <SwiperSlide>
            <BannerImg src="https://www.kdca.go.kr/cdc/img/new/newsBanner_035.jpg" alt="메인배너3" />
          </SwiperSlide>
        </Swiper>
      </LayoutDiv>
      <ContentLayout>
        <ContentArea>
          <TitleTextDiv>
            <h2>공지사항</h2>
            <div>{'더보기>'}</div>
          </TitleTextDiv>
          <CardAreaDiv>
            <Card>
              <CardTitleTextDiv>미라클 모닝 챌린저에 참여하세요</CardTitleTextDiv>
              <CardContentTextDiv>
                안녕하세요 힐링로그 회원 여러분 미라클 모닝 이벤트에 참여하고 상금 300만원 받아가세요!
              </CardContentTextDiv>
            </Card>
            <Card>
              <CardTitleTextDiv>병원 리뷰 이벤트</CardTitleTextDiv>
              <CardContentTextDiv>
                안녕하세요 힐링로그 회원 여러분 병원 리뷰 이벤트에 참여하고 상금 300만원 받아가세요 많관부 많관부~~~
              </CardContentTextDiv>
            </Card>
            <Card>
              <CardTitleTextDiv>서버 점검 공지</CardTitleTextDiv>
              <CardContentTextDiv>
                안녕하세요 힐링로그 회원 여러분 2025년 2월 24일부터 2026년 2월 24일까지 서버 점검을 진행합니다...
              </CardContentTextDiv>
            </Card>
          </CardAreaDiv>
          <TitleTextDiv>
            <h2>이번주 Hot 꿀팁</h2>
            <div>{'더보기 >'}</div>
          </TitleTextDiv>
          <CardAreaDiv>
            <Card>
              <CardTitleTextDiv>교통사고 났을 때 보험비 많이 타는 법</CardTitleTextDiv>
              <CardContentTextDiv>
                일단 교통사고를 당하면 최대한 아픈 척을 해서 보험비를 많이 받아냅니다. 한방병원가서 한약재도 열심히
                타먹습니다.
              </CardContentTextDiv>
            </Card>
            <Card>
              <CardTitleTextDiv>테트리스 잘 하는법</CardTitleTextDiv>
              <CardContentTextDiv>티스핀을 열심히 연습한다</CardContentTextDiv>
            </Card>
            <Card>
              <CardTitleTextDiv>오늘 점심 메뉴 추천좀</CardTitleTextDiv>
              <CardContentTextDiv>오늘 점심 메뉴 추전좀 해주세요 오점메 오점메</CardContentTextDiv>
            </Card>
          </CardAreaDiv>
          <TitleTextDiv>
            <h2>이번주 Best 병원 리뷰</h2>
            <div>{'더보기 >'}</div>
          </TitleTextDiv>
          <SmallCardAreaDiv>
            <SmallCard>
              <CardImg src="https://search.idsc.kr/data/item/1609293601/7Jew7IS47IS467iM656A7Iqk67OR7JuQ01.jpg" />
              <CardTitleTextDiv>연세 세브란스 병원</CardTitleTextDiv>
              <CardTitleTextDiv>⭐⭐⭐⭐⭐</CardTitleTextDiv>
              <CardContentTextDiv>역시 대학병원 좋습니다</CardContentTextDiv>
            </SmallCard>
            <SmallCard>
              <CardImg src="https://search.idsc.kr/data/item/1609293601/7Jew7IS47IS467iM656A7Iqk67OR7JuQ01.jpg" />
              <CardTitleTextDiv>KH 병원</CardTitleTextDiv>
              <CardTitleTextDiv>⭐⭐⭐⭐⭐</CardTitleTextDiv>
              <CardContentTextDiv>친절하고 좋습니다</CardContentTextDiv>
            </SmallCard>
            <SmallCard>
              <CardImg src="https://search.idsc.kr/data/item/1609293601/7Jew7IS47IS467iM656A7Iqk67OR7JuQ01.jpg" />
              <CardTitleTextDiv>연세 세브란스 병원</CardTitleTextDiv>
              <CardTitleTextDiv>⭐⭐⭐⭐⭐</CardTitleTextDiv>
              <CardContentTextDiv>친절하고 좋습니다</CardContentTextDiv>
            </SmallCard>
            <SmallCard>
              <CardImg src="https://search.idsc.kr/data/item/1609293601/7Jew7IS47IS467iM656A7Iqk67OR7JuQ01.jpg" />
              <CardTitleTextDiv>심심투 병원</CardTitleTextDiv>
              <CardTitleTextDiv>⭐⭐⭐⭐⭐</CardTitleTextDiv>
              <CardContentTextDiv>친절하고 좋습니다</CardContentTextDiv>
            </SmallCard>
          </SmallCardAreaDiv>
          <TitleTextDiv>
            <h2>힐링로그 추천 병원</h2>
          </TitleTextDiv>
          <SmallCardAreaDiv>
            <SmallCard>
              <CardTitleTextDiv>광고광고</CardTitleTextDiv>
              <CardContentTextDiv>광고광고</CardContentTextDiv>
            </SmallCard>
            <SmallCard>
              <CardTitleTextDiv>광고광고</CardTitleTextDiv>
              <CardContentTextDiv>광고광고</CardContentTextDiv>
            </SmallCard>
            <SmallCard>
              <CardTitleTextDiv>광고광고</CardTitleTextDiv>
              <CardContentTextDiv>광고광고</CardContentTextDiv>
            </SmallCard>
            <SmallCard>
              <CardTitleTextDiv>광고광고</CardTitleTextDiv>
              <CardContentTextDiv>광고광고</CardContentTextDiv>
            </SmallCard>
          </SmallCardAreaDiv>
        </ContentArea>
      </ContentLayout>
    </>
  );
};

export default Main;
