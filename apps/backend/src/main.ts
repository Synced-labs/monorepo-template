import { express, cors } from "@/deps.ts";
import { initializeFirebase } from "@/config/firebase.ts";
import { router } from "@/routes/index.ts";
import { errorHandler, requestLogger } from "@/middleware/index.ts";
import { config } from "@/config/environment.ts";

const app = express();
initializeFirebase();

// Middleware
app.use(cors());
app.use(express.json());
app.use(requestLogger);

// API Routes
app.use('/api/v1', router);

// Error Handler
app.use(errorHandler);

// Health Check
app.get('/health', (_, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: config.version
  });
});

// Start server
app.listen(config.port, () => {
  console.log(`🚀 Server running on port ${config.port}`);
});