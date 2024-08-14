export const getUserInfo = async (userId) => {
  try {
    const userData = await user.findById(userId);
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
