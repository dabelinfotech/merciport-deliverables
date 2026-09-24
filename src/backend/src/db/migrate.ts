import pool from '../core/db';
import fs from 'fs';
import path from 'path';

async function migrate() {
  try {
    console.log('⏳ Running migrations...');
    const sqlPath = path.resolve(__dirname, 'migrations/001_initial_schema.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');
    await pool.query(sql);
    console.log('✅ Migrations applied successfully.');
  } catch (err) {
    console.error('❌ Migration failed:', err);
  } finally {
    await pool.end();
  }
}
migrate();
