const baseUrl = '/api/recursos/v1';
const semillaPath = '/boleta.electronica.semilla';
const tokenPath = '/boleta.electronica.token';
import axios from 'axios';
import $ from 'jquery';

const parser = new DOMParser();

const dataObject = {};
async function fetchData() {
  try {
    return await axios.get(`${baseUrl}${semillaPath}`);
  } catch (error) {
    console.log(`Error fetching seed: ${error}`);
  }
}

async function handleFetchData() {
  try {
    dataObject.response = await fetchData();
    const xmlDataAsString = dataObject.response.data;
    const fetchedXmlDoc = parser.parseFromString(xmlDataAsString, 'text/xml');
    dataObject.xmlVersion = xmlDataAsString.slice(0, xmlDataAsString.indexOf('>') + 1);
    dataObject.fetchedXmlDoc = fetchedXmlDoc;
    dataObject.semilla = fetchedXmlDoc.getElementsByTagName('SEMILLA')[0].textContent;
    dataObject.estado = fetchedXmlDoc.getElementsByTagName('ESTADO')[0].textContent;
    dataObject.htmlCollection = fetchedXmlDoc.getElementsByTagNameNS('*', '*');
    dataObject.urlAttribute = dataObject.htmlCollection[0].getAttribute('xmlns:SII');
    dataObject.xmlString = `${dataObject.xmlVersion}
    <getToken><item><Semilla>${dataObject.semilla}</Semilla></item></getToken>`;

    return dataObject;
  } catch (error) {
    console.error('Error handling the fetch data:', error);
  }
}

(async function generateXml() {
  const dataObject = await handleFetchData();
  dataObject.postXmlDoc = $.parseXML(dataObject.xmlString);
})();

(async function printData() {
  const dataObject = await handleFetchData();
  console.log(dataObject.fetchedXmlDoc);
  for (const key of Object.entries(dataObject)) {
    console.log(key);
  }
  console.log(dataObject.postXmlDoc);
})();

// async function fetchData() {
//   try {
//     return fetch(`${baseUrl}${semillaPath}`)
//       .then(res => {
//         dataObject.response = res;
//         return res.text();
//       })
//       .then(dataAsText => {
//         dataObject.dataAsText = dataAsText;
//         return new DOMParser().parseFromString(dataAsText, 'text/xml');
//       });
//   } catch (error) {
//     console.error('Error fetching the seed:', error);
//   }
// }

// async function handleFetchData() {
//   try {
//     const fetchedXmlDoc = await fetchData();
//     dataObject.xmlVersion = dataObject.dataAsText.slice(
//       0,
//       dataObject.dataAsText.indexOf('>') + 1
//     );
//     dataObject.fetchedXmlDoc = fetchedXmlDoc;
//     dataObject.semilla = fetchedXmlDoc.getElementsByTagName('SEMILLA')[0].textContent;
//     dataObject.estado = fetchedXmlDoc.getElementsByTagName('ESTADO')[0].textContent;
//     dataObject.htmlCollection = fetchedXmlDoc.getElementsByTagNameNS('*', '*');
//     dataObject.urlAttribute = dataObject.htmlCollection[0].getAttribute('xmlns:SII');
//     dataObject.xmlString = `${dataObject.xmlVersion}
//     <getToken><item><Semilla>${dataObject.semilla}</Semilla></item></getToken>`;

//     return dataObject;
//   } catch (error) {
//     console.error('Error handling the fetch data:', error);
//   }
// }

// (async function generateXml() {
//   const dataObject = await handleFetchData();
//   dataObject.postXmlDoc = $.parseXML(dataObject.xmlString);
// })();

// (async function printData() {
//   const dataObject = await handleFetchData();
//   console.log(dataObject.fetchedXmlDoc);
//   for (const key of Object.entries(dataObject)) {
//     console.log(key);
//   }
//   console.log(dataObject.postXmlDoc);
// })();

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
