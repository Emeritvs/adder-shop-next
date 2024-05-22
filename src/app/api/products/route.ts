import { NextRequest, NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";
import { useSearchParams } from "next/navigation";
import { NextApiRequest } from "next";

const uri =
  "mongodb+srv://augustogdev:GqdLwolCPKaVelhj@addershopcluster.wvnuxqu.mongodb.net/";

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const queryParams : any = {};
  
  params.forEach((value, key) => {
    if (key != 'id') return (queryParams[key] = { $regex: new RegExp(value, 'i') });
    else return queryParams[key] = value;
  });

  try {
    const client = await MongoClient.connect(uri, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    const db = client.db("addershop");
    const collection = db.collection("products");

    if (queryParams.id) {
      queryParams._id = new ObjectId(queryParams.id);
      delete queryParams.id;
    }

    if (queryParams.name) {
      queryParams.name = queryParams.name;
      console.log(queryParams.name);
    }

    const data = await collection.find(queryParams).toArray();

    client.close();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching data from MongoDB:", error);
    return [];
  }
}
