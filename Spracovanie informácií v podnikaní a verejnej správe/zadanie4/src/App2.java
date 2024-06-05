import java.io.ByteArrayOutputStream;
import java.math.BigInteger;
import java.security.*;
import java.util.*;
import java.io.File;
import java.io.IOException;
import org.apache.xml.security.c14n.CanonicalizationException;
import org.apache.xml.security.c14n.Canonicalizer;
import org.apache.xml.security.c14n.InvalidCanonicalizerException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.security.cert.X509Certificate;
import javax.security.auth.x500.X500Principal;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.apache.xml.security.parser.XMLParserException;
import org.bouncycastle.asn1.x500.X500Name;
import org.bouncycastle.cert.X509CertificateHolder;
import org.bouncycastle.tsp.TimeStampToken;
import org.bouncycastle.util.encoders.Base64;
import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import org.bouncycastle.cms.CMSSignedData;
import org.bouncycastle.util.Store;

import java.util.ArrayList;
import java.util.Collection;


public class App2 {
    public static final String[] SUPPORTED_SIGNATURE_ALGORITHMS = new String[]{
            "http://www.w3.org/2000/09/xmldsig#dsa-sha1",
            "http://www.w3.org/2000/09/xmldsig#rsa-sha1",
            "http://www.w3.org/2001/04/xmldsig-more#rsa-sha256",
            "http://www.w3.org/2001/04/xmldsig-more#rsa-sha384",
            "http://www.w3.org/2001/04/xmldsig-more#rsa-sha512"
    };

    public static final String[] SUPPORTED_TRANSFORM_ALGORITHM = new String[]{
            "http://www.w3.org/TR/2001/REC-xml-c14n-20010315",
            "http://www.w3.org/2000/09/xmldsig#base64"
    };

    public static final String[] SUPPORTED_DIGEST_ALGORITHMS = new String[]{
            "http://www.w3.org/2000/09/xmldsig#sha1",
            "http://www.w3.org/2001/04/xmldsig-more#sha224",
            "http://www.w3.org/2001/04/xmlenc#sha256",
            "http://www.w3.org/2001/04/xmldsig-more#sha384",
            "http://www.w3.org/2001/04/xmlenc#sha512"
    };

    private static final Map<String, String> SIGN_ALG;

    static {
        SIGN_ALG = new HashMap<String, String>();
        SIGN_ALG.put("http://www.w3.org/2000/09/xmldsig#dsa-sha1", "SHA1withDSA");
        SIGN_ALG.put("http://www.w3.org/2000/09/xmldsig#rsa-sha1", "SHA1withRSA/ISO9796-2");
        SIGN_ALG.put("http://www.w3.org/2001/04/xmldsig-more#rsa-sha256", "SHA256withRSA");
        SIGN_ALG.put("http://www.w3.org/2001/04/xmldsig-more#rsa-sha384", "SHA384withRSA");
        SIGN_ALG.put("http://www.w3.org/2001/04/xmldsig-more#rsa-sha512", "SHA512withRSA");
    }

    public static void main(String[] args) {

        org.apache.xml.security.Init.init();
        App2 app = new App2();
        app.runValidation();
    }

