import fs from "node:fs";
import path from "node:path";
import { createClient } from "@libsql/client";

// Prisma's native migration engine only understands `file:` SQLite URLs,
// not the remote libsql:// wire protocol Turso speaks — so migrations
// can't be applied with `prisma migrate deploy` against Turso. This
// script applies each migration.sql directly via the JS libSQL client
// instead, tracking what it already applied so it's safe to run on
// every deploy (e.g. wired into the platform's build command).

async function main() {
  const url = process.env.DATABASE_URL;
  const authToken = process.env.DATABASE_AUTH_TOKEN;

  if (!url || !url.startsWith("libsql:")) {
    console.log(
      "DATABASE_URL is not a libsql:// URL — skipping Turso schema sync (local dev uses `prisma migrate dev` instead).",
    );
    return;
  }

  const client = createClient({ url, authToken });

  await client.execute(
    `CREATE TABLE IF NOT EXISTS _qoqnus_migrations (
      name TEXT NOT NULL PRIMARY KEY,
      applied_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`,
  );

  const migrationsDir = path.join(process.cwd(), "prisma", "migrations");
  const migrations = fs
    .readdirSync(migrationsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();

  for (const migration of migrations) {
    const sqlPath = path.join(migrationsDir, migration, "migration.sql");
    if (!fs.existsSync(sqlPath)) continue;

    const applied = await client.execute({
      sql: "SELECT 1 FROM _qoqnus_migrations WHERE name = ?",
      args: [migration],
    });
    if (applied.rows.length > 0) {
      console.log(`Skipping ${migration} (already applied)`);
      continue;
    }

    console.log(`Applying ${migration}...`);
    const sql = fs.readFileSync(sqlPath, "utf8");
    await client.executeMultiple(sql);
    await client.execute({
      sql: "INSERT INTO _qoqnus_migrations (name) VALUES (?)",
      args: [migration],
    });
  }

  console.log("Done.");
  client.close();
}

main();
