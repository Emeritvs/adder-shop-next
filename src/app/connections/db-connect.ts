// Import MongoClient from the MongoDB driver
const { MongoClient } = require("mongodb");

// MongoDB connection URI (replace with your actual connection string)
const uri = "mongodb+srv://augustogdev:GqdLwolCPKaVelhj@addershopcluster.wvnuxqu.mongodb.net/";

// Function to connect to MongoDB
async function connectToDatabase() {
  try {
    // Connect to MongoDB
    const client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Access your MongoDB database and collection
    const db = client.db("addershop");
    const collection = db.collection("users");

    // Example: Query documents from the collection
    const documents = await collection.find({}).toArray();
    console.log(documents);

    // Close the MongoDB connection when done
    client.close();
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

// Call the connectToDatabase function
connectToDatabase();
