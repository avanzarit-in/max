package com.avanzarit.solutions.report.reportgenerator.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class StatementModel {
    private String carryForwardBalance;
    private String reference;
    private String documentNo;
    private String clearingDocumentNo;
    private String documentDate;
    private String perticulars;
    private String quantity;
    private String debit;
    private String credit;
    private String cumulativeBalance;
    private String remarks;

    @JsonProperty(value = "CFB")
    public String getCarryForwardBalance() {
        return carryForwardBalance;
    }

    public void setCarryForwardBalance(String carryForwardBalance) {
        this.carryForwardBalance = carryForwardBalance;
    }

    @JsonProperty(value = "DN")
    public String getDocumentNo() {
        return documentNo;
    }

    public void setDocumentNo(String documentNo) {
        this.documentNo = documentNo;
    }

    @JsonProperty(value = "R")
    public String getReference() {
        return reference;
    }

    public void setReference(String reference) {
        this.reference = reference;
    }

    @JsonProperty(value = "CD")
    public String getClearingDocumentNo() {
        return clearingDocumentNo;
    }

    public void setClearingDocumentNo(String clearingDocumentNo) {
        this.clearingDocumentNo = clearingDocumentNo;
    }

    @JsonProperty(value = "DDT")
    public String getDocumentDate() {
        return documentDate;
    }

    public void setDocumentDate(String documentDate) {
        this.documentDate = documentDate;
    }

    @JsonProperty(value = "P")
    public String getPerticulars() {
        return perticulars;
    }

    public void setPerticulars(String perticulars) {
        this.perticulars = perticulars;
    }

    @JsonProperty(value = "Q")
    public String getQuantity() {
        return quantity;
    }

    public void setQuantity(String quantity) {
        this.quantity = quantity;
    }

    @JsonProperty(value = "D")
    public String getDebit() {
        return debit;
    }

    public void setDebit(String debit) {
        this.debit = debit;
    }

    @JsonProperty(value = "C")
    public String getCredit() {
        return credit;
    }

    public void setCredit(String credit) {
        this.credit = credit;
    }

    @JsonProperty(value = "CB")
    public String getCumulativeBalance() {
        return cumulativeBalance;
    }

    public void setCumulativeBalance(String cumulativeBalance) {
        this.cumulativeBalance = cumulativeBalance;
    }

    @JsonProperty(value = "RM")
    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }
}
