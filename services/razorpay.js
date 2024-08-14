import Razorpay from "razorpay";

export const razorpay = () => {
  const razorpay = new Razorpay({
    key_id: "rzp_test_fq5x5RVk096MtS",
    key_secret: "yVawj4Qw0zHx96URPFwG0YH1",
  });
  return razorpay;
};
