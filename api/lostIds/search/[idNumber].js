import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { idNumber } = req.query;

  if (req.method === "GET") {
    try {
      const lostId = await prisma.lostId.findUnique({
        where: { idNumber },
      });

      if (lostId) {
        res.status(200).json({ found: true, location: lostId.location });
      } else {
        res.status(404).json({ found: false });
      }
    } catch (error) {
      console.error("Error searching for ID:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
