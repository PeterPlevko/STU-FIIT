package com.sipvs.zadanie1.xml;

import java.io.File;
import java.io.IOException;

import javax.xml.XMLConstants;
import javax.xml.transform.stream.StreamSource;
import javax.xml.validation.Schema;
import javax.xml.validation.SchemaFactory;
import javax.xml.validation.Validator;

import org.xml.sax.SAXException;

public class XMLValidator {

    private static String XSD_PATH = "form.xsd";    
    private static String XML_PATH = "form.xml";


    public static void validateXMLSchema() throws SAXException, IOException{
        
        
        SchemaFactory factory = SchemaFactory.newInstance(XMLConstants.W3C_XML_SCHEMA_NS_URI);
        Schema schema = factory.newSchema(new File(XSD_PATH));
        Validator validator = schema.newValidator();
        validator.validate(new StreamSource(new File(XML_PATH)));
            
        
    }
}
