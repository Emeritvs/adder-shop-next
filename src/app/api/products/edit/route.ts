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
    const data = await collection.findOneAndReplace(
      {
        _id: new ObjectId(id),
      },
      body);

    client.close();

    return NextResponse.json({ status: 'success', message: 'Item updated', data: data});
  } catch (error) {
    console.error("Error fetching data from MongoDB:", error);
    return NextResponse.json({
      status: "error",
      message: `Error fetching data from MongoDB: ${error}`,
    });
  }
}
