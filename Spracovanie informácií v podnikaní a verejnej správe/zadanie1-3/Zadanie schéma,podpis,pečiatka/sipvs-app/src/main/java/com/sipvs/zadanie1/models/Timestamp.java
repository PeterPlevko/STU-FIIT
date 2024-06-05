package com.sipvs.zadanie1.models;

import org.bouncycastle.crypto.Digest;
import org.bouncycastle.crypto.digests.SHA256Digest;
import org.bouncycastle.tsp.*;
import org.springframework.stereotype.Service;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;
import javax.net.ssl.*;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.*;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Arrays;
import java.util.Base64;


@Service
public class Timestamp {
    private static void disableCertificateVerification() {
        try {
            TrustManager[] trustAllCerts = new TrustManager[]{
                    new X509TrustManager() {
                        public java.security.cert.X509Certificate[] getAcceptedIssuers() {
                            return null;
                        }

                        public void checkClientTrusted(
                                java.security.cert.X509Certificate[] certs, String authType) {
                        }

                        public void checkServerTrusted(
                                java.security.cert.X509Certificate[] certs, String authType) {
                        }
                    }
            };

            SSLContext sc = SSLContext.getInstance("SSL");
            sc.init(null, trustAllCerts, new java.security.SecureRandom());
            HttpsURLConnection.setDefaultSSLSocketFactory(sc.getSocketFactory());

            HostnameVerifier allHostsValid = (hostname, session) -> true;

            HttpsURLConnection.setDefaultHostnameVerifier(allHostsValid);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void duplicateXml(String sourcePath, String destinationPath) {
        try {
            DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
            DocumentBuilder builder = factory.newDocumentBuilder();
            Document document = builder.parse(new File(sourcePath));
            TransformerFactory transformerFactory = TransformerFactory.newInstance();
            Transformer transformer = transformerFactory.newTransformer();
            transformer.setOutputProperty(OutputKeys.OMIT_XML_DECLARATION, "yes");

            DOMSource source = new DOMSource(document);
            StreamResult result = new StreamResult(new File(destinationPath));
            transformer.transform(source, result);
        } catch (Exception e) {
            System.out.println("Exception: " + e.getMessage());
            System.out.println("Exception: " + Arrays.toString(e.getStackTrace()));
            e.printStackTrace();
        }
    }

    public static void buildNewDocument(Document xml, String base64TimeStamp) {
        NodeList signatureTimestamps = xml.getElementsByTagName("xades:SignatureTimeStamp");
        int numberOfTimestamps = signatureTimestamps.getLength();

        Element encapsulatedTimeStamp = xml.createElement("xades:EncapsulatedTimeStamp");
        encapsulatedTimeStamp.appendChild(xml.createTextNode(base64TimeStamp));

        Element signatureTimestamp = xml.createElement("xades:SignatureTimeStamp");
        String timeStampId;

        if (numberOfTimestamps == 0) {
            timeStampId = "TimeStampID1";
        } else {
            timeStampId = "TimeStampID" + (numberOfTimestamps + 1);
        }

        signatureTimestamp.setAttribute("Id", timeStampId);
        signatureTimestamp.appendChild(encapsulatedTimeStamp);

        Element unsignedSignatureProperties = xml.createElement("xades:UnsignedSignatureProperties");
        unsignedSignatureProperties.appendChild(signatureTimestamp);

        Element unsignedProperties = xml.createElement("xades:UnsignedProperties");
        unsignedProperties.appendChild(unsignedSignatureProperties);

        NodeList qualifyingPropertiesList = xml.getElementsByTagName("xades:QualifyingProperties");
        if (qualifyingPropertiesList.getLength() > 0) {
            Element qualifyingProperties = (Element) qualifyingPropertiesList.item(0);
            qualifyingProperties.appendChild(unsignedProperties);
        } else {
            Element qualifyingProperties = xml.createElement("xades:QualifyingProperties");
            Element qualifyingPropertiesObject = (Element) xml.getElementsByTagName("ds:Object").item(0);

            qualifyingProperties.appendChild(unsignedProperties);
            qualifyingPropertiesObject.appendChild(qualifyingProperties);
        }
    }

    public static void saveStampedXml(Document xml) throws FileNotFoundException, TransformerException {
        DOMSource xmlSource = new DOMSource(xml);
        StreamResult result = new StreamResult(new FileOutputStream("stampedForm.xml"));
        TransformerFactory transformerFactory = TransformerFactory.newInstance();
        Transformer transformer = transformerFactory.newTransformer();
        transformer.setOutputProperty(OutputKeys.OMIT_XML_DECLARATION, "yes");
        transformer.transform(xmlSource, result);
    }

    public static Document getSignedXml(String xmlPath) throws ParserConfigurationException, IOException, SAXException {
        duplicateXml(xmlPath, xmlPath);
        File xmlFile = new File(xmlPath);
        DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
        DocumentBuilder builder = factory.newDocumentBuilder();
        return builder.parse(xmlFile);
    }

    public static String timeStamp(String xmlPath) throws TSPException, ParserConfigurationException, IOException, SAXException, TransformerException {
        String server = "https://test.ditec.sk/TSAServer/tsa.aspx";
        Document xml = getSignedXml(xmlPath);
        String signatureValue = xml.getElementsByTagName("ds:SignatureValue").item(0).getTextContent().replaceAll("\\s+", "");
        System.out.println("Signature value: "+signatureValue);

        byte[] signatureValueBytes = Base64.getDecoder().decode(signatureValue);
        //System.out.println(Arrays.toString(signatureValueBytes));

        byte[] timestampRequest = createTimestampRequest(signatureValueBytes);
        //System.out.println(Arrays.toString(timestampRequest));

        byte[] responseBytes = getTimeStamp(timestampRequest, server);
        TimeStampResponse tsResponse = new TimeStampResponse(responseBytes);

        //System.out.println("Timestamp Response: "+ tsResponse.getTimeStampToken());
        //System.out.println("Timestamp Response Token Info: "+ tsResponse.getTimeStampToken().getTimeStampInfo());
        System.out.println("Time: "+ tsResponse.getTimeStampToken().getTimeStampInfo().getGenTime());

        byte[] timeStampToken = tsResponse.getEncoded();// ma tam ist token dpc nie cely response
        String base64TimeStamp = Base64.getEncoder().encodeToString(timeStampToken);

        System.out.println("Timestamp: "+base64TimeStamp);
        buildNewDocument(xml, base64TimeStamp);
        saveStampedXml(xml);

        return "stampedForm.xml";
    }

    private static byte[] createTimestampRequest(byte[] signature) throws IOException {
        Digest digest = new SHA256Digest();
        digest.update(signature, 0, signature.length);
        byte[] signatureDigest = new byte[digest.getDigestSize()];
        digest.doFinal(signatureDigest, 0);

        TimeStampRequestGenerator tsRequestGenerator = new TimeStampRequestGenerator();
        tsRequestGenerator.setCertReq(true);
        TimeStampRequest tsRequest = tsRequestGenerator.generate(TSPAlgorithms.SHA256, signatureDigest);
        //System.out.println("Timestamp Request: "+ tsRequest);
        return tsRequest.getEncoded();
    }

    private static byte[] getTimeStamp(byte[] timestampRequest, String server) throws IOException {
        URL tsURL = new URL(server);
        disableCertificateVerification();
        HttpsURLConnection tsConnection = (HttpsURLConnection) tsURL.openConnection();
        tsConnection.setDoOutput(true);
        tsConnection.setDoInput(true);
        tsConnection.setRequestMethod("POST");
        tsConnection.setRequestProperty("Content-Type", "application/timestamp-query");
        tsConnection.setRequestProperty("Content-Length", String.valueOf(timestampRequest.length));


        try (OutputStream requestStream = tsConnection.getOutputStream()) {
            requestStream.write(timestampRequest, 0, timestampRequest.length);
        }
        int responseCode = tsConnection.getResponseCode();
        if (responseCode != HttpURLConnection.HTTP_OK) {
            throw new IOException("HTTP error code: " + responseCode);
        }

        String contentType = tsConnection.getContentType();
        if (contentType == null || !contentType.equals("application/timestamp-reply".toLowerCase())) {
            throw new IOException("Incorrect response mimetype: " + contentType);
        }

        InputStream in = new BufferedInputStream(tsConnection.getInputStream());
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        byte[] buffer = new byte[1024];
        int bytesRead;
        while ((bytesRead = in.read(buffer)) != -1) {
            byteArrayOutputStream.write(buffer, 0, bytesRead);
        }
        byteArrayOutputStream.flush();

        return byteArrayOutputStream.toByteArray();
    }


}
