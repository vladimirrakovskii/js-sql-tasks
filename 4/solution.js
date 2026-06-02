import postgres from "postgres";

const config = {
  host: "127.0.0.1",
  user: "postgres",
  password: "",
  port: 5432,
};

// BEGIN (write your solution here)
const transaction = async (user, roomNumber, price) => {
  const sql = postgres(config);
  try {
    return await sql.begin(async (sql) => {
      const [userInsertResult] = await sql`
        INSERT INTO users ${sql(user)} RETURNING id
      `;
      const userId = userInsertResult.id;

      const [roomSelectResult] = await sql`
        SELECT id FROM rooms WHERE room_number = ${roomNumber}
      `;
      const roomId = roomSelectResult.id;

      await sql`
        INSERT INTO orders (user_id, room_id, price) 
        VALUES (${userId}, ${roomId}, ${price})
      `;

      await sql`UPDATE rooms SET status = 'reserved' WHERE id = ${roomId}`;
    });
  } finally {
    await sql.end();
  }
};
export default transaction;
// END
