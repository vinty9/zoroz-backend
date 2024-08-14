import axios from "axios";
export const userOtp = async (req, res) => {
  try {
    const response = await fetch(
      `https://www.fast2sms.com/dev/bulkV2?authorization=FPtDqYyJjRfleVo32rgGWhs91CzNEp5dXuI8ikS7ZMn6UacBLA6XE8iSQTJuWsA2eFqjkIg4vzwmUfBa&route=otp&variables_values=123456&numbers=9831238917&flash=0`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.status(200).json({
      success: false,
      statusCode: 200,
      msg: response,
    });
  } catch (err) {
    console.error("Error during sending OTP:", err);
    return err;
  }
};
