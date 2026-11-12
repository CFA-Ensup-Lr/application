import express from "express";
import "dotenv/config";
import { Mistral } from "@mistralai/mistralai";

const app = express();
app.use(express.json());
app.use(express.static("public"));

const apiKey = process.env.MISTRAL_API_KEY;
if (!apiKey) {
  console.error("MISTRAL_API_KEY manquante. Créez un fichier .env (voir .env.example).");
  process.exit(1);
}

const client = new Mistral({ apiKey });

app.post("/api/chat", async (req, res) => {
  try {
    const messages = Array.isArray(req.body?.messages) ? req.body.messages : [];
    if (messages.length === 0) {
      return res.status(400).json({ error: "messages requis" });
    }

    const sanitized = messages
      .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
      .slice(-20)
      .map((m) => ({ role: m.role, content: m.content }));

    const response = await client.chat.complete({
      model: "mistral-small-latest",
      messages: sanitized,
    });

    const reply = response.choices?.[0]?.message?.content ?? "";
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur lors de l'appel à l'API Mistral" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
