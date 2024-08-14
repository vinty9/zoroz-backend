import otp from "../models/otp.js";
import vendor from "../models/vendor.js";
import { generateOTP } from "../services/genOTP.js";
import { getVendorInfo } from "../services/getVendorInfo.js";
import jwt from "jsonwebtoken";

const createToken = (_id) => {
  return jwt.sign({ _id: _id }, process.env.JWT_KEY, {
    expiresIn: "7d",
  });
};

export const postOTP = async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        msg: "Please enter your phone number",
      });
    }
    const genOTP = generateOTP(6); // Specify the length of OTP here
    const otpData = await fetch(
      `https://www.fast2sms.com/dev/bulkV2?authorization=FPtDqYyJjRfleVo32rgGWhs91CzNEp5dXuI8ikS7ZMn6UacBLA6XE8iSQTJuWsA2eFqjkIg4vzwmUfBa&route=otp&variables_values=${genOTP}&numbers=${phone}&flash=0`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (otpData) {
      const userOtp = new otp({
        phone: phone,
        loginOtp: genOTP,
      });

      await userOtp.save();
      return res.status(200).json({
        success: true,
        statusCode: 200,
        msg: "OTP sent successfully",
      });
    } else {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        msg: "OTP not sent",
      });
    }
  } catch (err) {
    console.error("Error during sending OTP:", err);
    return res.status(500).json({
      success: false,
      statusCode: 500,
      msg: "Internal server error" + err,
    });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { phone, loginOtp } = req.body;
    if (!phone || !otp) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        msg: "Please enter phone number and OTP",
      });
    }
    const otpData = await otp.findOne({ phone: phone, loginOtp: loginOtp });

    if (!otpData) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        msg: "Invalid OTP",
      });
    }

    const userData = await vendor.findOne({ phone: phone });
    if (!userData) {
      const newVendor = new vendor({
        name: "",
        email: "",
        phone: phone,
        address: "",
        city: "",
        state: "",
        pincode: 0,
        role: "vendor",
      });

      const isUserCreated = await newVendor.save();
      if (!isUserCreated) {
        return res.status(200).json({
          success: true,
          statusCode: 200,
          msg: "Problem" + isUserCreated,
          data: token,
        });
      }
      await otp.deleteOne({ phone: phone, loginOtp: loginOtp });
      const token = createToken(newVendor._id);
      const userDetails = await getVendorInfo(newVendor._id);
      if (userDetails) {
        res.redirect("http://localhost:3000/profile");
      }
      res.cookie("access_token", token, { httpOnly: true });

      return res
        .redirect("http://localhost:3000/profile")
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json({
          success: true,
          statusCode: 200,
          msg: "Vendor created successfully",
          data: token,
        });
    }
    await otp.deleteOne({ phone: phone, loginOtp: loginOtp });
    const token = createToken(userData._id);
    res.cookie("access_token", token, { httpOnly: true });
    return res.status(200).json({
      success: true,
      statusCode: 200,
      msg: "OTP verified successfully",
      vendor: userData,
      token: token,
    });
  } catch (err) {
    console.error("Error during verifying OTP:", err);
    return res.status(500).json({
      success: false,
      statusCode: 500,
      msg: "Internal server error" + err,
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("access_token");
    return res.status(200).json({
      success: true,
      statusCode: 200,
      msg: "Logged out successfully",
    });
  } catch (err) {
    console.error("Error during logout:", err);
    return res.status(500).json({
      success: false,
      statusCode: 500,
      msg: "Internal server error",
    });
  }
};

export const getVendor = async (req, res) => {
  try {
    const { id } = req.params;

    const userData = await vendor.findById(id);
    if (!userData) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        msg: "User does not exist",
      });
    }
    return res.status(200).json({
      success: true,
      statusCode: 200,
      msg: "User fetched successfully",
      data: userData,
    });
  } catch (err) {
    console.error("Error during fetching user:", err);
    return res.status(500).json({
      success: false,
      statusCode: 500,
      msg: "Internal server error",
    });
  }
};

export const updateVendor = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, address, city, state, pincode } = req.body;

    const userData = await vendor.findById(id);
    if (!userData) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        msg: "User does not exist",
      });
    }

    const updatedUser = await vendor.findByIdAndUpdate(id, {
      name: name,
      email: email,
      address: address,
      city: city,
      state: state,
      pincode: pincode,
    });

    if (!updatedUser) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        msg: "User not updated",
      });
    }

    return res.status(200).json({
      success: true,
      statusCode: 200,
      msg: "Vendor updated successfully",
      data: updatedUser,
    });
  } catch (err) {
    console.error("Error during updating Vendor:", err);
    return res.status(500).json({
      success: false,
      statusCode: 500,
      msg: "Internal server error",
    });
  }
};
