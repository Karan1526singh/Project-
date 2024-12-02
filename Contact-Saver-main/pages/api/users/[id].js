// /pages/api/users/[id].js
import User from "@/models/user";
import dbConnect from "@/utils/dbConnect";

export default async function handler(req, res) {
  await dbConnect();

  const { method, body, query } = req;
  const { id } = query;

  switch (method) {
    case "GET":
      try {
        const user = await User.findById(id);
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(user);
      } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ error: "Internal server error" });
      }
      break;

    case "PUT":
      try {
        const { name, phone, city, tag } = body;
        const updatedUser = await User.findByIdAndUpdate(
          id,
          { name, phone, city, tag},
          { new: true } // Return the updated document
        );
        if (!updatedUser) {
          return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(updatedUser);
      } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ error: "Internal server error" });
      }
      break;

    case "DELETE":
      try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
          return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
      } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ error: "Internal server error" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).json({ error: `Method ${method} Not Allowed` });
      break;
  }
}
