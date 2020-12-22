import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI!, {
            user: process.env.USERNAME,
            pass: process.env.PASSWORD,
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