import AdminLogin from './components/admin/AdminLogin';
import Main from './components/home/Main';
import Board from './components/pages/Board/Board';
import DashBoard from './components/pages/Board/DashBoard';
import HospitalReview from './components/pages/Board/HospitalReview';
import BloodPressure from './components/pages/CardiovascularManagement/BloodPressure/BloodPressure';
import BloodSugar from './components/pages/CardiovascularManagement/BloodSugar/BloodSugar';
import Hospital from './components/pages/Healthcarefacility/Hospital/Hospital';
import Pharmacy from './components/pages/Healthcarefacility/Pharmacy/Pharmacy';
import PulbicHealthCenter from './components/pages/Healthcarefacility/PublicHealthCenter/PulbicHealthCenter';
import Alc from './components/pages/LivingHealth/Alc/Alc';
import Cigarette from './components/pages/LivingHealth/Cigarette/Cigarette';
import Diet from './components/pages/LivingHealth/Diet/Diet';
import Drug from './components/pages/LivingHealth/Drug/Drug';
import Drug1 from './components/pages/LivingHealth/Drug/Drug1';
import Exercise from './components/pages/LivingHealth/Exercise/Exercise';
import Sleep from './components/pages/LivingHealth/Sleep/Sleep';
import FindIdPage from './components/pages/Member/FindIdPage';
import FindPwdPage from './components/pages/Member/FindPwdPage';
import Join from './components/pages/Member/Join';
import Join2 from './components/pages/Member/Join2';
import LoginPage from './components/pages/Member/LoginPage';
import Mypage from './components/pages/Member/Mypage';
import Notice from './components/pages/Notice/Notice';
// import AdminUserManage from './components/admin/AdminUserManage';

export const routes = [
  { path: '/', component: <Main /> },
  { path: '/mypage', component: <Mypage /> },
  { path: '/login', component: <LoginPage /> },
  { path: '/sleep', component: <Sleep /> },
  { path: '/diet', component: <Diet /> },
  { path: '/exercise', component: <Exercise /> },
  { path: '/alc', component: <Alc /> },
  { path: '/cigarette', component: <Cigarette /> },
  { path: '/drug', component: <Drug /> },
  { path: '/drug1', component: <Drug1 /> },
  { path: '/bloodpressure', component: <BloodPressure /> },
  { path: '/bloodsugar', component: <BloodSugar /> },
  { path: '/hospital', component: <Hospital /> },
  { path: '/pharmacy', component: <Pharmacy /> },
  { path: '/publichealthcenter', component: <PulbicHealthCenter /> },
  { path: '/board', component: <Board /> },
  { path: '/hospitalreview', component: <HospitalReview /> },
  { path: '/notice', component: <Notice /> },
  { path: '/dashboard', component: <DashBoard /> },
  { path: '/findid', component: <FindIdPage /> },
  { path: '/findpwd', component: <FindPwdPage /> },
  { path: '/join', component: <Join /> },
  { path: '/join2', component: <Join2 /> },
  { path: '/admin/login', component: <AdminLogin /> },
  // { path: '/admin/usermanage', component: <AdminUserManage /> },
];
