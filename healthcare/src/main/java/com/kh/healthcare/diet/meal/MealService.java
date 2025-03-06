package com.kh.healthcare.diet.meal;

import com.amazonaws.services.s3.AmazonS3;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kh.healthcare.Aws.FileUtil;
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
public class MealService {

    private final MealMapper mapper;
    private final JwtUtil jwtUtil;
    private final AmazonS3 s3;
    private final ObjectMapper objectMapper;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    public void dietMealEnroll(DietVo vo, String foodListArr, MultipartFile f, String token) {
        try {
            // diet enroll
            if (f != null) {
                String url = FileUtil.uploadFileToAwsS3(f , s3 , bucket);
                vo.setImage(url);
            }

            token = token.replace("Bearer ", "");
            String no = jwtUtil.getNo(token);
            vo.setMemberNo(no);

            List<MealVo> foodVoList = objectMapper.readValue(foodListArr, new TypeReference<List<MealVo>>(){});
            vo.setFoodList(foodVoList);

            mapper.dietEnroll(vo);

            // meal enroll
            List<MealVo> mealVoList = vo.getFoodList();

            for (MealVo mealVo : mealVoList) {
                mapper.mealEnroll(mealVo);
            }

        } catch (Exception e){
            e.printStackTrace();
            throw new IllegalStateException("[ERROR] DIET ENROLL FAIL..");
        }

    }

    public List<DietVo> dietMealDetail(DietVo vo, String token) {
        token = token.replace("Bearer ", "");
        String no = jwtUtil.getNo(token);
        vo.setMemberNo(no);

        List<DietVo> voList = mapper.getDietDetail(vo);

        for (DietVo dietVo : voList) {
            String sumKcal = mapper.getSumKcal(dietVo);
            dietVo.setSumKcal(sumKcal);

            List<MealVo> mealVoList = mapper.getFoodList(dietVo);
            dietVo.setFoodList(mealVoList);
        }

        return voList;

    }

    public void dietMealEdit(DietVo vo, String foodListArr, MultipartFile f, String imageUrl, String token) {
        try{
            // diet edit
            if (f == null && imageUrl != null) {
                vo.setImage(imageUrl); // 기존 이미지 유지
            } else if (f != null) {
                String url = FileUtil.uploadFileToAwsS3(f , s3 , bucket);
                vo.setImage(url); // 새 이미지 url 저장
            }

            token = token.replace("Bearer ", "");
            String no = jwtUtil.getNo(token);
            vo.setMemberNo(no);

            List<MealVo> foodVoList = objectMapper.readValue(foodListArr, new TypeReference<List<MealVo>>(){});
            vo.setFoodList(foodVoList);

            mapper.dietEdit(vo);

            // meal edit
            mapper.deleteMealList(vo);

            List<MealVo> mealVoList = vo.getFoodList();
            for (MealVo mealVo : mealVoList) {
                mealVo.setDietNo(vo.getNo());
                mapper.mealEdit(mealVo);
            }
        } catch (Exception e){
            e.printStackTrace();
            throw new IllegalStateException("[ERROR] DIET ENROLL FAIL..");
        }

    }

    public void dietMealDelete(String no) {
        mapper.dietMealDelete(no);
    }

    public List<FoodVo> getFoodData() {
        return mapper.getFoodData();
    }

    //오늘 식단내역 체크하고 메시지 반환
    public String checkTodayDiet(String userNo) {
        int isEnabled = mapper.isDietPushEnabled(userNo);
        if(isEnabled>=1) {
            int count = mapper.checkTodayDiet(userNo);
            if (count == 0) {
                // 기록이 없으면
                return "오늘 등록된 식단내역이 없습니다. 식단 내역을 등록해주세요!";
            } else {
                // 하나라도 기록이 있으면
                return "식단 기록이 존재합니다.";
            }
        } else {
            return "푸시 설정 OFF";
        }
    }
}
