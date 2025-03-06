package com.kh.healthcare.member.MailSender;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.util.Random;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class MailSenderService {

    private final JavaMailSender mailSender;

    // 임시 비밀번호 생성
    public String generateTempPassword() {
        int length = 10;
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        Random random = new SecureRandom();
        StringBuilder password = new StringBuilder();

        for (int i = 0; i < length; i++) {
            password.append(characters.charAt(random.nextInt(characters.length())));
        }
        return password.toString();
    }

    // 임시 비밀번호 전송
    @Async
    public void sendTempPasswordEmail(String email, String tempPassword) {
        //이메일 제목
        String subject = "Healing Log 임시 비밀번호 발급";
        //이메일 내용
        String content =
                "<img src='https://healinglog-kh.s3.ap-northeast-2.amazonaws.com/logo.png' width='200' />"
                + "<p>임시 비밀번호 : </p>"
                + "<h3>" + tempPassword + "</h3>"
                + "<p>소중한 개인정보 보호를 위해 로그인 후 반드시 비밀번호를 변경해주세요.</p>"
                + "<br>"
                + "<a href='http://localhost:3000/login'>로그인 링크</a>";

        try {
            //이메일 메시지 객체 생성
            MimeMessage message = mailSender.createMimeMessage();
            //생성 도와주는 애 
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(email);
            helper.setSubject(subject);
            //본문 HTML 형식으로 전송
            helper.setText(content, true);
            mailSender.send(message);
        } catch (MessagingException e) {
            throw new RuntimeException("이메일 전송 실패", e);
        }
    }
}
