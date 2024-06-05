//import org.apache.xml.security.parser.XMLParserException;
//import org.bouncycastle.util.encoders.Base64;
//import org.w3c.dom.Document;
//import org.w3c.dom.Node;
//
//import java.io.ByteArrayOutputStream;
//import java.io.IOException;
//import java.security.MessageDigest;
//import java.util.List;
//import java.util.Objects;
//import org.apache.xml.security.c14n.CanonicalizationException;
//import org.apache.xml.security.c14n.Canonicalizer;
//import org.apache.xml.security.c14n.InvalidCanonicalizerException;
//
//
//public class CoreValidation {
//
//    public static boolean coreValidation(Document parsedXml) {
//
//        List<Node> referencesElements = Utils.findChildNodesWithName(Objects.requireNonNull(Utils.findChildNodeOf(Utils.findNode(parsedXml, "ds:Signature"), "ds:SignedInfo")), "ds:Reference");
//
//        for (Node referenceNode : referencesElements) {
//            Node uriNode = referenceNode.getAttributes().getNamedItem("URI");
//
//            if (uriNode == null) {
//                System.out.println("Reference node nema URI atribut");
//                return false;
//            }
//            String uri = referenceNode.getAttributes().getNamedItem("URI").getTextContent().replace("#", "");
//
//            Node manifestNode = Utils.findByAttributeValue(parsedXml, "ds:Manifest", "Id", uri);
//
//            if (manifestNode == null) {
//                continue;
//            }
//
//            Node digestValueElement = Utils.findChildNodeOf(referenceNode, "ds:DigestValue");
//            String expectedDigestValue = null;
//            if (digestValueElement != null) {
//                expectedDigestValue = digestValueElement.getTextContent();
//            } else {
//                System.out.println("ds:Reference element neobsahuje digestValue");
//                return false;
//            }
//
//            Node digestMethodElement = Utils.findChildNodeOf(referenceNode, "ds:DigestMethod");
//
//            String digestMethod = null;
//            if (digestMethodElement != null) {
//                digestMethod = digestMethodElement.getAttributes().getNamedItem("Algorithm").getTextContent();
//            } else {
//                System.out.println("ds:Reference element neobsahuje DigestMethod algorithm");
//                return false;
//            }
//
//            byte[] manifestElementBytes = Utils.fromElementToString(manifestNode).getBytes();
//            List<Node> transformsElements = Utils.findChildNodesWithName(manifestNode, "ds:Transforms");
//            ByteArrayOutputStream stream = new ByteArrayOutputStream();
//
//            for (int j = 0; j < transformsElements.size(); j++) {
//
//                Node transformsElement = transformsElements.get(j);
//
//                Node transformElement = Utils.findChildNodeOf(transformsElement, "ds:Transform");
//                String transformMethod = null;
//                if (transformElement != null) {
//                    transformMethod = transformElement.getAttributes().getNamedItem("Algorithm").getTextContent();
//                } else {
//                    System.out.println("ds:Transform element nema algorithm");
//                    return false;
//                }
//
//                if ("http://www.w3.org/TR/2001/REC-xml-c14n-20010315".equals(transformMethod)) {
//                    Canonicalizer canonicalizer = null;
//                    try {
//                        org.apache.xml.security.Init.init();
//                        canonicalizer = Canonicalizer.getInstance(transformMethod);
//                        canonicalizer.canonicalize(manifestElementBytes, stream, false);
//                        manifestElementBytes = stream.toByteArray();
//                    } catch (InvalidCanonicalizerException |
//                             CanonicalizationException | XMLParserException | IOException e) {
//                        throw new RuntimeException(e);
//                    }
//                }
//            }
//
//            MessageDigest messageDigest = null;
//
//            try {
//                messageDigest = MessageDigest.getInstance(digestMethod);
//            } catch (Exception e) {
//                System.out.println("Neznamy digest algoritmus");
//                return false;
//            }
//            String actualDigestValue = new String(Base64.encode(messageDigest.digest(manifestElementBytes)));
//
//
//            if (!expectedDigestValue.equals(actualDigestValue)) {
//                System.out.println(expectedDigestValue);
//                System.out.println(actualDigestValue);
//                System.out.println("Core validation zlyhala, hodnota ds:DigestValue elementu ds:Reference sa nezhoduje s hodnotou elementu ds:Manifest");
//                return false;
//            }
//        }
//
//        return true;
//
////        List<Node> referenceNodes = Utils.findChildNodesWithName(Utils.findNode(parsedXml, "ds:SignedInfo"), "ds:Reference");
////
////        for (Node referenceNode : referenceNodes) {
////
////            String uri = Utils.getAttributeValue(referenceNode, "URI");
////            if (uri == null || uri.isEmpty()) {
////                System.out.println("V referenčnom prvku chýba atribút URI.");
////                return false;
////            }
////
////            Node sourceNode = Utils.findByAttributeValue(parsedXml, "ds:Manifest", "Id", uri.substring(1));
////
////            Node digestValueNode = Utils.findChildNodeOf(sourceNode, "ds:DigestValue");
////            Node digestMethodNode = Utils.findChildNodeOf(sourceNode, "ds:DigestMethod");
////
////            if (digestValueNode == null || digestMethodNode == null) {
////                System.out.println("Chýba referenčný prvok DigestValue alebo DigestMethod potomka.");
////                return false;
////            }
////
////            String digestMethod = Utils.getAttributeValue(digestMethodNode, "Algorithm");
////            String expectedDigestValue = digestValueNode.getTextContent();
////
////
////            return true;
////
////        }
////
////        return true;
//    }
//}
