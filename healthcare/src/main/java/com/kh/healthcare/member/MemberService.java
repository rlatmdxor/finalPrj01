package com.kh.healthcare.member;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class MemberService {
    private final MemberMapper mapper;

    public int memberJoin(MemberVo vo) {
        return mapper.memberJoin(vo);
    }
}
