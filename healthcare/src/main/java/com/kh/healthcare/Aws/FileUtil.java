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

    /**
     * upload file to AWS S3
     * @param f
     * @param s3
     * @param bucket
     * @return uploaded file url
     * @throws IOException
     */
    public static String uploadFileToAwsS3(MultipartFile f, AmazonS3 s3, String bucket) throws IOException {

        // generate random name
        String ext = f.getOriginalFilename().substring(f.getOriginalFilename().lastIndexOf("."));
        String randomName = generateRandomName() + ext;

        // metadata
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentType(f.getContentType());
        metadata.setContentLength(f.getSize());

        // upload to AWS S3
        s3.putObject( bucket, randomName, f.getInputStream(), metadata );

        // get uploaded file url
        String url = s3.getUrl(bucket, randomName).toString();

        return url;
    }

}