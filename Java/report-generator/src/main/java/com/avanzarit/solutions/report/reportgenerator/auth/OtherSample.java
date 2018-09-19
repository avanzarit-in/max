package com.avanzarit.solutions.report.reportgenerator.auth;

import com.auth0.jwk.Jwk;
import com.auth0.jwk.JwkException;
import com.auth0.jwk.JwkProvider;
import com.auth0.jwk.UrlJwkProvider;
import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import java.net.MalformedURLException;
import java.net.URL;
import java.security.interfaces.RSAPublicKey;

public class OtherSample {
    private static final org.apache.commons.codec.binary.Base64 base64Url = new org.apache.commons.codec.binary.Base64(true);


    public static void main(String[] args) throws JwkException, MalformedURLException {
        String token = "eyJraWQiOiJvRjBMY3NjWlpBWXlyb0h2b0VJczZPWll4T1RlRkdYcFZPU3Q5TlJESXV3PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI1YmM4OWNlZS05MDM0LTRlYjEtYWM1Yi1lMDQyMzUzZWRmZTEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfQzhHREQ4VE5nIiwicGhvbmVfbnVtYmVyX3ZlcmlmaWVkIjp0cnVlLCJjb2duaXRvOnVzZXJuYW1lIjoiYWRtaW4iLCJhdWQiOiI0aDZsdHBocGJkNmprYmRkbmZrajV2OGFscCIsImV2ZW50X2lkIjoiZTg5NmUxOTAtYmFmYi0xMWU4LTg5MDgtNWIzZDM1Y2U4YmU3IiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE1MzcyNDUxNzMsInBob25lX251bWJlciI6Iis5MTk4MzE1ODM3NzQiLCJleHAiOjE1MzcyOTM4NTIsImlhdCI6MTUzNzI5MDI1MiwiZW1haWwiOiJhZG1pbkBhdmFuemFyaXQuaW4ifQ.pNnsXDmkz4zdmtyYzrJ25CZ0u-HC0yUKwU-fq3W7cB3pMPWpk_cSaAtcMI4ySTFmSetGFbYt0gtpG_1azXSFOhqDO-94gdCPQj6p1K9IPLhnYtEjJ9EpsxbSqci3R-hwAu7xQbfgRig00ZPhwEe80QuGlt72QOwVNdqV_-cdiTDbtZvqyVWivFJBv1fda_yeHq0LUos8iibJxpJAAbtYINkfWO8xjHcUvBG28ttX4Vq_5eOUfGk6cADLzjunOeVHe41vY5gVY0kyQu2XjtnIKDwqImayA6u8pRIIEsaX93I9ywEg6TJ3UJHgsBdRnBOzOgoV2aTk3TnymAIO85FrQg";

        final DecodedJWT decodedJwt = JWT.decode(token);
        System.out.println("Header =  " + decodedJwt.getHeader());
        System.out.println("Algorithm =  " + decodedJwt.getAlgorithm());
        System.out.println("Audience =  " + decodedJwt.getAudience());
        decodedJwt.getClaims().forEach((k, v) -> {
            System.out.println("Claim " + k + " = " + v.asString());
        });
        System.out.println("ContentType =  " + decodedJwt.getContentType());
        System.out.println("ExpiresAt =  " + decodedJwt.getExpiresAt());
        System.out.println("Id =  " + decodedJwt.getId());
        System.out.println("Issuer =  " + decodedJwt.getIssuer());
        System.out.println("Subject =  " + decodedJwt.getSubject());


        JwkProvider provider = new UrlJwkProvider(new URL("https://cognito-idp.us-east-1.amazonaws.com/us-east-1_C8GDD8TNg/.well-known/jwks.json"));
        Jwk jwk = provider.get(fetchKid(token));

        RSAPublicKey key=(RSAPublicKey)jwk.getPublicKey();

        Algorithm algorithm = Algorithm.RSA256(key);
        JWTVerifier verifier = JWT.require(algorithm)
                .withIssuer("https://cognito-idp.us-east-1.amazonaws.com/us-east-1_C8GDD8TNg")
                .build(); //Reusable verifier instance
        DecodedJWT jwt = verifier.verify(token);
        System.out.println(key);
      //  JwkStore



    }

    private static String fetchKid(String jwtToken){
        JSONObject jsonHeaderObject = null;
        JSONObject jsonClaimObject=null;
        String[] jwtTokenValues = jwtToken.split("\\.");
        String jwtAssertion = null;
        byte[] jwtSignature = null;

        if(jwtTokenValues.length > 0){
            String value = new String(base64Url.decode(jwtTokenValues[0].getBytes()));
            System.out.println("JWT Header : " + value);

            JSONParser parser = new JSONParser();
            try {
                jsonHeaderObject = (JSONObject) parser.parse(value);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        if(jwtTokenValues.length > 1){

            String value = new String(base64Url.decode(jwtTokenValues[1].getBytes()));
            System.out.println("JWT Body : " + value);
            jwtAssertion = jwtTokenValues[0] + "." + jwtTokenValues[1];

            JSONParser parser = new JSONParser();
            try {
                jsonClaimObject = (JSONObject) parser.parse(value);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        if(jwtTokenValues.length > 2){
            jwtSignature = base64Url.decode(jwtTokenValues[2].getBytes());
        }


        String kid = (String) jsonHeaderObject.get("kid");
        String signatureAlgo = (String) jsonHeaderObject.get("alg");

        return kid;

    }

}
