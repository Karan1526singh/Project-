// /scripts/migrateUsers.js
import dbConnect from "@/utils/dbConnect";
import User from "@/models/user";

(async () => {
  await dbConnect();

  try {
    const users = await User.find({});
    for (let user of users) {
      // Add New field here
      user.tag = user.tag || ""; 
      await user.save();
    }
    console.log("Migration completed successfully.");
  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    process.exit();
  }
})();
