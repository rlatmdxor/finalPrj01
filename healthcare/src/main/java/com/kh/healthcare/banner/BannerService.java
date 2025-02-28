package com.kh.healthcare.banner;

import com.kh.healthcare.diet.meal.DietVo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class BannerService {

    private final BannerMapper mapper;

    public void bannerEnroll(BannerVo vo) {
        mapper.bannerEnroll(vo);
    }

    public List<BannerVo> getBannerList() {
        return mapper.getBannerList();
    }

    public void bannerEdit(BannerVo vo) {
        mapper.bannerEdit(vo);
    }

    public void deleteBanner(String no) {
        mapper.deleteBanner(no);
    }
}
