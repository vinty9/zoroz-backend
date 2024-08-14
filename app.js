// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import dotenv from "dotenv";
// import { authRouter } from "./routes/authRouter.js";
// import fast2sms from "fast-two-sms";
// import { categoryRouter } from "./routes/categoryRouter.js";
// import { productRouter } from "./routes/productRouter.js";
// import { requireAuth } from "./middlewares/auth.js";
// import { cartRouter } from "./routes/cartRouter.js";
// import { otpRouter } from "./routes/otpRouter.js";
// import helmet from "helmet";
// import { orderRouter } from "./routes/orderRouter.js";
// import { vendorRouter } from "./routes/vendorRouter.js";
// import { bannerRouter } from "./routes/bannerRouter.js";


// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;
// const MONGODB_URI = process.env.MONGODB_URI;

// app.all("/", (req, res) => {
//   console.log("Just got a request!");
//   res.send("Request got by Zoroz .");
// });


// app.use(cors());
// app.use(express.json());

// app.use(
//   helmet({
//     referrerPolicy: {
//       policy: "strict-origin-when-cross-origin",
//     },
//   })
// );

// app.use((req, res, next) => {
//   res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
//   next();
// });

// // const mongooseUri = process.env.MONGO_URI || "default_fallback_uri";
// // const port = process.env.PORT || 5000;
// // mongoose
// //   .connect(mongooseUri, {
// //     ssl: true,
// //     minPoolSize: 1,
// //     maxPoolSize: 1,
// //   })
// //   .then(() => {
// //     app.listen(process.env.PORT || 5000, () => {
// //       console.log("Your Server is running" + " " + port);
// //     });
// //   })
// //   .catch((error) => {
// //     console.log("Error connecting to MongoDB:", error);
// //   });


// app.use("/auth", authRouter);
// app.use("/otp", otpRouter);
// app.use("/products", productRouter);

// app.use("/categories", categoryRouter);
// app.use("/carts", cartRouter);
// app.use("/orders", orderRouter);
// app.use("/vendor", vendorRouter);
// app.use("/banner", bannerRouter);

// // app.post("/send", async (req, res) => {
// //   const response = await fast2sms.sendMessage({
// //     authorization: process.env.FAST2SMS_API_KEY,
// //     message: "This is a test message",
// //     numbers: ["8337045160"],
// //   });
// //   console.log(response);
// //   return res.send(response);
// // });


import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import productRoutes from './routes/productRoutes.js'; 
import addressRoutes from './routes/addressRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import reviewRoutes2 from './routes/reviewRoutes2.js'; 
import orderRoutes from './routes/orders.js';
import { categoryRouter } from "./routes/categoryRouter.js";
import { couponRouter } from "./routes/couponRouter.js";

dotenv.config();

const app = express();
const PORT = 8080;
const MONGODB = "mongodb+srv://goel85749:Sidhu295@zozor.suk46dn.mongodb.net/products?retryWrites=true&w=majority&appName=zozor"


// const corsOptions = {
//     origin: 'https://zozorfrontend.netlify.app',
//     optionsSuccessStatus: 200
//   };

// app.use(cors({
//     origin: 'http://localhost:3000', // Update this to your frontend URL if deployed
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//   }));

app.use(cors());
  app.use(express.json());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(MONGODB).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
});

app.use('/products',productRoutes); 
app.use('/address', addressRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/reviews', reviewRoutes2);
app.use('/api', orderRoutes);
app.use("/categories", categoryRouter);
app.use("/", couponRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});