import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://goel85749:Sidhu295@zozor.suk46dn.mongodb.net/products?retryWrites=true&w=majority&appName=zozor';

const couponSchema = new mongoose.Schema({
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    discount: { type: Number, required: true },
    discount_text: { type: String, required: true },
    startDate: { type: Date, required: true },
    expiryDate: { type: Date, required: true },
});

const Coupon = mongoose.model('Coupon', couponSchema);

const dummyCoupons = [
    {
        name: "Discount 100",
        code: "DISCOUNT100",
        discount: 100,
        discount_text: "Flat Rs. 100 Off on it",
        startDate: new Date("2024-08-01T00:00:00Z"),
        expiryDate: new Date("2024-08-31T23:59:59Z"),
    },
    {
        name: "Discount 150",
        code: "DISCOUNT150",
        discount: 150,
        discount_text: "Flat Rs. 150 Off",
        startDate: new Date("2024-08-01T00:00:00Z"),
        expiryDate: new Date("2024-08-31T23:59:59Z"),
    },
    {
        name: "Super Saver 200",
        code: "SUPER200",
        discount: 200,
        discount_text: "Flat Rs. 200 Off",
        startDate: new Date("2024-08-01T00:00:00Z"),
        expiryDate: new Date("2024-08-15T23:59:59Z"),
    },
    {
        name: "Mega Deal 250",
        code: "MEGA250",
        discount: 250,
        discount_text: "Flat Rs. 250 Off",
        startDate: new Date("2024-08-05T00:00:00Z"),
        expiryDate: new Date("2024-09-05T23:59:59Z"),
    },
    {
        name: "Holiday Special 300",
        code: "HOLIDAY300",
        discount: 300,
        discount_text: "Flat Rs. 300 Off",
        startDate: new Date("2024-08-10T00:00:00Z"),
        expiryDate: new Date("2024-09-10T23:59:59Z"),
    },
];

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log('Connected to MongoDB');
        
        // Insert the coupons into the database
        await Coupon.insertMany(dummyCoupons);
        console.log('Coupons inserted successfully');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB or inserting coupons:', err);
    })
    .finally(() => {
        mongoose.disconnect();
    });