    private void runValidation() {
        try {
            List<File> filesToVerify = loadFilesToVerify();
            validateFiles(filesToVerify);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void validateFiles(List<File> files) {
        for (File file : files) {
            System.out.println("-----------------------------------------");
            System.out.println("Súbor: " + file.getName());
            if (isValidFile(file)) {
                System.out.println("\nSúbor: " + file.getName() + " má platný XADES-T podpis");
            } else {
                System.out.println("\nSúbor: " + file.getName() + " je neplatný");
            }
            System.out.println("-----------------------------------------");
            System.out.println("\n");
        }
    }

    private boolean isValidFile(File file) {
        Document parsedXml = buildXml(file);
        if (parsedXml == null) {
            System.out.println("Error parsing XML for file: " + file.getName());
            return false;
        }

        boolean isValid = true;

        // koreňový element musí obsahovať atribúty xmlns:xzep a xmlns:ds podľa profilu XADES_ZEP
        isValid = dataEnvelopeIsValid(parsedXml);

        if (!isValid) {
            return isValid;
        }

        // kontrola obsahu ds:SignatureMethod a ds:CanonicalizationMethod – musia obsahovať URI niektorého z podporovaných algoritmov pre dané elementy podľa profilu XAdES_ZEP
        isValid = sigMethodAndCanMethodIsValid(parsedXml);

        if (!isValid) {
            return isValid;
        }

        // kontrola obsahu ds:Transforms a ds:DigestMethod vo všetkých referenciách v ds:SignedInfo – musia obsahovať URI niektorého z podporovaných algoritmov podľa profilu XAdES_ZEP
        isValid = transAndDigestMethodIsValidInRef(parsedXml);

        if (!isValid) {
            return isValid;
        }

        // overenie hodnoty podpisu ds:SignatureValue a referencií v ds:SignedInfo
        isValid = isValidSignedInfoAndKeyInfo(parsedXml);

        if (!isValid) {
            return isValid;
        }

        // overenie hodnoty podpisu ds:SignatureValue a referencií v ds:SignedInfo
        isValid = dsSignatureValidate(parsedXml);

        if (!isValid) {
            return isValid;
        }

        // ds:SignatureValue – musí mať Id atribút
        isValid = dsSignatureValueValidate(parsedXml);

        if (!isValid) {
            return isValid;
        }

        isValid = checkSignedInfoSignatureReferences(parsedXml);

        if (!isValid) {
            return isValid;
        }

        isValid = checkManifestElements(parsedXml);

        if (!isValid) {
            return isValid;
        }

        isValid = getTimeStampSignatureCertificate(parsedXml);

        if (!isValid) {
            return isValid;
        }

        isValid = isValidMessageImprint(parsedXml);

        if (!isValid) {
            return isValid;
        }


//        isValid = dsKeyInfoValueValidate(parsedXml);
//
//        if (!isValid) {
//            return isValid;
//        }

//        isValid = dsSignaturePropertiesValidate(parsedXml);
//
//        if (!isValid) {
//            return isValid;
//        }

//        isValid &= validateAllReferenciesURIInSignedInfo(parsedXml);

//        if (!isValid) {
//            return isValid;
//        }

        return isValid;
    }

    private boolean isValidMessageImprint(Document parsedXml) {
        TimeStampToken ts_token = Utils.getTimestampToken(parsedXml);

        byte[] messageImprint = ts_token.getTimeStampInfo().getMessageImprintDigest();
        String hashAlg = ts_token.getTimeStampInfo().getHashAlgorithm().getAlgorithm().toString();
        Node signatureValueNode = null;
        signatureValueNode = Utils.findNode(parsedXml, "ds:SignatureValue");

        if (signatureValueNode == null) {
            System.out.println("Element ds:SignatureValue nenájdený.");
            return false;
        }

        byte[] signatureValue = Base64.decode(signatureValueNode.getTextContent().getBytes());

        MessageDigest messageDigest = null;
        try {
            messageDigest = MessageDigest.getInstance(hashAlg, "SUN");
        } catch (NoSuchAlgorithmException | NoSuchProviderException e) {
            System.out.println("Nepodporovaný algoritmus v message digest.");
            return false;
        }

        if (!Arrays.equals(messageImprint, messageDigest.digest(signatureValue))) {
            System.out.println("MessageImprint z časovej pečiatky a podpis ds:SignatureValue sa nezhodujú.");
            return false;
        }

        return true;
    }

    private boolean checkManifestElements(Document parsedXml) {
        NodeList manifestElements = Utils.findAllNodes(parsedXml, "ds:Manifest");
        String idAttrib = "";
        for (int i = 0; i < manifestElements.getLength(); i++) {
            Node manifestNode = manifestElements.item(i);
            idAttrib = Utils.getAttributeValue(manifestNode, "Id");
            if (idAttrib.isEmpty()) {
                System.out.println("Element ds:Manifest nema Id atribut. ");
                return false;
            }
            Node refNode = Utils.findChildNodeOf(manifestNode, "ds:Reference");
            if (refNode == null) {
                System.out.println("Element ds:Manifest neobsahuje ds:Reference node. ");
                return false;
            }

            String refUri = Utils.getAttributeValue(refNode, "URI").replace("#", "");
            if (refUri.isEmpty()) {
                System.out.println("Element ds:Reference v elemente ds:Manifest nema atribut URI. ");
                return false;
            }

            Node dsObjectNode = Utils.findByAttributeValue(parsedXml, "ds:Object", "Id", refUri);
            if (dsObjectNode == null) {
                System.out.println("Element ds:Reference v elemente ds:Manifest nereferencuje na žiadny ds:Object. ");
                return false;
            }

            String refType = Utils.getAttributeValue(refNode, "Type");
            if (refType.isEmpty()) {
                System.out.println("Element ds:Reference v elemente ds:Manifest nema atribut Type. ");
                return false;
            }

            if (!(refType.equals("http://www.w3.org/2000/09/xmldsig#Object"))) {
                System.out.println("Element ds:Reference v elemente ds:Manifest ma zly atribut Type. ");
                return false;
            }

            Node transformsNode = Utils.findChildNodeOf(refNode, "ds:Transforms");
            Node transformNode = Utils.findChildNodeOf(transformsNode, "ds:Transform");
            Node digestNode = Utils.findChildNodeOf(refNode, "ds:DigestMethod");

            String algorithmTransform = Utils.getAttributeValue(transformNode, "Algorithm");
            String algorithmDigest = Utils.getAttributeValue(digestNode, "Algorithm");
            if (algorithmTransform.isEmpty() || algorithmDigest.isEmpty()) {
                System.out.println("V ds:Transforms alebo ds:DigestMethod elemente chýba atribút Algorithm.");
                return false;
            }

            if (!Utils.isSupportedAlgorithm(algorithmDigest, SUPPORTED_DIGEST_ALGORITHMS)) {
                System.out.println("Nepodporovaný DigestMethod algoritmus: " + algorithmDigest);
                return false;
            }

            if (!Utils.isSupportedAlgorithm(algorithmTransform, SUPPORTED_TRANSFORM_ALGORITHM)) {
                System.out.println("Nepodporovaný Transform algoritmus: " + algorithmTransform);
                return false;
            }

            byte[] objectElementBytes = null;

            String xmlNode = Utils.fromElementToString(dsObjectNode);
            objectElementBytes = xmlNode.getBytes();

            if ("http://www.w3.org/TR/2001/REC-xml-c14n-20010315".equals(algorithmTransform)) {
                try {
                    Canonicalizer canonicalizer = Canonicalizer.getInstance(algorithmTransform);
                    ByteArrayOutputStream stream = new ByteArrayOutputStream();
                    canonicalizer.canonicalize(objectElementBytes, stream, true);
                    objectElementBytes = stream.toByteArray();

                } catch (InvalidCanonicalizerException | CanonicalizationException |
                         IOException | XMLParserException e) {

                    throw new RuntimeException(e);
                }
            }


            if ("http://www.w3.org/2000/09/xmldsig#base64".equals(algorithmTransform)) {

                objectElementBytes = Base64.decode(objectElementBytes);
            }

            MessageDigest messageDigest = null;
            try {
                messageDigest = MessageDigest.getInstance(Utils.convertDigestAlgo(algorithmDigest));

            } catch (NoSuchAlgorithmException e) {

                throw new RuntimeException(e);
            }

            Node digestValNode = Utils.findChildNodeOf(refNode, "ds:DigestValue");
            if (digestValNode == null) {
                System.out.println("ds:Reference element neobsahuje element ds:DigestValue");
                return false;
            }

            String actualDigestValue = new String(Base64.encode(messageDigest.digest(objectElementBytes)));
            String expectedDigestValue = digestValNode.getTextContent();

            if (!expectedDigestValue.equals(actualDigestValue)) {

                System.out.println("Hodnota ds:DigestValue elementu ds:Reference sa nezhoduje s hash hodnotou elementu ds:Manifest.");
                return false;

            }

        }
        return true;
    }

//    private boolean validateAllReferenciesURIInSignedInfo(Document parsedXml) {
//        String IdValueExpected = "";
//        Node signedInfoNode = Utils.findNode(parsedXml, "ds:SignedInfo");
//        List<Node> referenceElements = null;
//        if (signedInfoNode != null) {
//            referenceElements = Utils.findChildNodesWithName(signedInfoNode, "ds:Reference");
//        } else {
//            System.out.println("Element ds:SignedInfo neexistuje.");
//            return false;
//        }
//        if (referenceElements == null) {
//            System.out.println("Element ds:SignedIndfo neobsahuje žiadne ds:Reference elementy.");
//            return false;
//        }
//
//        String reference = "";
//        for (Node referenceElement : referenceElements) {
//            String referenceId = Utils.getAttributeValue(referenceElement, "URI");
//            if (referenceId == null ){
//                System.out.println("Chyba URI v elemente");
//            }
//            reference = referenceId.replace("#", "");
//        }
//    }

    public static boolean dsSignaturePropertiesValidate(Document parsedXml, String referenceId, Node referenceNode) {

        Node signatureNode = Utils.findNode(parsedXml, "ds:Signature");
        NodeList objectElements = Utils.findAllNodes(parsedXml, "ds:Object");
        // List<Node> objectElements = findChildNodesWithName(signatureNode, "ds:Object");
        Node signaturePropertiesNode = null;
        //hladam element signatureProperties pod ds:Object
        if (objectElements == null) {
            System.out.println("Element ds:Signature neobsahuje žiadne ds:Object elementy.");
            return false;
        }

        Boolean propertiesFound = false;
        Node propNode = null;
        for (int i = 0; i < objectElements.getLength(); i++) {
            Node objectElement = objectElements.item(i);
            propNode = Utils.findChildNodeOf(objectElement, "ds:SignatureProperties");
            if (propNode != null) {
                propertiesFound = true;
                signaturePropertiesNode = propNode;
                break;
            }
        }

        if (!propertiesFound) {
            System.out.println("Element ds:SignatureProperties sa nenachádza v žiadnom ds:Object elemente.");
            return false;
        }

        String signaturePropertiesId = Utils.getAttributeValue(signaturePropertiesNode, "Id");
        if (signaturePropertiesId == null) {
            System.out.println("Element ds:SignatureProperties nemá atribút Id");
            return false;
        }

        String signaturePropertiesType = Utils.getAttributeValue(referenceNode, "Type");
        if (signaturePropertiesType == null) {
            System.out.println("Element ds:Reference na element ds:SignatureProperties nema atribut Type. ");
            return false;
        }
        if (!(signaturePropertiesType.equals("http://www.w3.org/2000/09/xmldsig#SignatureProperties"))) {
            System.out.println("Element ds:Reference na element ds:SignatureProperties ma zlu hodnotu atributu Type. ");
            return false;
        }

        if (!(referenceId.equals(signaturePropertiesId))) {
            System.out.println("Element ds:SignatureProperties nie je referencovaný v žiadnom ds:Reference (URI).");
            return false;
        }

        List<Node> signaturePropertyElements = Utils.findChildNodesWithName(signaturePropertiesNode, "ds:SignatureProperty");
        if (signaturePropertyElements.size() != 2) {
            System.out.println("Element ds:SignatureProperties neobsahuje prave dva elemnty ds:SignatureProperty.");
            return false;
        }
        Node tempVersionNode = null;
        Node tempProductNode = null;


        for (Node signaturePropertyElement : signaturePropertyElements) {

            if (tempVersionNode == null) {
                tempVersionNode = Utils.findChildNodeOf(signaturePropertyElement, "xzep:SignatureVersion");
            }
            if (tempProductNode == null) {
                tempProductNode = Utils.findChildNodeOf(signaturePropertyElement, "xzep:ProductInfos");
            }

            String target = Utils.getAttributeValue(signaturePropertyElement, "Target").replace("#", "");
            String signatureNodeId = Utils.getAttributeValue(signatureNode, "Id");
            if (!target.equals(signatureNodeId)) {
                System.out.println("Jeden z atribútov ds:SignatureProperty nemá atribút Target nastavený na ds:Signature");
                return false;
            }
        }

        if (tempVersionNode == null || tempProductNode == null) {
            System.out.println("Chýba element ds:SignatureProperty s elementom xzep:SignatureVersion alebo xzep:ProductInfos");
            return false;
        }

        return true;
    }

    public static boolean checkSignedInfoSignatureReferences(Document parsedXml) {
        Node node = null;
        Node signatureInfoNode = Utils.findNode(parsedXml, "ds:SignedInfo");

        List<Node> referenceElementNode = Utils.findChildNodesWithName(signatureInfoNode, "ds:Reference");
        boolean ok1 = true;
        boolean ok2 = true;
        boolean ok3 = true;
        boolean ok4 = true;

        for (Node referenceNode : referenceElementNode) {
            String referenceUri = Utils.getAttributeValue(referenceNode, "URI").replace("#", "");

            if (referenceUri.contains("SignatureProperties")) {
                ok1 = dsSignaturePropertiesValidate(parsedXml, referenceUri, referenceNode);
                if (!ok1)
                    return false;
            } else if (referenceUri.contains("KeyInfo")) {
                ok2 = dsKeyInfoValueValidate(parsedXml, referenceUri, referenceNode);
                if (!ok2)
                    return false;
            } else if (referenceUri.contains("SignedProperties")) {
                ok3 = xadesSignedPropertiesValidate(parsedXml, referenceUri, referenceNode);
                if (!ok3)
                    return false;
            } else {
                ok4 = referenceManifest(parsedXml, referenceUri, referenceNode);
                if (!ok4)
                    return false;
            }

        }

        return true;
    }

    private static boolean referenceManifest(Document parsedXml, String referenceUri, Node referenceNode) {
        Node manifestNode = Utils.findByAttributeValue(parsedXml, "ds:Manifest", "Id", referenceUri);
        if (manifestNode == null) {
            System.out.println("Neexistuje ds:Manifest  element pre referenciu " + referenceUri);
            return false;
        }
        String manifestType = Utils.getAttributeValue(referenceNode, "Type");
        if (manifestType == null) {
            System.out.println("Element ds:Reference na element ds:Manifest nema atribut Type.");
            return false;
        }
        if (!(manifestType.equals("http://www.w3.org/2000/09/xmldsig#Manifest"))) {
            System.out.println("Element ds:Reference na ds:Manifest ma zlu hodnotu atributu Type. ");
            return false;
        }

        return true;
    }

    private static boolean xadesSignedPropertiesValidate(Document parsedXml, String referenceId, Node referenceNode) {
        Node signatureNode = Utils.findNode(parsedXml, "xades:SignedProperties");
        String signatureNodeId = Utils.getAttributeValue(signatureNode, "Id");

        if (!(referenceId.equals(signatureNodeId))) {
            System.out.println("Element xades:SignedProperties nie je referencovaný v žiadnom ds:Reference (URI).");
            return false;
        }

        String signaturePropertiesType = Utils.getAttributeValue(referenceNode, "Type");
        if (signaturePropertiesType == null) {
            System.out.println("Element ds:Reference na SignedProperties nema atribut Type. ");
            return false;
        }
        if (!(signaturePropertiesType.equals("http://uri.etsi.org/01903#SignedProperties"))) {
            System.out.println("Element ds:Reference na SignedProperties ma zlu hodnotu atributu Type. ");
            return false;
        }

        return true;
    }


    public static boolean dsKeyInfoValueValidate(Document parsedXml, String referenceId, Node referenceNode) {
        Node signatureNode = Utils.findNode(parsedXml, "ds:Signature");

        Node keyInfoNode = Utils.findChildNodeOf(signatureNode, "ds:KeyInfo");
        if (keyInfoNode == null) {
            System.out.println("Element ds:KeyInfo sa nenachádza v štruktúre pod ds:signature.");
            return false;
        }

        String keyInfoId = Utils.getAttributeValue(keyInfoNode, "Id");
        if (keyInfoId == null) {
            System.out.println("Element  ds:KeyInfo nemá atribút Id");
            return false;
        }

        String keyInfoType = Utils.getAttributeValue(referenceNode, "Type");
        if (keyInfoType == null) {
            System.out.println("Element ds:Reference na ds:KeyInfo nema atribut Type. ");
            return false;
        }
        if (!(keyInfoType.equals("http://www.w3.org/2000/09/xmldsig#Object"))) {
            System.out.println("Element ds:Reference na  ds:KeyInfo ma zlu hodnotu atributu Type. ");
            return false;
        }


        Node x509DataNode = Utils.findChildNodeOf(keyInfoNode, "ds:X509Data");
        if (x509DataNode == null) {
            System.out.println("Element ds:X509Data neexistuje.");
            return false;
        }

        Node x509CertificateNode = Utils.findChildNodeOf(x509DataNode, "ds:X509Certificate");
        Node x509IssuerSerialNode = Utils.findChildNodeOf(x509DataNode, "ds:X509IssuerSerial");
        Node x509SubjectNameNode = Utils.findChildNodeOf(x509DataNode, "ds:X509SubjectName");

        if (x509CertificateNode == null || x509IssuerSerialNode == null || x509SubjectNameNode == null) {
            System.out.println("Element ds:X509Data neobsahuje všetky požadované prvky (ds:X509Certificate, ds:X509IssuerSerial, ds:X509SubjectName).");
            return false;
        }

        String certificateValue = x509CertificateNode.getTextContent();
        X509Certificate certificate = Utils.generateCertificateFromString(certificateValue);

        String issuerName = Utils.findChildNodeOf(x509IssuerSerialNode, "ds:X509IssuerName").getTextContent();
        issuerName = issuerName.replaceAll("\\s+", "");
        String serialNumber = Utils.findChildNodeOf(x509IssuerSerialNode, "ds:X509SerialNumber").getTextContent();
        String subjectName = x509SubjectNameNode.getTextContent();
        subjectName = subjectName.replaceAll("\\s+", "");

        String certIssuerName = certificate.getIssuerX500Principal().getName().replaceAll("ST=", "S=");
        ;
        certIssuerName = certIssuerName.replaceAll("\\s+", "");

        String certSerialNumber = certificate.getSerialNumber().toString();

        String certSubjectName = certificate.getSubjectX500Principal().getName();
        certSubjectName = certSubjectName.replaceAll("\\s+", "");


        if (!issuerName.equals(certIssuerName)) {
            System.out.println("Element ds:X509IssuerName sa nezhoduje s názvom vydavateľa certifikátu.");
            return false;
        }

        if (!serialNumber.equals(certSerialNumber)) {
            System.out.println("Element ds:X509SerialNumber sa nezhoduje so sériovým číslom certifikátu.");
            return false;
        }

        if (!subjectName.equals(certSubjectName)) {
            System.out.println("Element ds:X509SubjectName sa nezhoduje s názvom predmetu certifikátu.");
            return false;
        }

        if (!(referenceId.equals(keyInfoId))) {
            System.out.println("Element ds:KeyInfo nie je referencovaný v žiadnom ds:Reference (URI).");
            return false;
        }

        return true;
    }

    private boolean dsSignatureValueValidate(Document parsedXml) {
        Node signatureValueNode = Utils.findNode(parsedXml, "ds:SignatureValue");
        if (signatureValueNode == null) {
            System.out.println("Chýba element ds:SignatureValue.");
            return false;
        }

        String signatureValueId = Utils.getAttributeValue(signatureValueNode, "Id");
        if (signatureValueId == null || signatureValueId.isEmpty()) {
            System.out.println("V elemente ds:SignatureValue chýba atribút Id.");
            return false;
        }

        return true;
    }

    private boolean dsSignatureValidate(Document parsedXml) {
        Node signatureNode = Utils.findNode(parsedXml, "ds:Signature");
        if (signatureNode == null) {
            System.out.println("The ds:Signature element is missing.");
            return false;
        }


        String idValue = Utils.getAttributeValue(signatureNode, "Id");
        if (idValue.isEmpty()) {
            System.out.println("V elemente ds:Signature chýba atribút Id.");
            return false;
        }

        Node qualifyingPropertiesNode = Utils.findNode(signatureNode.getOwnerDocument(), "xades:QualifyingProperties");
        if (qualifyingPropertiesNode == null) {
            System.out.println("Chýba element xades:QualifyingProperties.");
            return false;
        }

        String targetAttribute = Utils.getAttributeValue(qualifyingPropertiesNode, "Target");
        if (!targetAttribute.equals("#" + idValue)) {
            System.out.println("Atribút Target v xades:QualifyingProperties sa nezhoduje s Id ds:Signature.");
            return false;
        }

        String namespace = Utils.getAttributeValue(signatureNode, "xmlns:ds");
        if (namespace.isEmpty() || !namespace.equals("http://www.w3.org/2000/09/xmldsig#")) {
            System.out.println("Element ds:Signature má nesprávny alebo chýbajúci namespace.");
            return false;
        }

        return true;
    }

    private List<File> loadFilesToVerify() {
        String rootPath = "D:\\skola\\SIVPS\\cvika\\Cviko5\\Priklady\\";
        List<File> files = new ArrayList<>();
        try {
            Files.walk(Paths.get(rootPath))
                    .filter(Files::isRegularFile)
                    .forEach(path -> files.add(path.toFile()));
        } catch (IOException e) {
            e.printStackTrace();
        }
        return files;
    }


    private Document buildXml(File xmlFile) {
        try {
            DocumentBuilder documentBuilder = DocumentBuilderFactory.newInstance().newDocumentBuilder();
            return documentBuilder.parse(xmlFile);
        } catch (ParserConfigurationException | SAXException | IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    private boolean dataEnvelopeIsValid(Document parsedXml) {
        Node dataEnvelopeNode = Utils.findNode(parsedXml, "xzep:DataEnvelope");
        if (dataEnvelopeNode == null) {
            System.out.println("Element DataEnvelope (xzep:DataEnvelope) chýba.");
            return false;
        }

        Node xmlnsXzepNode = dataEnvelopeNode.getAttributes().getNamedItem("xmlns:xzep");
        Node xmlnsDsNode = dataEnvelopeNode.getAttributes().getNamedItem("xmlns:ds");

        String xmlnsXzepValue = xmlnsXzepNode != null ? xmlnsXzepNode.getNodeValue() : "";
        String xmlnsDsValue = xmlnsDsNode != null ? xmlnsDsNode.getNodeValue() : "";

        String expectedXmlnsXzepValue = "http://www.ditec.sk/ep/signature_formats/xades_zep/v1.0";
        String expectedXmlnsDsValue = "http://www.w3.org/2000/09/xmldsig#";

        boolean isValidXmlnsXzep = expectedXmlnsXzepValue.equals(xmlnsXzepValue);
        boolean isValidXmlnsDs = expectedXmlnsDsValue.equals(xmlnsDsValue);

        if (!isValidXmlnsXzep) {
            System.out.println("Neplatná hodnota xmlns:xzep v DataEnvelope. Očakávaná hodnota: " + expectedXmlnsXzepValue + ", Našla sa: " + xmlnsXzepValue);
        }

        if (!isValidXmlnsDs) {
            System.out.println("Neplatná hodnota xmlns:ds v DataEnvelope. Očakávaná hodnota " + expectedXmlnsDsValue + ", Našla sa: " + xmlnsDsValue);
        }
        if (!(isValidXmlnsXzep && isValidXmlnsDs)) {
            System.out.println("ERROR: Koreňový element musí obsahovať atribúty xmlns:xzep a xmlns:ds podľa profilu XADES_ZEP");
        }

        return isValidXmlnsXzep && isValidXmlnsDs;
    }

    private boolean sigMethodAndCanMethodIsValid(Document parsedXml) {
        Node signatureMethodNode = Utils.findNode(parsedXml, "ds:SignatureMethod");
        Node canonicalizationMethodNode = Utils.findNode(parsedXml, "ds:CanonicalizationMethod");

        if (signatureMethodNode == null || canonicalizationMethodNode == null) {
            System.out.println("Chýba element SignatureMethod alebo CanonicalizationMethod. ");
            return false;
        }

        String signatureMethodAlgorithm = Utils.getAttributeValue(signatureMethodNode, "Algorithm");
        String canonicalizationMethodAlgorithm = Utils.getAttributeValue(canonicalizationMethodNode, "Algorithm");

        boolean isValidSignatureMethod = Utils.isSupportedAlgorithm(signatureMethodAlgorithm, SUPPORTED_SIGNATURE_ALGORITHMS);
        boolean isValidCanonicalizationMethod = "http://www.w3.org/TR/2001/REC-xml-c14n-20010315".equals(canonicalizationMethodAlgorithm);

        if (!isValidSignatureMethod) {
            System.out.println("Nepodporovaný SignatureMethod algoritmus: " + signatureMethodAlgorithm);
        }

        if (!isValidCanonicalizationMethod) {
            System.out.println("Nepodporovaný CanonicalizationMethod algoritmus: " + canonicalizationMethodAlgorithm);
        }

        if ((!isValidSignatureMethod) || (!isValidCanonicalizationMethod)) {
            System.out.println("ERROR: ds:SignatureMethod a ds:CanonicalizationMethod musia obsahovať URI niektorého z podporovaných algoritmov pre dané elementy podľa profilu XAdES_ZEP.");
        }

        return isValidSignatureMethod && isValidCanonicalizationMethod;
    }

    private boolean transAndDigestMethodIsValidInRef(Document parsedXml) {

        List<Node> referenceNodes = Utils.findChildNodesWithName(Utils.findNode(parsedXml, "ds:SignedInfo"), "ds:Reference");

        for (Node referenceNode : referenceNodes) {

            Node transformsNode = Utils.findChildNodeOf(referenceNode, "ds:Transforms");
            Node transformNode = Utils.findChildNodeOf(transformsNode, "ds:Transform");
            Node digestNode = Utils.findChildNodeOf(referenceNode, "ds:DigestMethod");

            String algorithmTransform = Utils.getAttributeValue(transformNode, "Algorithm");
            String algorithmDigest = Utils.getAttributeValue(digestNode, "Algorithm");
            if (algorithmTransform.isEmpty() || algorithmDigest.isEmpty()) {
                System.out.println("V ds:Transform alebo ds:DigestMethod elemente chýba atribút Algorithm.");
                return false;
            }

            if (!Utils.isSupportedAlgorithm(algorithmDigest, SUPPORTED_DIGEST_ALGORITHMS)) {
                System.out.println("Nepodporovaný DigestMethod algoritmus: " + algorithmDigest);
                return false;
            }

            if (!Utils.isSupportedAlgorithm(algorithmTransform, SUPPORTED_TRANSFORM_ALGORITHM)) {
                System.out.println("Nepodporovaný Transform algoritmus: " + algorithmTransform);
                return false;
            }

        }

        return true;
    }

    private boolean isValidSignedInfoAndKeyInfo(Document parsedXml) {

        Node signatureNode = Utils.findNode(parsedXml, "ds:Signature");
        Node signedInfoNode = Utils.findChildNodeOf(signatureNode, "ds:SignedInfo");
        Node canonicalMethodNode = null;
        if (signedInfoNode != null) {
            canonicalMethodNode = Utils.findChildNodeOf(signedInfoNode, "ds:CanonicalizationMethod");
        } else {
            System.out.println("CanonicalizationMethod element nebol v signed info najdeny");
            return false;
        }

        Node signatureMethodNode = Utils.findChildNodeOf(signedInfoNode, "ds:SignatureMethod");
        Node signatureValueNode = Utils.findChildNodeOf(signatureNode, "ds:SignatureValue");

        byte[] signedInfoElementBytes = Utils.fromElementToString(signedInfoNode).getBytes();

        String canonicalizationMethod = "";
        if (canonicalMethodNode != null) {
            canonicalizationMethod = canonicalMethodNode.getAttributes().getNamedItem("Algorithm").getTextContent();
        } else {
            System.out.println("CanonicalizationMethod element nema atribut algorithm");
            return false;
        }

        byte[] cannonicalizedBytes;
        Canonicalizer canonicalizer = null;
        ByteArrayOutputStream stream = new ByteArrayOutputStream();
        try {
            canonicalizer = Canonicalizer.getInstance(canonicalizationMethod);
            canonicalizer.canonicalize(signedInfoElementBytes, stream, true);
            cannonicalizedBytes = stream.toByteArray();
        } catch (InvalidCanonicalizerException | IOException | CanonicalizationException | XMLParserException e) {
            throw new RuntimeException(e);
        }

        Node keyInfoNode = Utils.findNode(parsedXml, "ds:KeyInfo");
        Node x509Data = Utils.findChildNodeOf(keyInfoNode, "ds:X509Data");
        Node x509Certificate = null;
        if (x509Data != null) {
            x509Certificate = Utils.findChildNodeOf(x509Data, "ds:X509Certificate");
        } else {
            System.out.println("Element ds:X509Certificate neexistuje");
            return false;
        }
        String X509CertficateValue = null;
        if (x509Certificate != null) {
            X509CertficateValue = x509Certificate.getTextContent();
        } else {
            System.out.println("Element ds:X509Certificate nema hodnotu");
            return false;
        }

        String signatureMethod = "";

        if (signatureMethodNode != null) {
            signatureMethod = signatureMethodNode.getAttributes().getNamedItem("Algorithm").getTextContent();
        } else {
            System.out.println("signature Method nema atribut algorithm");
            return false;
        }

        signatureMethod = SIGN_ALG.get(signatureMethod);

        X509Certificate certificate = Utils.generateCertificateFromString(X509CertficateValue);
        Signature signer = null;


        try {
            signer = Signature.getInstance(signatureMethod);
            signer.initVerify(certificate.getPublicKey());
            signer.update(cannonicalizedBytes);
        } catch (NoSuchAlgorithmException | SignatureException | InvalidKeyException e) {
            System.out.println("Chyba pri inicializacii podpisovaca: " + e);
            return false;
        }

        String signatureValue;
        byte[] signatureValueBytes = new byte[0];
        if (signatureValueNode != null) {
            signatureValue = signatureValueNode.getTextContent();
        } else {
            System.out.println("signature value nema hodnotu");
            return false;
        }


        byte[] decodedSignatureValueBytes = Base64.decode(signatureValue);

        boolean verificationResult = false;

        try {
            verificationResult = signer.verify(decodedSignatureValueBytes);
        } catch (SignatureException e) {
            System.out.println("Chyba pri verifikacii digitalneho podpisu");
            return false;
        }

        if (!verificationResult) {
            System.out.println("Podpisana hodnota ds:SignedInfo sa nezhoduje s hodnotou v elemente ds:SignatureValue");
            return false;

        }
        return true;

    }

    public boolean isValidTimestampCerfificate(Document parsedXml) {
        var crl = Utils.getCRL();
        if (crl == null) {
            System.out.println("nepodarilo sa načítať CRL");
            return false;
        }
        TimeStampToken ts_token = Utils.getTimestampToken(parsedXml);

        ArrayList<X509CertificateHolder> collection = (ArrayList<X509CertificateHolder>) ts_token.getCertificates().getMatches(null);

        BigInteger timeStampSerialNumber = ts_token.getSID().getSerialNumber();
        X500Name timeStampIssuerToken = toBouncyX500Name(ts_token.getSID().getIssuer());

        X509CertificateHolder signer = null;
        for (X509CertificateHolder certHolder : collection) {
            if (certHolder.getSerialNumber().equals(timeStampSerialNumber) && (certHolder.getIssuer().equals(timeStampIssuerToken))) {
                signer = certHolder;
                break;
            }
        }

        if (signer == null) {
            System.out.println("V dokumente sa nenachadza certifikat casovej peciatky.");
            return false;
        }

        if (!signer.isValidOn(new Date())) {
            System.out.println("Podpisový certifikát časovej pečiatky nie je platný voči aktuálnemu času.");
            return false;
        }

        if (crl.getRevokedCertificate(signer.getSerialNumber()) != null) {
            System.out.println("Podpisový certifikát časovej pečiatky nie je platný voči platnému poslednému CRL.");
            return false;
        }

        return true;
    }

    private X500Name toBouncyX500Name(X500Principal principal) {
        String name = principal.getName();

        String[] RDN = name.split(",");

        StringBuffer buf = new StringBuffer(name.length());
        buf.append(RDN[3]);
        buf.append(',');
        buf.append(RDN[1]);
        buf.append(',');
        buf.append(RDN[2]);
        buf.append(',');
        buf.append(RDN[0]);

        return new X500Name(buf.toString());
    }

    public static boolean getTimeStampSignatureCertificate(Document parsedXml) {
        try {

            String encodedTimeStamp = parsedXml.getElementsByTagName("xades:EncapsulatedTimeStamp").item(0).getTextContent();

            byte[] decodedTimeStamp = Base64.decode(encodedTimeStamp);

            TimeStampToken timeStampToken = null;
            timeStampToken = new TimeStampToken(new CMSSignedData(decodedTimeStamp));


//            TimeStampResponse tsResp = new TimeStampResponse(new CMSSignedData(Base64.decode(encodedTimeStamp)));
//
//            ts_token = new TimeStampResponse(new CMSSignedData(Base64.decode(timestamp.getTextContent())));

//            // Parse the Time Stamp Response
//            TimeStampResponse tsResp = new TimeStampResponse(ts_token.get);
//            TimeStampToken timeStampToken = tsResp.getTimeStampToken();

            // Convert the Time Stamp Token to CMS Signed Data
            CMSSignedData signedData = new CMSSignedData(timeStampToken.getEncoded());

            // Get the certificates from the Signed Data
            Store certStore = signedData.getCertificates();
            Collection<X509CertificateHolder> certs = certStore.getMatches(null);

            String valueOfTimestampIsuuer = String.valueOf(timeStampToken.getSID().getIssuer());
            valueOfTimestampIsuuer = valueOfTimestampIsuuer.replace("\\", "").replace("\"", "").replace(" ", "");
            String[] timestampIsuuerParts = valueOfTimestampIsuuer.split(",");
            List<String> listTimestampParts = Arrays.asList(timestampIsuuerParts);

            X509CertificateHolder signerCert = null;
            for (X509CertificateHolder cert : certs) {
                String value_of_cert = String.valueOf(cert.getIssuer());
                value_of_cert = value_of_cert.replace("\\", "").replace("\"", "").replace(" ", "");
                String[] cert_parts = value_of_cert.split(",");

                for(String part : cert_parts) {
                    if (!(listTimestampParts.contains(part))){
                        break;
                    }
                    signerCert = cert;
                }
            }

            if (signerCert == null) {
                System.out.println("V dokumente sa nenachadza certifikat casovej peciatky.");
                return false;
            }

            if (!(signerCert.isValidOn(new Date()))) {
                System.out.println(new Date());
                System.out.println("Podpisový certifikát časovej pečiatky nie je platný voči aktuálnemu času.");
                return false;
            }

            var crl = Utils.getCRL();
            if (crl == null) {
                System.out.println("Neporadilo sa načítať CRL dokument");
                return false;
            }

            if (crl.getRevokedCertificate(signerCert.getSerialNumber()) != null) {
                System.out.println("Podpisový certifikát časovej pečiatky nie je platný voči platnému poslednému CRL.");
                return false;
            }

        } catch (Exception ex) {
            ex.printStackTrace();
            System.out.println("Error in getTimeStampSignatureCertificate: ");
            return false;
        }

    return true;
    }



}