// const fs = require('fs');
// const { SignedXml } = require('xml-crypto');
// const { readFileSync } = require('fs');
// const { pki } = require('node-forge');

// // Load your private key and certificate
// const privateKey = readFileSync('path/to/your-private-key.pem', 'utf8');
// const certificate = readFileSync('path/to/your-certificate.pem', 'utf8');

// // Your XML document
// const xml = `<?xml version="1.0" encoding="UTF-8"?>
// <getToken><item><Semilla>YOUR_SE
// MILLA_VALUE</Semilla></item></getToken>`;

// // Sign the XML
// const sig = new SignedXml();
// sig.addReference(
// "//[local-name(.)='getToken']",
// ["http://www.w3.org/2000/09/xmldsig#enveloped-signature"],
// "http://www.w3.org/2000/09/xmldsig#sha1"
// );
// sig.signingKey = privateKey;
// sig.keyInfoProvider = {
// getKeyInfo: () => <X509Data><X509Certificate>${pki.certificateToPem(certificate)}</X509Certificate></X509Data>,
// };
// sig.computeSignature(xml, {
// prefix: 'ds',
// attrs: {
// Id: 'SignatureId',
// },
// location: { reference: "/[local-name(.)='getToken']", action: 'append' },
// });

// // Get the signed XML
// const signedXml = sig.getSignedXml();
// console.log(signedXml);

{
  /* <SignedInfo>
    <CanonicalizationMethod Algorithm="http://www.w3.org/TR/2001/REC-xml-c14n-20010315"/>
    <SignatureMethod Algorithm="http://www.w3.org/2000/09/xmldsig#rsa-sha1"/>
    <Reference URI="">
        <Transforms>
            <Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature"/>
        </Transforms>
        <DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1"/>
        <DigestValue>BASE64_DIGEST_VALUE</DigestValue>
    </Reference>
</SignedInfo>
<SignatureValue>BASE64_SIGNATURE_VALUE</SignatureValue>
<KeyInfo>
    <KeyValue>
        < */
}
