const app = require("./app");
const PORT = process.env.PORT || 5001;
const connectDB = require("./db/connect");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Listening on port: ${PORT}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
