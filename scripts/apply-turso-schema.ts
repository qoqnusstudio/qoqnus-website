import fs from "node:fs";
import path from "node:path";
import { createClient } from "@libsql/client";

// Prisma's native migration engine only understands `file:` SQLite URLs,
// not the remote libsql:// wire protocol Turso speaks — so migrations
// can't be applied with `prisma migrate deploy` against Turso. This
// script applies each migration.sql directly via the JS libSQL client.

const url = process.env.DATABASE_URL;
const authToken = process.env.DATABASE_AUTH_TOKEN;

if (!url || !url.startsWith("libsql:")) {
  console.error(
    'Usage: DATABASE_URL="libsql://..." DATABASE_AUTH_TOKEN="..." npm run db:turso:migrate',
  );
  process.exit(1);
}

const client = createClient({ url, authToken });
const migrationsDir = path.join(process.cwd(), "prisma", "migrations");

const migrations = fs
  .readdirSync(migrationsDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();

for (const migration of migrations) {
  const sqlPath = path.join(migrationsDir, migration, "migration.sql");
  if (!fs.existsSync(sqlPath)) continue;

  console.log(`Applying ${migration}...`);
  const sql = fs.readFileSync(sqlPath, "utf8");
  await client.executeMultiple(sql);
}

console.log("Done.");
client.close();
