import { NextRequest, NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";
import { useSearchParams } from "next/navigation";
import { NextApiRequest } from "next";

const uri =
  "mongodb+srv://augustogdev:GqdLwolCPKaVelhj@addershopcluster.wvnuxqu.mongodb.net/";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const id = body._id;
  delete body._id;

  try {
    const client = await MongoClient.connect(uri, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    const db = client.db("addershop");
    const collection = db.collection("products");

    let response = null;
    const product = await collection.findOne( {  name: body.name, }, body );

    if (product != null) {
      const data = await collection.findOneAndReplace(
        { name: body.name },
        body
      );

      response = data;
    }
    else {
      const data = await collection.insertOne(body);
      response = data;
    }

    client.close();

    return NextResponse.json({
      status: "success",
      message: "Item updated",
      data: response,
    });
  } catch (error) {
    console.error("Error fetching data from MongoDB:", error);
    return NextResponse.json({
      status: "error",
      message: `Error fetching data from MongoDB: ${error}`,
    });
  }
}
