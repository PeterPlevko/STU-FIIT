package com.sipvs.zadanie1.xml;

import java.io.File;

import javax.xml.XMLConstants;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.stream.StreamResult;
import javax.xml.transform.stream.StreamSource;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;


public class XMLTransformer {

    private static String XSL_PATH = "form.xsl";    
    private static String XML_PATH = "form.xml";


    public static void transformToHtml(){
        try {
            TransformerFactory factory = TransformerFactory.newInstance();
            factory.setAttribute(XMLConstants.ACCESS_EXTERNAL_DTD, "");
            factory.setAttribute(XMLConstants.ACCESS_EXTERNAL_STYLESHEET, "");

            Transformer transformer = factory.newTransformer(new StreamSource(new File(XSL_PATH)));
            transformer.transform(new StreamSource(new File(XML_PATH)), new StreamResult(new File("form.html")));
        } catch (NullPointerException e) {
            System.out.println("No form.xml file found");
        } catch (TransformerException e) {
            System.out.println("Transform error, " + e.getMessage());
        }
    }
}
