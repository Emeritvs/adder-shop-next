import fs from "fs";
import forge from "node-forge";

export default (req, res) => {
  try {
    // Load the .p12 file
    const p12Buffer = fs.readFileSync("../../../../.config/homologacao-583957-AdderShopQA.p12");
    const p12Asn1 = forge.asn1.fromDer(p12Buffer.toString("binary"));

    // Parse the .p12 using the provided password
    const p12 = forge.pkcs12.pkcs12FromAsn1(p12Asn1, "your-password");

    // Extract the certificate and key
    const bags = p12.getBags({ bagType: forge.pki.oids.certBag });
    const certBag = bags[forge.pki.oids.certBag][0];

    res.status(200).json({
      certificate: forge.pki.certificateToPem(certBag.cert),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
