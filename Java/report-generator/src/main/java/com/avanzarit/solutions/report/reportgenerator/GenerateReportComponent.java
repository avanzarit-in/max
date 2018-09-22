package com.avanzarit.solutions.report.reportgenerator;

import com.avanzarit.solutions.report.reportgenerator.api.MaxReportAPI;
import com.avanzarit.solutions.report.reportgenerator.dataadaptors.CustomerDataSourceImpl;

import com.avanzarit.solutions.report.reportgenerator.model.CustomerModel;
import com.avanzarit.solutions.report.reportgenerator.model.StatementModel;
import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.design.JasperDesign;
import net.sf.jasperreports.engine.export.JRXlsExporter;
import net.sf.jasperreports.engine.util.JRLoader;
import net.sf.jasperreports.engine.xml.JRXmlLoader;
import net.sf.jasperreports.export.SimpleExporterInput;
import net.sf.jasperreports.export.SimpleOutputStreamExporterOutput;
import net.sf.jasperreports.export.SimpleXlsReportConfiguration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;

import org.springframework.stereotype.Component;
import org.springframework.util.FileCopyUtils;

import javax.ws.rs.DefaultValue;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.*;
import java.io.*;


import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Component
@Path("/report")
public class GenerateReportComponent {

    @GET
    @Path("/statement")
    public Response statement(@QueryParam("customerId") String customerId, @QueryParam("fromDate") String fromDate, @QueryParam("toDate") String toDate) throws JRException, IOException {
        System.out.println(customerId);
        System.out.println(fromDate);
        System.out.println(toDate);

     //   List<StatementModel> statementResult=reportAPI.getStatementData(customerId,fromDate,toDate);
    //    CustomerModel customerResult=reportAPI.getCustomerDetails(customerId);

        ClassPathResource cpr = new ClassPathResource("Statement.jasper");

        byte[] bdata = FileCopyUtils.copyToByteArray(cpr.getInputStream());
        ByteArrayInputStream bais = new ByteArrayInputStream(bdata);


        JasperReport jasperReport = (JasperReport) JRLoader.loadObject(bais);


        Map<String,Object> params=new HashMap<>();
        params.put("customerId",customerId);
        params.put("fromDate",fromDate);
        params.put("toDate",toDate);

        JasperPrint jr = JasperFillManager.fillReport(jasperReport, params,
                new CustomerDataSourceImpl(params));
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        JasperExportManager.exportReportToPdfStream(jr, outputStream);

/*        JRXlsExporter xlsExporter = new JRXlsExporter();
        xlsExporter.setExporterInput(new SimpleExporterInput(jr));
        xlsExporter.setExporterOutput(new SimpleOutputStreamExporterOutput(outputStream));
        SimpleXlsReportConfiguration xlsReportConfiguration = new SimpleXlsReportConfiguration();
        xlsReportConfiguration.setOnePagePerSheet(false);
        xlsReportConfiguration.setPrintFooterMargin(new Integer(20));
        xlsReportConfiguration.setRemoveEmptySpaceBetweenRows(true);
        xlsReportConfiguration.setDetectCellType(true);
        xlsReportConfiguration.setWhitePageBackground(false);
        xlsExporter.setConfiguration(xlsReportConfiguration);
        xlsExporter.exportReport();*/

        return Response
                .ok(outputStream.toByteArray(), MediaType.APPLICATION_OCTET_STREAM)
                .header("content-disposition", "attachment; filename = statement.pdf")
                .build();

    }


}
