package com.avanzarit.solutions.report.reportgenerator.dataadaptors;

import net.sf.jasperreports.engine.JRDataSource;
import net.sf.jasperreports.engine.JRDataSourceProvider;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JRField;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.base.JRBaseField;

/**
 * 
 * This class implements a DataSource for the data adapter DataSourceimpl. A data source it 
 * is like an envelope for the data adapter. It can create and destroy the data adapter itself, 
 * but it can also provide informations about the data adapters, like which fields it provide and 
 * a description\type for everyone of them.
 * 
 * 
 * @author Santosh Padhi
 *
 */

public class TransactionDataSourceProviderImpl implements JRDataSourceProvider {

	/**
	 * Build and return the data adapter that will provide an access to the real 
	 * data that will be used to fill the report. 
	 * In this case will be returned an instance of MyImplementation.
	 */
	@Override
	public JRDataSource create(JasperReport arg0) throws JRException {
		
		return new TransactionDataSourceImpl();
	}

	/**
	 * Method used to destroy the data adapter. Some time a data adapter can 
	 * require additional operations when it isn't more needed. For example 
	 * a remote connection should be closed. In this case we don't need to do 
	 * anything since all data is embedded inside the data adapter.
	 */
	@Override
	public void dispose(JRDataSource arg0) throws JRException {
		
	}

	/**
	 * Return a list of all the fields this datasource provide. In this case two fields 
	 * are provided, one with a string that represent the Name of an employee and another 
	 * one that is his age, expressed as an integer number.
	 */
	@Override
	public JRField[] getFields(JasperReport arg0) throws JRException, UnsupportedOperationException {
	
		JRField referenceNo = new MyField("reference_no","Transaction Reference No");
		JRField clearingDocumentNo = new MyField("clearing_doc_no","Clearing Document number");
		JRField documentDate = new MyField("document_date","Document Date");
		JRField perticulars = new MyField("perticulars","Perticulars about the transaction");
		JRField quantity = new MyField("quantity","Material Quantity");
		JRField debitAmount = new MyField("debit","Debit Amount");
		JRField creditAmount = new MyField("credit","Credit Amount");
		JRField cumulativeBalance = new MyField("cumulative_balance","Cumulative Balance");
		JRField remarks = new MyField("remarks","Remarks");
		return new JRField[]{referenceNo, clearingDocumentNo,documentDate,perticulars,quantity,debitAmount,creditAmount,cumulativeBalance,remarks};
	}

	/**
	 * This method return true if the datasource can provide a list of fields used by the 
	 * data adapter, otherwise false. If this return true the method getFileds is used to 
	 * obtain a list of the fields provided.
	 */
	@Override
	public boolean supportsGetFieldsOperation() {
	
		return true;
	}
	
	/**
	 * A field is composed basically of three informations: a name, a description and a type. And 
	 * every instance of this class represent a field.
	 * To be sure that our field provide this information we normally should implements the interface 
	 * JRField. To avoid to implement all the methods we extended the class JRBaseField (that already 
	 * implements JRField), redefining only the constructors to adapt to our needs.
	 */
	private class MyField extends JRBaseField{
		
		/**
		 * An optional numerical id of the class, it can be generated automatically or omitted.
		 */
		private static final long serialVersionUID = -5570289821891736393L;

		/**
		 * First constructor for the field
		 * 
		 * @param name : name of the field
		 * @param description : description of the field
		 * @param type : type of the field
		 */
		public MyField(String name,String description, Class<?> type){
			this.name = name;
			this.description = description;
			this.valueClass = type;
			this.valueClassName = type.getName();
		}
		
		/**
		 * Second Constructor, the type of the field is supposed to be 
		 * String.
		 * @param name : name of the field
		 * @param description : description of the field
		 */
		public MyField(String name,String description){
			this(name, description, String.class);
		}
	}

}
