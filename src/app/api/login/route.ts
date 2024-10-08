import { NextRequest, NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";
import crypto from "crypto";
import { mongoUrl } from "../../connections/db-connect";

const uri = mongoUrl();

export async function POST(req: Request) {
  const { username, password} : any = await req.json();

  try {
    const client = await MongoClient.connect(uri, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    const db = client.db("addershop");
    const collection = db.collection("users");
    const user = await collection
      .findOne({ username });
    
      console.warn(user);

    if (user == null) return NextResponse.json({status: "error", message: "Usuário informado não existe."});
    const cryptoPass = crypto.createHash('sha256').update(password).digest('hex');
    if (cryptoPass !== user.password) {
      return NextResponse.json({status: "error", message: "A senha informada é inválida."});
    }

    client.close();

    return NextResponse.json({status: "success", message: "Login efetuado com sucesso.", data: user});
  } catch (error) {
    console.error("Error fetching data from MongoDB:", error);
    return [];
  }
}
