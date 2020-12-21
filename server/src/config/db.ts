import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb+srv://cluster0.sbkeb.mongodb.net/crowdankiweb", {
            user: "therealchrissoc",
            pass: "wzQSVCO0bP9rkIie",
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