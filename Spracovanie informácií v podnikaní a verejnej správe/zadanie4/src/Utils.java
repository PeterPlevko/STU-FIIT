import java.io.*;
import java.net.MalformedURLException;
import java.net.URL;
import java.security.cert.*;
import java.util.ArrayList;
import java.util.List;

import org.bouncycastle.util.encoders.Base64;
import org.bouncycastle.cms.CMSException;
import org.bouncycastle.cms.CMSSignedData;
import org.bouncycastle.tsp.TSPException;
import org.bouncycastle.tsp.TimeStampToken;
import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

public class Utils {

    // Utility methods and other necessary components of the class

    public static Node findNode(Document parsedXml, String elementName) {
        return parsedXml.getElementsByTagName(elementName).item(0);
    }

    public static Node findChildNodeOf(Node node, String elementName) {
        NodeList nodeList = node.getChildNodes();
        for (int i = 0; i < nodeList.getLength(); i++) {
            Node childNode = nodeList.item(i);
            if (childNode.getNodeName().equals(elementName)) {
                return childNode;
            }
        }
        return null;
    }

    public static List<Node> findChildNodesWithName(Node node, String elementName) {
        List<Node> childNodes = new ArrayList<>();
        NodeList nodeList = node.getChildNodes();
        for (int i = 0; i < nodeList.getLength(); i++) {
            Node childNode = nodeList.item(i);
            if (childNode.getNodeName().equals(elementName)) {
                childNodes.add(childNode);
            }
        }
        return childNodes;
    }

    public static NodeList findAllNodes(Document parsedXml, String elementName) {
        return parsedXml.getElementsByTagName(elementName);
    }

    public static Node findByAttributeValue(Document parsedXml, String elementName, String attributeName, String attributeValue) {
        NodeList nodeList = findAllNodes(parsedXml, elementName);
        for (int i = 0; i < nodeList.getLength(); i++) {
            Node element = nodeList.item(i);
            Node attribute = element.getAttributes().getNamedItem(attributeName);
            if (attribute != null && attribute.getNodeValue().equals(attributeValue)) {
                return element;
            }
        }
        return null;
    }

    public static String convertDigestAlgo(String algo) {
        if (algo.equals("http://www.w3.org/2000/09/xmldsig#sha1")){
            return "SHA-1";
        } else if (algo.equals("http://www.w3.org/2001/04/xmldsig-more#sha224")) {
            return "SHA-224";
        } else if (algo.equals("http://www.w3.org/2001/04/xmlenc#sha256")) {
            return "SHA-256";
        } else if (algo.equals("http://www.w3.org/2001/04/xmldsig-more#sha384")) {
            return "SHA-384";
        } else if (algo.equals("http://www.w3.org/2001/04/xmlenc#sha512")) {
            return "SHA-512";
        }
        else {
            return null;
        }
    }


    public static String fromElementToString(Node element) {
        try {
            StringWriter writer = new StringWriter();
            Transformer transformer = TransformerFactory.newInstance().newTransformer();
            transformer.setOutputProperty(OutputKeys.OMIT_XML_DECLARATION, "yes");
            transformer.transform(new DOMSource(element), new StreamResult(writer));
            return writer.toString();
        } catch (TransformerException e) {
            e.printStackTrace();
            return null;
        }
    }

    public static X509Certificate generateCertificateFromString(String certificateValue) {
        try {
            CertificateFactory cf = CertificateFactory.getInstance("X.509");
            return (X509Certificate) cf.generateCertificate(new ByteArrayInputStream(Base64.decode(certificateValue)));
        } catch (CertificateException e) {
            e.printStackTrace();
            return null;
        }
    }

    public static String getAttributeValue(Node node, String attributeName) {
        Node attributeNode = node.getAttributes().getNamedItem(attributeName);
        return attributeNode != null ? attributeNode.getNodeValue() : "";
    }

    public static boolean isSupportedAlgorithm(String algorithm, String[] supportedAlgorithms) {
        for (String supportedAlgorithm : supportedAlgorithms) {
            if (supportedAlgorithm.equals(algorithm)) {
                return true;
            }
        }
        return false;
    }

    public static X509CRL getCRL() {

        ByteArrayInputStream crlData = getDataFromUrl("http://test.ditec.sk/DTCCACrl/DTCCACrl.crl");

        if (crlData == null){
            return null;
        }

        CertificateFactory certFactory;
        try {
            certFactory = CertificateFactory.getInstance("X.509");
        } catch (CertificateException e) {
            return null;
        }


        X509CRL crl;

        try {
            crl = (X509CRL) certFactory.generateCRL(crlData);
        } catch (CRLException e) {
            return null;
        }


        return crl;
    }

    private static ByteArrayInputStream getDataFromUrl(String url) {

        URL urlHandler = null;
        try {
            urlHandler = new URL(url);
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        InputStream is = null;
        try {
            is = urlHandler.openStream();
            byte[] byteChunk = new byte[4096];
            int n;

            while ( (n = is.read(byteChunk)) > 0 ) {
                baos.write(byteChunk, 0, n);
            }
        }
        catch (IOException e) {
            System.err.printf ("Failed while reading bytes from %s: %s", urlHandler.toExternalForm(), e.getMessage());
            return null;
        }
        finally {
            if (is != null) {
                try {
                    is.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }

        return new ByteArrayInputStream(baos.toByteArray());
    }

    public static TimeStampToken getTimestampToken(Document parsedXml) {

        TimeStampToken ts_token = null;

        Node timestamp = null;

        timestamp = parsedXml.getElementsByTagName("xades:EncapsulatedTimeStamp").item(0);

        if (timestamp == null){
            return null;
        }

        try {
            ts_token = new TimeStampToken(new CMSSignedData(Base64.decode(timestamp.getTextContent())));
        } catch (TSPException | IOException | CMSException e) {
            e.printStackTrace();
        }

        return ts_token;
    }
}
