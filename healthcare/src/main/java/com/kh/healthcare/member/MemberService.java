package com.kh.healthcare.member;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.kh.healthcare.Aws.FileUtil;
import com.kh.healthcare.jwt.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class MemberService {

    private final MemberMapper mapper;
    private final AmazonS3 s3;
    private final BCryptPasswordEncoder encoder;
    private final JwtUtil jwtUtil;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    // 프로필 업로드 및 url 가져오기
    public String uploadProfile(MultipartFile profile) throws IOException {

        String profileUrl;

        if (profile == null || profile.isEmpty()) {
            // 기본 이미지 URL 설정
            profileUrl = "https://healinglog-kh.s3.ap-northeast-2.amazonaws.com/default_profile.jpg";
        } else {

            // 파일명 랜덤값 주기
            String originName = profile.getOriginalFilename();
            int lastDot = originName.lastIndexOf(".");
            String ext = originName.substring(lastDot);

            String randomName = FileUtil.generateRandomName() + ext;

            // S3에 업로드
            ObjectMetadata metaData = new ObjectMetadata();
            metaData.setContentType(profile.getContentType());
            metaData.setContentLength(profile.getSize());
            s3.putObject(bucket, randomName, profile.getInputStream(), metaData);

            // 업로드된 이미지 URL 가져오기
            profileUrl = s3.getUrl(bucket, randomName).toString();

        }
            return profileUrl;
    }

    // 패스워드 암호화 후, DB에 저장
    public int memberJoin(MemberVo vo, String profileUrl) {
        String encodedPwd = encoder.encode(vo.getPwd());
        vo.setId(vo.getId().toLowerCase());
        vo.setEmail(vo.getEmail().toLowerCase());
        vo.setPwd(encodedPwd);
        int result = mapper.memberJoin(vo, profileUrl);

        List<String> dashboardItems = List.of(
                "혈압", "혈당", "수면", "흡연", "알코올 섭취량",
                "체중", "칼로리 섭취량", "물 섭취량", "칼로리 소모량",
                "유산소 운동시간", "무산소 운동일수"
        );

        for (String name : dashboardItems) {
            mapper.createMemberDashboard(name);
        }

        return result;
    }


    // 로그인
    public String login(MemberVo vo) {
        //계정 조회
        MemberVo dbVo = findUserById(vo.getId());
        
        //일치하는지 확인 (평문, 암호문)
        boolean isMatch = encoder.matches(vo.getPwd(), dbVo.getPwd());

        if(!isMatch){
            throw new IllegalStateException("로그인 실패");
        }

        //jwt 토큰 생성 (유저 로그인이니까 "user"값 넘김)
        return jwtUtil.createJwtToken(dbVo.getNo(), dbVo.getId(), dbVo.getNick(), "user");
    }

    // 계정 조회(로그인 할 때 사용)
    public MemberVo findUserById(String id){
        return mapper.findUserById(id);
    }

    // 아이디 중복 체크
    public int duplicateIdCheck(MemberVo vo) {
        return mapper.duplicateIdCheck(vo);
    }

    // 이메일 중복 체크 및 유효성 검사
    public int duplicateEmailCheck(MemberVo vo) {
        return mapper.duplicateEmailCheck(vo);
    }

    // 전화번호 중복 체크
    public int duplicatePhoneCheck(String phone) {
        return mapper.duplicatePhoneCheck(phone);
    }

    //마이페이지 데이터 가져오기
    public MemberVo getMyData(String token) {
        token = token.replace("Bearer ", "");
        String id = jwtUtil.getId(token);
        return mapper.findUserById(id);
    }

    //프로필 변경
    public void profileChange(String token, String profileUrl) {
        token = token.replace("Bearer ", "");
        String id = jwtUtil.getId(token);
        mapper.profileChange(id, profileUrl);
    }

    // 프로필 다시 가져오기
    public String getProfile(String token) {
        token = token.replace("Bearer ", "");
        String id =jwtUtil.getId(token);
        return mapper.getProfile(id);
    }

    // 비밀번호 변경
    public boolean pwdChange(String token, String currentPwd, String newPwd){
        token = token.replace("Bearer ", "");
        String msg = "";
        String id =jwtUtil.getId(token);
        String memberPwd = mapper.getPwd(id);
        //일치하는지 확인 (평문, 암호문)
        boolean isMatch = encoder.matches(currentPwd, memberPwd);
        if(isMatch){
            String encodedPwd = encoder.encode(newPwd);
            mapper.updatePwd(encodedPwd, id);
            return true;
        } else{
            return false;
        }
    }

    // 닉네임 변경
    public void nickChange(String token, String nick) {
        token = token.replace("Bearer ", "");
        String id = jwtUtil.getId(token);
        mapper.nickChange(id, nick);
    }

    // 주소 변경
    public void addressChange(String token, String address) {
        token = token.replace("Bearer ", "");
        String id = jwtUtil.getId(token);
        mapper.addressChange(id, address);
    }

    // 전화번호 변경
    public void changePhone(String token, String phone) {
        token = token.replace("Bearer ", "");
        String id = jwtUtil.getId(token);
        mapper.phoneChange(id, phone);
    }

    // 신체정보 변경
    public void changePhysical(String token, String height, String weight) {
        token = token.replace("Bearer ", "");
        String id = jwtUtil.getId(token);
        mapper.physicalChange(id, height, weight);
    }

    // 회원 탈퇴
    public void withdrawal(String token) {
        token = token.replace("Bearer ", "");
        String id = jwtUtil.getId(token);
        mapper.withdrawal(id);
    }

    // 아이디 찾기
    public String findId(String userName, String userPhone) {
        String findedId = mapper.findId(userName, userPhone);

        if(findedId != null){
            return "회원님의 아이디는 " + findedId + " 입니다.";
        } else {
            return "등록된 정보가 없습니다.";
        }

    }

    // 이메일(+아이디)로 사용자 존재여부 체크
    public MemberVo findByEmail(String id, String email) {
        return mapper.findByEmail(id, email);
    }

    // 임시 패스워드 업데이트
    public void updatePassword(MemberVo memberVo, String tempPassword) {
        String encodedPwd = encoder.encode(tempPassword);
        mapper.updatePwd(encodedPwd, memberVo.getId());
    }


}
