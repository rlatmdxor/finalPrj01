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
            profileUrl = "https://healinglog-bucket.s3.ap-southeast-2.amazonaws.com/default_profile.jpg";
        } else {
            System.out.println("profile = " + profile.getOriginalFilename());

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
        String encodedResidentNum = encoder.encode(vo.getResidentNum());
        vo.setPwd(encodedPwd);
        vo.setResidentNum(encodedResidentNum);
        return mapper.memberJoin(vo, profileUrl);
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
        return jwtUtil.createJwtToken(dbVo.getId(), dbVo.getNick(), "user");
    }

    // 계정 조회(로그인 할 때 사용))
    public MemberVo findUserById(String id){
        return mapper.findUserById(id);
    }
}
