package com.sipvs.zadanie1.xml;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;

import com.sipvs.zadanie1.models.Form;

import java.io.File;

public class XMLGenerator {
    public static void generate(Form form,String filename) {
        try {
            // Create JAXB context and marshaller
            JAXBContext context = JAXBContext.newInstance(Form.class);
            Marshaller marshaller = context.createMarshaller();

            // Marshal the object to XML and save to a file
            marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);
            marshaller.marshal(form, new File(filename));

            System.out.println("Data saved .xml");
        } catch (JAXBException e) {
            e.printStackTrace();
        }
    }
}
