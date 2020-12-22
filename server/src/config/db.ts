import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI!, {
            user: process.env.MONGO_USERNAME,
            pass: process.env.MONGO_PASSWORD,
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        })

        console.log(`MongoDB connected at ${conn.connection.host}`)
    } catch (err) {
        console.log(`Error: ${err.message}`);
        process.exit(1);
    }
}