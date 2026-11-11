
const mysql = require('mysql2/promise');
require('dotenv').config();

const tables = ['users', 'menu', 'orders', 'order_items'];

async function migrate() {
  let localDB;
  let tidbDB;

  try {
    // Connect to your existing local MySQL database
    localDB = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT || 3306),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });

    console.log('Local MySQL connected.');

    // Connect to TiDB Cloud
    tidbDB = await mysql.createConnection({
      host: process.env.TIDB_HOST,
      port: Number(process.env.TIDB_PORT || 4000),
      user: process.env.TIDB_USER,
      password: process.env.TIDB_PASSWORD,
      database: process.env.TIDB_DATABASE,
      ssl: { minVersion: 'TLSv1.2' }
    });

    console.log('TiDB connected.');

    await tidbDB.beginTransaction();

    for (const table of tables) {
      const [rows] = await localDB.query(`SELECT * FROM \`${table}\``);

      if (rows.length === 0) {
        console.log(`${table}: No records to copy.`);
        continue;
      }

      const columns = Object.keys(rows[0]);
      const columnNames = columns.map(col => `\`${col}\``).join(', ');
      const placeholders = columns.map(() => '?').join(', ');

      const sql = `INSERT INTO \`${table}\` (${columnNames}) VALUES (${placeholders})`;

      for (const row of rows) {
        await tidbDB.execute(
          sql,
          columns.map(col => row[col])
        );
      }

      console.log(`${table}: ${rows.length} records copied.`);
    }

    await tidbDB.commit();

    console.log('Migration completed successfully!');

  } catch (error) {
    if (tidbDB) {
      await tidbDB.rollback();
    }

    console.error('Migration failed:', error.message);

  } finally {
    if (localDB) await localDB.end();
    if (tidbDB) await tidbDB.end();
  }
}

migrate();
