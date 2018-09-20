package com.avanzarit.solutions.report.reportgenerator.api;

import com.avanzarit.solutions.report.reportgenerator.model.CustomerModel;
import com.avanzarit.solutions.report.reportgenerator.model.StatementModel;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.http.HttpHeaders;
import org.apache.http.HttpHost;
import org.apache.http.auth.AuthScope;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.client.CredentialsProvider;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.BasicCredentialsProvider;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.text.MessageFormat;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class MaxReportAPI {
    private static boolean useProxy = false;
    private static String STATEMENT_URL = "http://anmol-360348269.us-east-1.elb.amazonaws.com/api/statement?customerId={0}&fromDate={1}&toDate={2}";
    private static String CUSTOMER_DETAILS_URL = "http://anmol-360348269.us-east-1.elb.amazonaws.com/api/customer?customerId={0}";


    public static CustomerModel getCustomerDetails(String customerId) throws IOException {
        CloseableHttpClient httpclient;
        HttpGet httpGet;

        String url = MessageFormat.format(CUSTOMER_DETAILS_URL, customerId);
        System.out.println(url);
        if (useProxy) {
            httpclient = getHttpClientWithCredentialProvider();
            httpGet=getMethodWithProxy(url);
        } else {
            httpclient = HttpClients.createDefault();
            httpGet = new HttpGet(url);

        }

        String result= requestAndGetResult(httpclient, httpGet);
        String response= requestAndGetResult(httpclient, httpGet);
        ObjectMapper objectMapper = new ObjectMapper();
        CustomerModel customerModel = objectMapper.readValue(response, CustomerModel.class);

        return customerModel;
    }


    public static List<StatementModel> getStatementData(String customerId, String fromDate, String toDate) throws IOException {
        CloseableHttpClient httpclient;
        HttpGet httpGet;

        String url = MessageFormat.format(STATEMENT_URL, customerId, fromDate, toDate);
        System.out.println(url);
        if (useProxy) {
            httpclient = getHttpClientWithCredentialProvider();
            httpGet=getMethodWithProxy(url);
        } else {
            httpclient = HttpClients.createDefault();
            httpGet = new HttpGet(url);

        }

        String response= requestAndGetResult(httpclient, httpGet);
        ObjectMapper objectMapper = new ObjectMapper();
        List<StatementModel> statementModelList = objectMapper.readValue(response, new TypeReference<List<StatementModel>>(){});

        return statementModelList;

    }

    private static String requestAndGetResult(CloseableHttpClient httpclient, HttpGet httpGet) throws IOException {
        httpGet.setHeader(HttpHeaders.CONTENT_TYPE, "application/json");
        httpGet.setHeader("x-api-key", "opensesame");

        CloseableHttpResponse response = httpclient.execute(httpGet);
        return processHttpResponse(response);
    }

    private static String processHttpResponse(CloseableHttpResponse response) throws IOException {
        String result;
        try {
            result = new BufferedReader(new InputStreamReader(response.getEntity().getContent()))
                    .lines().collect(Collectors.joining("\n"));

            EntityUtils.consume(response.getEntity());
        } finally {
            response.close();
        }

        return result;
    }

    private static CloseableHttpClient getHttpClientWithCredentialProvider(){
        CredentialsProvider credsProvider = new BasicCredentialsProvider();
        credsProvider.setCredentials(
                new AuthScope("kdc-proxy.wipro.com", 8080),
                new UsernamePasswordCredentials("spadhi", "puja@2018"));

        CloseableHttpClient httpclient = HttpClients.custom()
                .setDefaultCredentialsProvider(credsProvider).build();

        return httpclient;
    }

    private static HttpGet getMethodWithProxy(String url){
        HttpHost proxy = new HttpHost("kdc-proxy.wipro.com", 8080);

        RequestConfig config = RequestConfig.custom()
                .setProxy(proxy)
                .build();
        HttpGet httpGet = new HttpGet(url);
        httpGet.setConfig(config);

        return httpGet;
    }
}
