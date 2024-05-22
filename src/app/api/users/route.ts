import { NextRequest, NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";
import { useSearchParams } from "next/navigation";
import { NextApiRequest } from "next";

const uri =
  "mongodb+srv://augustogdev:GqdLwolCPKaVelhj@addershopcluster.wvnuxqu.mongodb.net/";

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const queryParams: any = {};

  params.forEach((value, key) => (queryParams[key] = value));

  try {
    const client = await MongoClient.connect(uri, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    const db = client.db("addershop");
    const collection = db.collection("users");

    if (queryParams.id) {
      queryParams._id = new ObjectId(queryParams.id);
      delete queryParams.id;
    }

    const data = await collection.find(queryParams).toArray();

    client.close();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching data from MongoDB:", error);
    return [];
  }
}
