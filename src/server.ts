import app from "./app";
import { prisma } from "./lib/prisma";
const port = process.env.PORT || 5000;

async function main() {
  try {
    await prisma.$connect();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (err: any) {
    await prisma.$disconnect();
    process.exit(1);
  }
}

main();
