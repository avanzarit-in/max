package com.avanzarit.solutions.report.reportgenerator;

import com.avanzarit.solutions.report.reportgenerator.dataadaptors.CustomerDataSourceImpl;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.export.JRPdfExporter;
import net.sf.jasperreports.engine.util.JRLoader;
import net.sf.jasperreports.export.SimpleExporterInput;
import net.sf.jasperreports.export.SimpleOutputStreamExporterOutput;
import net.sf.jasperreports.export.SimplePdfExporterConfiguration;
import net.sf.jasperreports.export.type.PdfPrintScalingEnum;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.CrossOrigin;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;


@Component
@Path("/report")
@CrossOrigin(origins = "*")
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
  /*      JasperExportManager.exportReportToPdfStream(jr, outputStream);*/

        JRPdfExporter pdfExporter = new JRPdfExporter();
        pdfExporter.setExporterInput(new SimpleExporterInput(jr));
        pdfExporter.setExporterOutput(new SimpleOutputStreamExporterOutput(outputStream));
        SimplePdfExporterConfiguration pdfExporterConfiguration = new SimplePdfExporterConfiguration();
        pdfExporterConfiguration.setPrintScaling(PdfPrintScalingEnum.DEFAULT);
        pdfExporter.setConfiguration(pdfExporterConfiguration);
        pdfExporter.exportReport();

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
