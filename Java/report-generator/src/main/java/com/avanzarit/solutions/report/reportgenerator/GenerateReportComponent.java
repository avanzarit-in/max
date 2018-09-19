package com.avanzarit.solutions.report.reportgenerator;

import com.avanzarit.solutions.report.reportgenerator.dataadaptors.CustomerDataSourceImpl;
import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.export.JRXlsExporter;
import net.sf.jasperreports.engine.util.JRLoader;
import net.sf.jasperreports.export.SimpleExporterInput;
import net.sf.jasperreports.export.SimpleOutputStreamExporterOutput;
import net.sf.jasperreports.export.SimpleXlsReportConfiguration;
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
import java.util.HashMap;
import java.util.Map;

@Component
@Path("/report")
public class GenerateReportComponent {

    @GET
    @Path("/world")
    public Response test() throws JRException, IOException {
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
    }
}
