package com.avanzarit.solutions.report.reportgenerator.dataadaptors;

import net.sf.jasperreports.engine.JRDataSource;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JRField;

public class CustomerDataSourceImpl implements JRDataSource {

	private int counter=0;
	/**
	 * This method is called for every field defined in the report. So if i have 2 fields it is called 2 times for every record, and 
	 * for each of them it must provide a value.
	 * The parameter can be used to understand for which field is requested, in fact it contains the name of the requested field. This 
	 * data adapter is done with the goal of return two values, a name and an age. An easy option would be expect a field with the name 
	 * "Name" and one with name "Age". But we can do something more flexible, in this case we will enumerate all the fields requested and 
	 * and the first two will be assumed to be for name and age, for all the others will be returned an empty string. So we can have a report 
	 * with more than two fields, but the name and the age will be returned each time only for the first two. 
	 * 
	 * If this example is too much complex refer to the method getFieldValue2, where is shown the first explained, and simple solution, where we 
	 * expect two fields with a precise name.
	 */
	@Override
	public Object getFieldValue(JRField field) throws JRException {
		// TODO Auto-generated method stub
		System.out.println(field.getName());
		switch(field.getName()) {
		case "customer_id":
			return "AP1234567";
		case "name":
			return "Santosh kumar Padhi";
		
		case "address1":
			return "39/3A Raj Krishna Chatterjee Road";
		case "address2":
			return "39/3A Raj Krishna Chatterjee Road";
		case "address3":
			return "39/3A Raj Krishna Chatterjee Road";
		case "postcode":
			return "700 042";
		case "state":
			return "Kolkata, West Bengal";
			
		}
		
		return null;
	}

	@Override
	public boolean next() throws JRException {
		// TODO Auto-generated method stub
	if(counter==0) {
		counter++;
		return true;
	}
	return false;
	}

}
