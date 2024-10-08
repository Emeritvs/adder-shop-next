import { NextRequest, NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";
import crypto from "crypto";
import { useSearchParams } from "next/navigation";
import { mongoUrl } from "../../connections/db-connect";

const uri = mongoUrl();

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { _id, email, username, password, firstname, lastname }: any = body;
  delete body._id;
  delete body.password;

  const action = req.nextUrl.searchParams.get('action') ?? 'edit';

  try {
    const client = await MongoClient.connect(uri, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    const db = client.db("addershop");
    const collection = db.collection("users");

    if (action == "create") {
      const user = await collection.findOne({ username });
      if (user != null)
        return NextResponse.json({
          status: "error",
          message: "Usuário informado já existe",
        });
      const data: any = {
        email,
        username,
        password: crypto.createHash("sha256").update(password).digest("hex"),
        firstname,
        lastname,
      };
      const insertUser = await collection.insertOne(data);
      client.close();

      if (insertUser != null)
        return NextResponse.json({
          status: "success",
          message: "User created",
        });
    } else {

      const updateUser = await collection.findOneAndReplace(
        { _id: new ObjectId(_id) },
        body
      );
      client.close();

      if (updateUser != null)
        return NextResponse.json({
          status: "success",
          message: "User updated",
        });
    }

    client.close();

    return NextResponse.json({
      status: "success",
      message: "Conta criada com sucesso.",
      data: {},
    });
  } catch (error) {
    console.error("Error sending data from MongoDB:", error);
    return [];
  }
}
