package com.kh.healthcare.home;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class HomeService {

    private final HomeMapper mapper;

    public List<HomeBoardVo> getHoneyTipBoardList() {
        return mapper.getHoneyTipBoardList();
    }

    public List<HomeNoticeVo> getNoticeList() {
        return mapper.getNoticeList();
    }

    public List<HomeReviewVo> getReviewList() {
        return mapper.getReviewList();
    }
}
