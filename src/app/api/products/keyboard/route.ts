import { NextRequest, NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

const uri =
  "mongodb+srv://augustogdev:GqdLwolCPKaVelhj@addershopcluster.wvnuxqu.mongodb.net/";

export async function GET(req : Request) {
  console.error(req);
  
  try {
    const client = await MongoClient.connect(uri, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    const db = client.db("addershop");
    const collection = db.collection("products");
    const data = await collection
      .find({ _id: new ObjectId("66159cdc04ce80030def1e0e") })
      .toArray();
    client.close();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching data from MongoDB:", error);
    return [];
  }
}
