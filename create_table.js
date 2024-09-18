const lient  = require('pg');
const fs = require('fs');
require('dotenv').config();

const client = new lient.Client({
  host: process.env.POSTGRES_HOST,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  ssl : true,
  port: 5432,
});

async function exportData() {
  try {
    await client.connect();

    const result = await client.query('Create table users (user_id varchar (10), username varchar (50), password varchar (150), name varchar (50), role int, email varchar (50))');

    const rows = result.rows;
    console.log(rows);
  } catch (err) {
    console.error('Error saat mengekspor data:', err);
  } finally {
    await client.end();
  }
}

console.log({
    host: process.env.POSTGRES_HOST,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
});
exportData();
