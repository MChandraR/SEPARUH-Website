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

    const result = await client.query('SELECT * FROM data');

    const rows = result.rows;
    console.log(rows);
  } catch (err) {
    console.error('Error saat mengekspor data:', err);
  } finally {
    await client.end();
  }
}

exportData();
