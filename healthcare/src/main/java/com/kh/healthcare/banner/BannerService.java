package com.kh.healthcare.banner;

import com.amazonaws.services.s3.AmazonS3;
import com.kh.healthcare.Aws.FileUtil;
import com.kh.healthcare.diet.meal.DietVo;
import com.kh.healthcare.jwt.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class BannerService {

    private final BannerMapper mapper;
    private final AmazonS3 s3;
    private final JwtUtil jwtUtil;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    public void bannerEnroll(BannerVo vo, MultipartFile f, String token) {
        try {
            if (f != null) {
                String url = FileUtil.uploadFileToAwsS3(f, s3, bucket);
                vo.setImageUrl(url);
            }

            token = token.replace("Bearer ", "");
            String adminNo = jwtUtil.getNo(token);
            vo.setWriter(adminNo);

            mapper.bannerEnroll(vo);

        } catch (Exception e){
            e.printStackTrace();
            throw new IllegalStateException("[ERROR] BANNER ENROLL FAIL..");
        }
    }

    public List<BannerVo> getBannerList(String showYn, String searchValue) {
        return mapper.getBannerList(showYn, searchValue);
    }

    public void bannerEdit(BannerVo vo, MultipartFile f, String imageUrl, String token) {
        try {
            if (f == null && imageUrl != null) {
                vo.setImageUrl(imageUrl); // 기존 이미지 유지
            } else if (f != null) {
                String url = FileUtil.uploadFileToAwsS3(f, s3, bucket);
                vo.setImageUrl(url); // 새 이미지 url 저장
            }

            token = token.replace("Bearer ", "");
            String adminNo = jwtUtil.getNo(token);
            vo.setWriter(adminNo);

            mapper.bannerEdit(vo);

        } catch (Exception e){
            e.printStackTrace();
            throw new IllegalStateException("[ERROR] BANNER EDIT FAIL..");
        }
    }

    public void deleteBanner(String no) {
        mapper.deleteBanner(no);
    }

    public void multiDeleteBanner(List<String> no) {
        mapper.multiDeleteBanner(no);
    }
}
