import bcrypt from "bcryptjs";

const password = process.argv[2];

if (!password) {
  console.error('Usage: npm run hash-password -- "your-plain-password"');
  process.exit(1);
}

const hash = bcrypt.hashSync(password, 12);

// bcrypt hashes contain `$`, which Next.js's .env loader treats as
// variable-expansion syntax (dotenv-expand) and silently corrupts.
// Base64-encoding it keeps it .env-safe; auth.ts decodes it back.
const encoded = Buffer.from(hash, "utf8").toString("base64");

console.log(encoded);
