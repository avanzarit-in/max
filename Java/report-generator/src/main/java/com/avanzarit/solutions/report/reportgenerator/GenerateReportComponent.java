package com.avanzarit.solutions.report.reportgenerator;

import com.avanzarit.solutions.report.reportgenerator.dataadaptors.CustomerDataSourceImpl;

import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.export.JRXlsExporter;
import net.sf.jasperreports.engine.util.JRLoader;
import net.sf.jasperreports.export.SimpleExporterInput;
import net.sf.jasperreports.export.SimpleOutputStreamExporterOutput;
import net.sf.jasperreports.export.SimpleXlsReportConfiguration;
import net.sf.jasperreports.util.StringBufferWriter;
import org.apache.http.HttpEntity;
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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Component;
import org.springframework.util.FileCopyUtils;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.*;
import java.nio.charset.StandardCharsets;
import java.security.interfaces.RSAKey;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@Component
@Path("/report")
public class GenerateReportComponent {


    @GET
    @Path("/world")
    public Response test() throws JRException, IOException {

        validate();
/*
        Map<String, Object> params = new HashMap<>();
        params.put("TEST_FILTER_PARAM", "A");

        ClassPathResource cpr = new ClassPathResource("Statement.jasper");

        byte[] bdata = FileCopyUtils.copyToByteArray(cpr.getInputStream());
        ByteArrayInputStream bais = new ByteArrayInputStream(bdata);


        JasperReport jasperReport = (JasperReport) JRLoader.loadObject(bais);
        System.out.println(jasperReport);

        JasperPrint jr = JasperFillManager.fillReport(jasperReport, params,
                new CustomerDataSourceImpl());
        JRXlsExporter xlsExporter = new JRXlsExporter();
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        xlsExporter.setExporterInput(new SimpleExporterInput(jr));
        xlsExporter.setExporterOutput(new SimpleOutputStreamExporterOutput(outputStream));
        SimpleXlsReportConfiguration xlsReportConfiguration = new SimpleXlsReportConfiguration();
        xlsReportConfiguration.setOnePagePerSheet(false);
        xlsReportConfiguration.setPrintFooterMargin(new Integer(20));
        xlsReportConfiguration.setRemoveEmptySpaceBetweenRows(true);
        xlsReportConfiguration.setDetectCellType(true);
        xlsReportConfiguration.setWhitePageBackground(false);
        xlsExporter.setConfiguration(xlsReportConfiguration);
        xlsExporter.exportReport();

        return Response
                .ok(outputStream.toByteArray(), MediaType.APPLICATION_OCTET_STREAM)
                .header("content-disposition", "attachment; filename = test.xls")
                .build();
                */

        return null;
    }

    private boolean validate() throws IOException {

        CredentialsProvider credsProvider = new BasicCredentialsProvider();
        credsProvider.setCredentials(
                new AuthScope("kdc-proxy.wipro.com", 8080),
                new UsernamePasswordCredentials("spadhi", "puja@2018"));

        CloseableHttpClient httpclient = HttpClients.custom()
                .setDefaultCredentialsProvider(credsProvider).build();

            HttpHost target = new HttpHost("cognito-idp.us-east-1.amazonaws.com", 443, "https");
            HttpHost proxy = new HttpHost("kdc-proxy.wipro.com", 8080);

            RequestConfig config = RequestConfig.custom()
                    .setProxy(proxy)
                    .build();
            HttpGet httpGet = new HttpGet("https://cognito-idp.us-east-1.amazonaws.com/us-east-1_C8GDD8TNg/.well-known/jwks.json");
            httpGet.setConfig(config);


        CloseableHttpResponse response1 = httpclient.execute(httpGet);
// The underlying HTTP connection is still held by the response object
// to allow the response content to be streamed directly from the network socket.
// In order to ensure correct deallocation of system resources
// the user MUST call CloseableHttpResponse#close() from a finally clause.
// Please note that if response content is not fully consumed the underlying
// connection cannot be safely re-used and will be shut down and discarded
// by the connection manager.

        try {

            String result = new BufferedReader(new InputStreamReader(response1.getEntity().getContent()))
                    .lines().collect(Collectors.joining("\n"));
           System.out.println(result);
            // do something useful with the response body
            // and ensure it is fully consumed
            EntityUtils.consume(response1.getEntity());




        } finally {
            response1.close();
        }

        return true;
    }


}
