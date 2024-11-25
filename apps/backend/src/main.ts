import { express, cors } from "@/deps.ts";
import { initializeFirebase } from "@/config/firebase.ts";
import { config } from "@/config/environment.ts";
import { router } from "@/routes.ts";

const app = express();
initializeFirebase();

app.use(cors());
app.use(express.json());
app.use("/api/v1", router);

app.listen(config.port, () => {
  console.log(`🚀 Server running on port ${config.port}`);
});
