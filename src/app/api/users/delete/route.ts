import { NextRequest, NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";
import crypto from "crypto";
import { useSearchParams } from "next/navigation";
import { mongoUrl } from "../../../connections/db-connect";

const uri = mongoUrl();

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { _id, email, username, password, firstname, lastname }: any = body;

  try {
    const client = await MongoClient.connect(uri, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    const db = client.db("addershop");
    const collection = db.collection("users");

      const deleteUser = await collection.findOneAndDelete(
        { _id: new ObjectId(_id) },
        body
      );
      client.close();

      if (deleteUser != null)
        return NextResponse.json({
          status: "success",
          message: "User deleted",
        });
    

    client.close();

    return NextResponse.json({
      status: "success",
      message: "User deleted",
      data: deleteUser,
    });
  } catch (error) {
    console.error("Error deleting data from MongoDB:", error);
    return [];
  }
}
