package com.avanzarit.solutions.report.reportgenerator.dataadaptors;

import com.avanzarit.solutions.report.reportgenerator.model.CustomerModel;
import net.sf.jasperreports.engine.JRDataSource;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JRField;

import java.io.IOException;
import java.util.Map;

import static com.avanzarit.solutions.report.reportgenerator.api.MaxReportAPI.getCustomerDetails;


public class CustomerDataSourceImpl implements JRDataSource {

    private int counter = 0;
    private String customerId;
    private CustomerModel customerModel;

    public CustomerDataSourceImpl(){}

    public CustomerDataSourceImpl(Map<String,Object> params) {
        this.customerId = (String)params.get("customerId");
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
    public Object getFieldValue(JRField field) throws JRException {
        // TODO Auto-generated method stub

        switch (field.getName()) {
            case "customer_id":
                return customerId;
            case "name":
                return customerModel.getName();

            case "address1":
                return customerModel.getStreet();
            case "address2":
                return null;
            case "address3":
                return null;
            case "postcode":
                return customerModel.getPinCode();
            case "state":
                return customerModel.getCity()+","+customerModel.getRegion()+","+customerModel.getCountry();

        }

        return null;
    }

    @Override
    public boolean next() throws JRException {
        // TODO Auto-generated method stub
        if (customerModel ==null) {
            try {
                customerModel=getCustomerDetails(customerId);
            } catch (IOException e) {
                throw new JRException(e);
            }

            return true;
        }
        return false;
    }

}
