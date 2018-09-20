package com.avanzarit.solutions.report.reportgenerator.dataadaptors;


import com.avanzarit.solutions.report.reportgenerator.api.MaxReportAPI;
import com.avanzarit.solutions.report.reportgenerator.model.StatementModel;
import net.sf.jasperreports.engine.JRDataSource;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JRField;

import java.io.IOException;
import java.util.List;
import java.util.Map;

public class TransactionDataSourceImpl implements JRDataSource {

    private int counter = 0;
    private int totalSize = 0;
    private List<StatementModel> statementData;
    private String customerId;
    private String fromDate;
    private String toDate;

    public TransactionDataSourceImpl() {

    }

    public TransactionDataSourceImpl(Map<String, Object> params) {
        this.customerId = (String) params.get("customerId");
        this.fromDate = (String) params.get("fromDate");
        this.toDate = (String) params.get("toDate");
    }

    /**
     * This method is called for every field defined in the report. So if i have 2 fields it is called 2 times for every record, and
     * for each of them it must provide a value.
     * The parameter can be used to understand for which field is requested, in fact it contains the name of the requested field. This
     * data adapter is done with the goal of return two values, a name and an age. An easy option would be expect a field with the name
     * "Name" and one with name "Age". But we can do something more flexible, in this case we will enumerate all the fields requested and
     * and the first two will be assumed to be for name and age, for all the others will be returned an empty string. So we can have a report
     * with more than two fields, but the name and the age will be returned each time only for the first two.
     * <p>
     * If this example is too much complex refer to the method getFieldValue2, where is shown the first explained, and simple solution, where we
     * expect two fields with a precise name.
     */
    @Override
    public Object getFieldValue(JRField arg0) throws JRException {
        // TODO Auto-generated method stub
        switch (arg0.getName()) {
            case "reference_no":
                return statementData.get(counter).getReference();
            case "clearing_doc_no":
                return statementData.get(counter).getClearingDocumentNo();
            case "document_date":
                return statementData.get(counter).getDocumentDate();
            case "perticulars":
                return statementData.get(counter).getPerticulars();
            case "quantity":
                return Float.parseFloat(statementData.get(counter).getQuantity());
            case "debit":
                return Float.parseFloat(statementData.get(counter).getDebit());
            case "credit":
                return Float.parseFloat(statementData.get(counter).getCredit());
            case "cumulative_balance":
                return Float.parseFloat(statementData.get(counter).getCumulativeBalance());
            case "remarks":
                return statementData.get(counter).getRemarks();
        }
        return null;

    }

    @Override
    public boolean next() throws JRException {
        // TODO Auto-generated method stub
        if (statementData == null) {
            try {
                statementData = MaxReportAPI.getStatementData(customerId, fromDate, toDate);
                totalSize = statementData.size();
                return true;
            } catch (IOException e) {
                throw new JRException(e);
            }
        } else if (counter < totalSize-1) {
            counter++;
            return true;
        }

        return false;
    }

}
