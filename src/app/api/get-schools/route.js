import pool from "@/lib/db";

export const GET = async () => {
  try {
    const [rows] = await pool.query(
      `SELECT id, name, address, city, image FROM schools ORDER BY id DESC`
    );

    const schoolsWithImage = rows.map(school => ({
      ...school,
      image: school.image || "/schoolImages/default.jpg"
    }));

    return new Response(JSON.stringify(schoolsWithImage), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
