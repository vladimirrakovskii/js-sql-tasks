import postgres from "postgres";

const config = {
  host: "127.0.0.1",
  user: "postgres",
  password: "",
  port: 5432,
};

// BEGIN (write your solution here)
const createTableWithData = async (data) => {
  const sql = postgres(config);
  const result = await sql`
    INSERT INTO articles ${sql(data)} RETURNING id 
  `;
  await sql.end()
  const ids = []
  result.forEach((row) => {
    ids.push(row.id);
  })
  return ids;
};
export default createTableWithData;
// END
