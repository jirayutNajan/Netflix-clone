import User from "../model/user.model.js";

export const getAllUsersDebug = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({ success: true, users });
  } catch (error) {
    console.log("Error in debug route: ", error.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};