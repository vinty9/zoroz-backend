import fast2sms from "fast2sms";

export default async function sendOTP(phoneNumber, otp) {
  try {
    const response = await fetch(
      `https://www.fast2sms.com/dev/bulkV2?authorization=FPtDqYyJjRfleVo32rgGWhs91CzNEp5dXuI8ikS7ZMn6UacBLA6XE8iSQTJuWsA2eFqjkIg4vzwmUfBa&route=otp&variables_values=${otp}&numbers=${phoneNumber}&flash=0`,
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
    return res.status(500).json({
      success: false,
      statusCode: 500,
      msg: "Internal server error" + err,
    });
  }
}
