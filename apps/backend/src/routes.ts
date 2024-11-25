import { express, Request, Response } from "@/deps.ts";
import { config } from "@/config/environment.ts";

export const router = express.Router();

router.get("/health", (_req: Request, res: Response) => {
  res.json({
    status: "healthy",
    version: config.version,
    timestamp: new Date().toISOString(),
  });
});
