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

    public List<BoardVo> getHoneyTipBoardList() {
        return mapper.getHoneyTipBoardList();
    }

    public List<NoticeVo> getNoticeList() {
        return mapper.getNoticeList();
    }

    public List<ReviewVo> getReviewList() {
        return mapper.getReviewList();
    }
}
