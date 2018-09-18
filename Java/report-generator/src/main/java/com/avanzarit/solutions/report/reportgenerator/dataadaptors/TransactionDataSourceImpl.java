package com.avanzarit.solutions.report.reportgenerator.dataadaptors;


import net.sf.jasperreports.engine.JRDataSource;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JRField;

public class TransactionDataSourceImpl implements JRDataSource {

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
	public Object getFieldValue(JRField arg0) throws JRException {
		// TODO Auto-generated method stub
		switch(arg0.getName()) {
		case "reference_no":
			return "2334354546";
		case "clearing_doc_no":
			return "64576467567";
		case "document_date":
			return "20170505";
		case "perticulars":
			return "Payment by bank";
		case "quantity":
			return new Integer(234);
		case "debit":
			return new Integer(4567890);
		case "credit":
			return new Integer(5657567);
		case "cumulative_balance":
			return new Integer(645645656);
		case "remarks":
			return "sample data";
		}
		return null;
	
	}

	@Override
	public boolean next() throws JRException {
		// TODO Auto-generated method stub
		if(counter<=50) {
			counter++;
			return true;
		}
		return false;
	}

}
