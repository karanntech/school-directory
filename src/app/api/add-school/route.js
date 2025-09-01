import pool from "@/lib/db";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export const POST = async (req) => {
  try {
    // Parse incoming multipart/form-data
    const formData = await req.formData();
    const name = formData.get("name");
    const address = formData.get("address");
    const city = formData.get("city");
    const state = formData.get("state");
    const contact = formData.get("contact");
    const email_id = formData.get("email_id");
    const imageFile = formData.get("image");

    // Validate required fields
    if (!name || !address || !city || !state || !contact || !email_id) {
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        { status: 400 }
      );
    }

    let imagePath = null;

    if (imageFile && imageFile.size > 0) {
      // User uploaded an image
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const fileName = `${uuidv4()}-${imageFile.name}`;
      const uploadDir = path.join(process.cwd(), "public", "schoolImages");

      // Ensure folder exists
      if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

      // Save file
      await fs.promises.writeFile(path.join(uploadDir, fileName), buffer);
      imagePath = `/schoolImages/${fileName}`;
    } else {
      // No image uploaded → use default
      imagePath = `/schoolImages/default.jpg`;
    }

    // Insert into database
    const [result] = await pool.query(
      "INSERT INTO schools (name, address, city, state, contact, email_id, image) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, address, city, state, contact, email_id, imagePath]
    );

    // Return success response
    return new Response(
      JSON.stringify({ success: true, id: result.insertId }),
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500 }
    );
  }
};
