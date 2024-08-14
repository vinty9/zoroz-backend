import crypto from "crypto"
export const generatedSignature = (
    razorpayOrderId,
    razorpayPaymentId
   ) => {
    const keySecret = "yVawj4Qw0zHx96URPFwG0YH1";
    if (!keySecret) {
     throw new Error(
      'Razorpay key secret is not defined in environment variables.'
     );
    }
    const sig = crypto
     .createHmac('sha256', keySecret)
     .update(razorpayOrderId + '|' + razorpayPaymentId)
     .digest('hex');
    return sig;
   };