package com.kh.healthcare.publicHealthCenter;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PublicHealthCenterService {

    private final PublicHealthCenterMapper mapper;

    public List<PublicHealthCenterVo> list() {
        return mapper.list();
    }


    public List<PublicHealthCenterVo> searchPublicHealthCenters(String city , String district,String dong, String searchField, String searchValue ) {
        System.out.println("PublicHealthCenterService.searchPublicHealthCenters");
        return mapper.searchPublicHealthCenters(city , district, dong, searchField, searchValue);
    }


}
