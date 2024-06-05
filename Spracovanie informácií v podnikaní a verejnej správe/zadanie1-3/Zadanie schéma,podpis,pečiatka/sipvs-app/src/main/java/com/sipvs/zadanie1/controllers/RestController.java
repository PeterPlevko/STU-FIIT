package com.sipvs.zadanie1.controllers;

import com.sipvs.zadanie1.models.Timestamp;
import org.bouncycastle.tsp.TSPException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.xml.sax.SAXException;

import java.io.*;
import java.util.List;

import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;

import com.sipvs.zadanie1.models.Form;
import com.sipvs.zadanie1.models.Reservation;
import com.sipvs.zadanie1.xml.XMLGenerator;
import com.sipvs.zadanie1.xml.XMLValidator;
import com.sipvs.zadanie1.xml.XMLTransformer;

import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.TransformerException;

@Controller
public class RestController {

    // View
    @GetMapping("/")
    public String home(Model model) {
        System.out.println("Home");
        Form form = new Form();
        form.setReservations(List.of(new Reservation()));
        model.addAttribute("form", form);
        return "index";
    }

    public ResponseEntity<Resource> returnDownload(String fileName) {
        try {
            File downloadFile = new File(fileName);
            InputStreamResource resource = new InputStreamResource(new FileInputStream(downloadFile));
            HttpHeaders header = new HttpHeaders();
            header.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + downloadFile.getName());
            header.add("Cache-Control", "no-cache, no-store, must-revalidate");
            header.add("Pragma", "no-cache");
            header.add("Expires", "0");
            return ResponseEntity.ok()
                    .headers(header)
                    .contentLength(downloadFile.length())
                    .contentType(MediaType.parseMediaType("application/octet-stream"))
                    .body(resource);
        } catch(IOException e) {
            throw new RuntimeException("IOError writing file to output stream");
        }
    }

    // Generate XML
    @PostMapping("/generate")
    public ResponseEntity<Resource> generate(@ModelAttribute Form form, Model model) {
        System.out.println("Generated");
        model.addAttribute("form", form);
        System.out.println(form.getContent());

        // set id for each reservation
        List<Reservation> reservations = form.getReservations();
        for (int i = 0; i < reservations.size(); i++) {
            reservations.get(i).setId(i + 1);
        }
        // Generate XML 
        XMLGenerator.generate(form,"form.xml");

        // Return XML file to download
        return returnDownload("form.xml");

    }

    // Add reservation
    @PostMapping("/add")
    public String add(@ModelAttribute Form form, Model model) {
        System.out.println("Added");
        List<Reservation> reservations = form.getReservations();
        reservations.add(new Reservation());

        model.addAttribute("form", form);

        System.out.println(form.getContent());
        return "index";
    }

    // Validate XML
    @PostMapping("/validate")
    public String validate(@ModelAttribute Form form, Model model) {
        System.out.println("Validated");
        model.addAttribute("form", form);
        System.out.println(form.getContent());

        try {
            XMLValidator.validateXMLSchema();
            model.addAttribute("validationSuccess", "Validácia XML úspešná, XML je správne");
            model.addAttribute("validationError", "");
        } catch (SAXException e) {
            model.addAttribute("validationSuccess", "");
            model.addAttribute("validationError", e.getMessage());
        } catch (IOException e) {
            System.out.println("Exception IO: " + e.getMessage());
            model.addAttribute("validationSuccess", "");
            model.addAttribute("validationError", "Chyba počas validácie, XML je nesprávne " + e.getMessage());
        }

        return "index";
    }

    // Generate HTML
    @PostMapping("/html")
    public ResponseEntity<Resource> html(@ModelAttribute Form form) {
        System.out.println("HTML");
        XMLTransformer.transformToHtml();

        // Return HTML file to download
        return returnDownload("form.html");
    }
    //
    @PostMapping("/sign")
    public ResponseEntity<Resource> sign(@RequestBody String data) throws IOException {
        System.out.println("Signed");
        System.out.println(data);

//        Files.write(Paths.get("signed.xml"), data.getBytes());
        try (PrintWriter out = new PrintWriter("signed.xml")) {
            out.println(data);
        }

        return ResponseEntity.ok().build();
    }

    @PostMapping("/timestamp")
    public ResponseEntity<Resource> timestamp(@ModelAttribute Form form) {

        try {
            String xmlFilePath = "signed.xml";
            String stampedForm = Timestamp.timeStamp(xmlFilePath);
            System.out.println("Timestamped");
            return returnDownload(stampedForm);
        } catch (TSPException | IOException | ParserConfigurationException | SAXException | TransformerException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
