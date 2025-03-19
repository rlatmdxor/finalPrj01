import AdminLogin from './components/admin/AdminLogin';
import Main from './components/home/Main';
import Board from './components/pages/Board/Board';
import BoardWrite from './components/pages/Board/BoardWrite';
import DashBoard from './components/pages/DashBoard/DashBoard';
import BloodPressure from './components/pages/CardiovascularManagement/BloodPressure/BloodPressure';
import BloodSugar from './components/pages/CardiovascularManagement/BloodSugar/BloodSugar';
import InsulinPoint from './components/pages/CardiovascularManagement/BloodSugar/InsulinPoint';
import Hospital from './components/pages/Healthcarefacility/Hospital/Hospital';
import Pharmacy from './components/pages/Healthcarefacility/Pharmacy/Pharmacy';
import PulbicHealthCenter from './components/pages/Healthcarefacility/PublicHealthCenter/PulbicHealthCenter';

import Diet from './components/pages/LivingHealth/Diet/Diet';
import Drug from './components/pages/LivingHealth/Drug/Drug';
import Drug1 from './components/pages/LivingHealth/Drug/Drug1';
import Aerobic from './components/pages/LivingHealth/Exercise/Aerobic';
import AnAerobic from './components/pages/LivingHealth/Exercise/AnAerobic';
import AerobicDetail from './components/pages/LivingHealth/Exercise/AerobicDetail';
import Sleep from './components/pages/LivingHealth/Sleep/Sleep';
import FindIdPage from './components/pages/Member/FindIdPage';
import FindPwdPage from './components/pages/Member/FindPwdPage';
import Join from './components/pages/Member/Join';
import Join2 from './components/pages/Member/Join2';
import LoginPage from './components/pages/Member/LoginPage';
import Mypage from './components/pages/Member/Mypage';
import AnAerobicDetail from './components/pages/LivingHealth/Exercise/AnAerobicDetail';
import AdminUserManage from './components/admin/AdminUserManage';
import AlcReport from './components/pages/LivingHealth/Alc/AlcReport';
import CigaretteReport from './components/pages/LivingHealth/Cigarette/CigaretteReport';
import ExHistory from './components/pages/LivingHealth/Exercise/ExHistory';
import ExReport from './components/pages/LivingHealth/Exercise/ExReport';
import DietCal from './components/pages/LivingHealth/Diet/DietCal';
import DietReport from './components/pages/LivingHealth/Diet/DietReport';
import ReportedHoneyBoard from './components/admin/honeyBoard/ReportedHoneyBoard';
import ReportedHoneyComment from './components/admin/honeyBoard/ReportedHoneyComment';
import AdminBoard from './components/admin/honeyBoard/AdminBoard';
import Challengers from './components/pages/Board/Challengers';
import ChallengersBoard from './components/pages/Board/ChallengersBoard';
import ChallengersList from './components/pages/Board/ChallengersList';
import AdminBanner from './components/admin/banner/AdminBanner';
import BoardDetail from './components/pages/Board/BoardDetail';
import BoardEdit from './components/pages/Board/BoardEdit';
import { Navigate } from 'react-router-dom';
import NoticeList from './components/pages/Notice/NoticeList';
import NoticeWrite from './components/pages/Notice/NoticeWrite';
import NoticeDetail from './components/pages/Notice/NoticeDetail';
import NoticeEdit from './components/pages/Notice/NoticeEdit';

import Review from './components/pages/Board/review/Review';
import ReviewDetail from './components/pages/Board/review/ReviewDetail';
import ReviewWrite from './components/pages/Board/review/ReviewWrite';
import ReviewEdit from './components/pages/Board/review/ReviewEdit';
import AdminReview from './components/admin/review/AdminReview';
import ReportedReview from './components/admin/review/ReportedReview';
import ReportedReviewComment from './components/admin/review/ReportedReviewComment';
import AdminNoticeEdit from './components/admin/notice/AdminNoticeEdit';
import AdminNoticeDetail from './components/admin/notice/AdminNoticeDetail';
import AdminNoticeWrite from './components/admin/notice/AdminNoticeWrite';
import AdminNoticeList from './components/admin/notice/AdminNoticeList';

export const routes = [
  { path: '/', component: <Main /> },
  { path: '/mypage', component: <Mypage /> },
  { path: '/login', component: <LoginPage /> },
  { path: '/sleep', component: <Sleep /> },
  { path: '/diet', component: <Diet /> },
  { path: '/diet/calendar', component: <DietCal /> },
  { path: '/diet/report', component: <DietReport /> },
  { path: '/aerobic', component: <Aerobic /> },
  { path: '/anaerobic', component: <AnAerobic /> },
  { path: '/drug', component: <Drug /> },
  { path: '/drug1', component: <Drug1 /> },
  { path: '/bloodpressure', component: <BloodPressure /> },
  { path: '/insulin', component: <InsulinPoint /> },
  { path: '/bloodsugar', component: <BloodSugar /> },
  { path: '/hospital', component: <Hospital /> },
  { path: '/pharmacy', component: <Pharmacy /> },
  { path: '/publichealthcenter', component: <PulbicHealthCenter /> },
  { path: '/board', component: <Board /> },
  { path: '/review', component: <Review /> },
  { path: '/review/write', component: <ReviewWrite /> },
  { path: '/review/detail', component: <ReviewDetail /> },
  { path: '/review/edit', component: <ReviewEdit /> },
  { path: '/notice', component: <NoticeList /> },
  { path: '/dashboard', component: <DashBoard /> },
  { path: '/findid', component: <FindIdPage /> },
  { path: '/findpwd', component: <FindPwdPage /> },
  { path: '/join', component: <Join /> },
  { path: '/join2', component: <Join2 /> },
  { path: '/admin/login', component: <AdminLogin /> },
  { path: '/aerobic/:name', component: <AerobicDetail /> },
  { path: '/anaerobic/:name', component: <AnAerobicDetail /> },
  { path: '/exhistory', component: <ExHistory /> },
  { path: '/exreport', component: <ExReport /> },
  { path: '/board/write', component: <BoardWrite /> },
  { path: '/admin/usermanage', component: <AdminUserManage /> },
  { path: '/alc', component: <AlcReport /> },
  { path: '/cigarette/', component: <CigaretteReport /> },
  { path: '/admin/reported/honeytip', component: <ReportedHoneyBoard /> },
  { path: '/admin/reported/honeytip/comment', component: <ReportedHoneyComment /> },
  { path: '/admin/reported/review', component: <ReportedReview /> },
  { path: '/admin/reported/review/comment', component: <ReportedReviewComment /> },
  { path: '/admin/board', component: <AdminBoard /> },
  { path: '/admin/review', component: <AdminReview /> },
  { path: '/challengers', component: <Challengers /> },
  { path: '/challengersBoard', component: <ChallengersBoard /> },
  { path: '/challengersList', component: <ChallengersList /> },
  { path: '/admin/banner', component: <AdminBanner /> },
  { path: '/board/detail', component: <BoardDetail /> },
  { path: '/board/edit', component: <BoardEdit /> },
  { path: '/admin', component: <Navigate to="/admin/usermanage" /> },
  { path: '/notice/write', component: <NoticeWrite /> },
  { path: '/notice/detail', component: <NoticeDetail /> },
  { path: '/notice/edit', component: <NoticeEdit /> },
  { path: '/admin/notice', component: <AdminNoticeList /> },
  { path: '/admin/notice/write', component: <AdminNoticeWrite /> },
  { path: '/admin/notice/detail', component: <AdminNoticeDetail /> },
  { path: '/admin/notice/edit', component: <AdminNoticeEdit /> },
];
