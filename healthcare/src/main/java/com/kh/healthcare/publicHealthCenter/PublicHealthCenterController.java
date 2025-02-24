package com.kh.healthcare.publicHealthCenter;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/phc")
@Slf4j
public class PublicHealthCenterController {

    private final PublicHealthCenterService service;

    @GetMapping("/list")
    public List<PublicHealthCenterVo> list(){
        List<PublicHealthCenterVo> publicHealthCenterVoList =service.list();
        System.out.println("publicHealthCenterVoList = " + publicHealthCenterVoList);
        return publicHealthCenterVoList;
    }
//
//    @GetMapping("/list/by-dong")
//    public ResponseEntity<List<PublicHealthCenterVo>> getPhcByDong(@RequestParam String dong) {
//        List<PublicHealthCenterVo> list = service.getPublicHealthCentersByDong(dong);
//        return ResponseEntity.ok(list);
//    }

//    @GetMapping("/search")
//    public ResponseEntity<List<PublicHealthCenterVo>> searchPublicHealthCenters(
//            @RequestParam(required = false) String city,
//            @RequestParam(required = false) String district,
//            @RequestParam(required = false) String dong,
//            @RequestParam(required = false) String searchField,
//            @RequestParam(required = false) String searchValue
//    ) {
//        List<PublicHealthCenterVo> list = service.searchPublicHealthCenters(city , district ,dong, searchField, searchValue);
//        System.out.println("list = " + list);
//        System.out.println("searchValue = " + searchValue);
//        return ResponseEntity.ok(list);
//    }

    @GetMapping("/search")
    public ResponseEntity<List<PublicHealthCenterVo>> searchPublicHealthCenters(
            @RequestParam(required = false) String city,
            @RequestParam(required = false) String district,
            @RequestParam(required = false) String dong,
            @RequestParam(required = false) String searchField,
            @RequestParam(required = false) String searchValue
    )
    {

        System.out.println("도시(city) = " + city);
        System.out.println("구(district) = " + district);
        System.out.println("동(dong) = " + dong);
        System.out.println("검색 필드(searchField) = " + searchField);
        System.out.println("검색 값(searchValue) = " + searchValue);

        List<PublicHealthCenterVo> list = service.searchPublicHealthCenters(city, district, dong, searchField, searchValue);
        System.out.println("조회 결과 list = " + list);

        return ResponseEntity.ok(list);
    }






}
