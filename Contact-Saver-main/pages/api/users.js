import User from "@/models/user";
import dbConnect from "@/utils/dbConnect";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const users = await User.find({});
      res.status(200).json(users);
    } catch (error) {
      console.error("Error fetching users:", error); // Detailed logging
      res.status(500).json({ error: "Internal server error" });
    }
  } else if (req.method === "POST") {
    try {
      const { name, phone, city, tag } = req.body;

      // Create new user object
      const newUser = new User({
        name,
        phone,
        city,
        tag,
      });
      console.log(newUser);

      // Save user to database
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (error) {
      console.error("Error saving user:", error); // Detailed logging
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
