const fs = require('fs');
const path = require('path');
const db = require('./connection');

const runSchema = async () => {
  try {
    const schemaPath = path.join(__dirname, 'schema.sql');
    const sql = fs.readFileSync(schemaPath, 'utf8');

    console.log('Applying schema to database...');
    
    // Execute the SQL file
    await db.query(sql);
    
    console.log('✅ Schema applied successfully!');
  } catch (error) {
    console.error('❌ Error applying schema:', error);
  } finally {
    process.exit(); // Exit process after finishing
  }
};

runSchema();
