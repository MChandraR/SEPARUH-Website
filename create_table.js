const  lient  = require('pg');
const fs = require('fs');

const client = new lient.Client({
  host: 'ep-quiet-silence-a1tz2so7-pooler.ap-southeast-1.aws.neon.tech',
  user: 'default',
  password: 'AUbxp1CeSN4u',
  database: 'verceldb',
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

exportData();
