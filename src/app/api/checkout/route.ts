import { NextRequest, NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";
import crypto from "crypto";
import { mongoUrl } from "../../connections/db-connect";
import https from 'https';
import path from 'path';
import fs from 'fs';

const uri = mongoUrl();

export async function POST(req: Request) {
  try {
    const auth = Buffer.from(
      `${process.env.EFI_H_CLIENT_ID}:${process.env.EFI_H_CLIENT_SECRET}`
    ).toString("base64");

    const certPath = path.join(process.cwd(), '../../../../.config/homologacao-583957-AdderShopQA.p12');
    const cert = fs.readFileSync(certPath);

    const agent = new https.Agent({
      pfx: cert,
      passphrase: ""//process.env.CERT_PASSPHRASE, // If your certificate requires a passphrase
    });

    const response = await fetch(
      `https://${process.env.EFI_H_PIX_API_URL}/oauth/token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${auth}`,
        },
        body: JSON.stringify({ grant_type: "client_credentials" }),
        // redirect: "follow",
        //httpsAgent: 
      }
    );
    
    if (response) {
      const data = await response.json();
      console.log(data);
    }

    return NextResponse.json({
      status: "success",
      message: "Login efetuado com sucesso.",
      data: {},
    });
  } catch (error) {
    console.error("Error fetching data from MongoDB:", error);
    return [];
  }
}
