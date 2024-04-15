// utils/mongodb.js

import { MongoClient } from 'mongodb';

const uri =
  "mongodb+srv://augustogdev:GqdLwolCPKaVelhj@addershopcluster.wvnuxqu.mongodb.net/";

export async function fetchDataFromMongoDB() {
  try {
    const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = client.db('addershop');
    const collection = db.collection('users');
    const data = await collection.find({}).toArray();
    client.close();
    return data;
  } catch (error) {
    console.error('Error fetching data from MongoDB:', error);
    return [];
  }
}

export async function fetchDataForKeyboardsFromMongoDB() {
  try {
    const client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = client.db("addershop");
    const collection = db.collection("products");
    const data = await collection.find({}).toArray();
    client.close();
    return data;
  } catch (error) {
    console.error("Error fetching data from MongoDB:", error);
    return [];
  }
}
