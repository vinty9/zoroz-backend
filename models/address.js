import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email:{type:String,required:true},
  room: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  pin: { type: String, required: true },
  phone: { type: String, required: true },
});

const Address= mongoose.model('CheckoutPageAddressForm', addressSchema);
export default Address;
