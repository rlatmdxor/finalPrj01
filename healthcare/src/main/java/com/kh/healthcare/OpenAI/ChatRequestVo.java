package com.kh.healthcare.OpenAI;

import lombok.Data;
import java.util.List;

@Data
public class ChatRequestVo {
    private String model;
    private List<MessageVo> messages;
}
