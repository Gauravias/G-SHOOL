// lib/db.js
// Next.js (root level lib folder)

import mysql from 'mysql2/promise';

// डेटाबेस कनेक्शन फ़ंक्शन
export async function getConnection() {
  const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  });
  return connection;
}

// यह फ़ंक्शन MySQL से सभी डेटा फ़ेच करने और CRUD ऑपरेशन्स के लिए उपयोग होगा।
export async function query(sql, values = []) {
  let connection;
  try {
    connection = await getConnection();
    const [results] = await connection.execute(sql, values);
    return results;
  } catch (error) {
    console.error("Database Query Error:", error);
    throw error;
  } finally {
    if (connection) {
      connection.end(); // कनेक्शन बंद करना ज़रूरी है
    }
  }
}