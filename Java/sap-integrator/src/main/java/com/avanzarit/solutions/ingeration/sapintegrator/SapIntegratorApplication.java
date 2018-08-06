package com.avanzarit.solutions.ingeration.sapintegrator;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.http.auth.AuthScope;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.client.CredentialsProvider;
import org.apache.http.client.HttpClient;
import org.apache.http.impl.client.BasicCredentialsProvider;
import org.apache.http.impl.client.HttpClientBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.client.ClientHttpRequestFactory;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.integration.annotation.Gateway;
import org.springframework.integration.annotation.IntegrationComponentScan;
import org.springframework.integration.annotation.MessagingGateway;
import org.springframework.integration.config.EnableIntegration;
import org.springframework.integration.dsl.IntegrationFlow;
import org.springframework.integration.dsl.IntegrationFlows;
import org.springframework.integration.handler.LoggingHandler;
import org.springframework.integration.http.dsl.Http;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Configuration
@SpringBootApplication
@EnableIntegration
@IntegrationComponentScan
public class SapIntegratorApplication {
    @Autowired
    private ClientHttpRequestFactory clientHttpRequestFactory;

    public static void main(String[] args) {
        ConfigurableApplicationContext context = SpringApplication.run(SapIntegratorApplication.class, args);
        Outbound outbound = context.getBean(Outbound.class);
        Map<String, String> payload = new HashMap<String, String>();
        payload.put("customerId", "AP01008");
        payload.put("fromDate", "10.04.2017");
        payload.put("fromTime", "02:15:07");
        payload.put("format", "json");
        outbound.outbound(payload);
    }

    @Bean
    public ClientHttpRequestFactory clientHttpRequestFactory(@Value("username") String username,
                                                             @Value("password") String password) {
        HttpClient httpClient = HttpClientBuilder.create().
                setDefaultCredentialsProvider(getCredentialsProvider("basis", "gvil@2008"))
                .build();
        HttpComponentsClientHttpRequestFactory clientHttpRequestFactory =
                new HttpComponentsClientHttpRequestFactory(httpClient);
        return clientHttpRequestFactory;
    }

    private CredentialsProvider getCredentialsProvider(final String username, final String password) {
        CredentialsProvider cp = new BasicCredentialsProvider();
        cp.setCredentials(new AuthScope(AuthScope.ANY_HOST, AuthScope.ANY_PORT),
                new UsernamePasswordCredentials(username, password));
        return cp;
    }

    @MessagingGateway
    public interface Outbound {

        @Gateway(requestChannel = "httpOutRequest")
        String outbound(Map<String, String> payload);


    }

    @Bean
    public IntegrationFlow outbound() {
        return IntegrationFlows.from("httpOutRequest")
                .handle(Http.outboundGateway("http://122.176.66.221:8000/sap/opu/odata/sap/ZCUST_LEDGER_SRV/ByCustomerIdFromDate?ID='{ID}'&FromDate='{FromDate}'&FromTime='{FromTime}'&$format={format}")

                        .httpMethod(HttpMethod.GET)

                        .uriVariable("ID", m -> ((Map)m.getPayload()).get("customerId"))
                        .uriVariable("FromDate", m -> ((Map)m.getPayload()).get("fromDate"))
                        .uriVariable("FromTime", m -> ((Map)m.getPayload()).get("fromTime"))
                        .uriVariable("format", m -> ((Map)m.getPayload()).get("format"))
                        .requestFactory(clientHttpRequestFactory)
                       .expectedResponseType(String.class))
                .transform(this::transform)
                .get();
    }

    private Object transform(String payload) {
        ObjectMapper objectMapper = new ObjectMapper();
        Mapper mapper = null;
        try {
            mapper = objectMapper.readValue(payload,Mapper.class);
        } catch (IOException e) {
            e.printStackTrace();
        }

        mapper.getResult().getRawDataList().forEach(item -> {
            System.out.println(item.getCustomer());
        });
        return payload;
    }


}

class Mapper {
    @JsonProperty("d")
    private Result result;

    public Result getResult() {
        return result;
    }

    public void setResult(Result result) {
        this.result = result;
    }
}

class Result {
    @JsonProperty("results")
    List<RawData> rawDataList;

    public List<RawData> getRawDataList() {
        return rawDataList;
    }

    public void setRawDataList(List<RawData> rawDataList) {
        this.rawDataList = rawDataList;
    }
}

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
class RawData {
    @JsonProperty("Customer")
    private String customer;
    @JsonProperty("Reference")
    private String reference;
    @JsonProperty("DocumentNo")
    private String documentNo;
    @JsonProperty("DocumentDate")
    private String documentDate;
    @JsonProperty("EntryDate")
    private String entryDate;
    @JsonProperty("EntryTime")
    private String EntryTime;
    @JsonProperty("Particulars")
    private String perticulars;
    @JsonProperty("CarryForwardBalance")
    private String carryForwardBalance;
    @JsonProperty("Quantity")
    private String quantity;
    @JsonProperty("Debit")
    private String debit;
    @JsonProperty("Credit")
    private String credit;
    @JsonProperty("CumulativeBalance")
    private String cumulativeBalance;
    @JsonProperty("Remarks")
    private String remarks;
    @JsonProperty("Unit")
    private String unit;
    @JsonProperty("Currency")
    private String currency;

    public String getCustomer() {
        return customer;
    }

    public void setCustomer(String customer) {
        this.customer = customer;
    }

    public String getReference() {
        return reference;
    }

    public void setReference(String reference) {
        this.reference = reference;
    }

    public String getDocumentNo() {
        return documentNo;
    }

    public void setDocumentNo(String documentNo) {
        this.documentNo = documentNo;
    }

    public String getDocumentDate() {
        return documentDate;
    }

    public void setDocumentDate(String documentDate) {
        this.documentDate = documentDate;
    }

    public String getEntryDate() {
        return entryDate;
    }

    public void setEntryDate(String entryDate) {
        this.entryDate = entryDate;
    }

    public String getEntryTime() {
        return EntryTime;
    }

    public void setEntryTime(String entryTime) {
        EntryTime = entryTime;
    }

    public String getPerticulars() {
        return perticulars;
    }

    public void setPerticulars(String perticulars) {
        this.perticulars = perticulars;
    }

    public String getCarryForwardBalance() {
        return carryForwardBalance;
    }

    public void setCarryForwardBalance(String carryForwardBalance) {
        this.carryForwardBalance = carryForwardBalance;
    }

    public String getQuantity() {
        return quantity;
    }

    public void setQuantity(String quantity) {
        this.quantity = quantity;
    }

    public String getDebit() {
        return debit;
    }

    public void setDebit(String debit) {
        this.debit = debit;
    }

    public String getCredit() {
        return credit;
    }

    public void setCredit(String credit) {
        this.credit = credit;
    }

    public String getCumulativeBalance() {
        return cumulativeBalance;
    }

    public void setCumulativeBalance(String cumulativeBalance) {
        this.cumulativeBalance = cumulativeBalance;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }
}