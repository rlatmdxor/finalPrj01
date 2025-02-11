package com.kh.healthcare.Aws;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

public class FileUtil {

    public static String generateRandomName(){
        String str = UUID.randomUUID().toString();
        return System.currentTimeMillis() + "_" + str;
    }

}