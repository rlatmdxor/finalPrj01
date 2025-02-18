package com.kh.healthcare.diet.meal;

import com.amazonaws.services.s3.AmazonS3;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kh.healthcare.Aws.FileUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("api/diet")
@RequiredArgsConstructor
public class DietMealController {

    private final DietMealService service;
    private final AmazonS3 s3;
    private final ObjectMapper objectMapper;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @PostMapping("enroll")
    public void dietMealEnroll(DietVo vo, String foodListArr, MultipartFile f, @RequestHeader("Authorization") String authorization) {
        try {
            if (f != null) {
                String url = FileUtil.uploadFileToAwsS3(f , s3 , bucket);
                System.out.println("url = " + url);
                vo.setImage(url);
            }

            List<MealVo> foodVoList = objectMapper.readValue(foodListArr, new TypeReference<List<MealVo>>(){});
            vo.setFoodList(foodVoList);

            service.dietMealEnroll(vo);
        }
        catch (Exception e){
            e.printStackTrace();
            throw new IllegalStateException("[ERROR] DIET ENROLL FAIL..");
        }

    }

    @PostMapping
    public List<SummaryKcalVo> getMealKcalSummary(@RequestBody DietVo vo, @RequestHeader("Authorization") String authorization){
        try {
            List<SummaryKcalVo> summaryVoList = service.getMealKcalSummary(vo);
            System.out.println("summaryVo = " + summaryVoList);
            return summaryVoList;
        }
        catch (Exception e){
            e.printStackTrace();
            throw new IllegalStateException("[ERROR] MEAL SUMMARY VIEW FAIL..");
        }
    }

}
