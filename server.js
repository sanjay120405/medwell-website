// Node backend for invoice OCR scanning.
// Holds NVIDIA_API_KEY server-side (from .env locally, or your host's
// environment variable dashboard in production) — the browser never sees it.
//
// Local run:  npm install && npm start
// Deploy:     push this repo to your host (Render/Railway/etc.), set
//             NVIDIA_API_KEY in its environment variable settings, set the
//             start command to "node server.js".

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json({ limit: '15mb' })); // invoice photos as base64 can be a few MB

const PORT = process.env.PORT || 3000;
const NVIDIA_API_KEY = process.env.NVIDIA_API_KEY;
const NVIDIA_URL = 'https://integrate.api.nvidia.com/v1/chat/completions';
const MODEL = 'meta/llama-3.2-90b-vision-instruct';

const EXTRACTION_PROMPT = `You are an invoice-scanning assistant. Look at the invoice image and extract everything visible into a single JSON object. Respond with ONLY valid JSON (no markdown fences, no commentary).

Guidelines:
- Include every header-level field you can actually read on THIS invoice as top-level snake_case keys (e.g. vendor, invoice_number, invoice_date, po_number, gstin, tax, discount, shipping, grand_total, payment_terms). Different invoices have different fields — only include what is genuinely present, do not invent fields that aren't on the invoice.
- Include an "items" array with one object per line item. Give each item whatever columns THIS invoice actually shows (e.g. description, quantity, unit_price, amount, batch_no, hsn_code, expiry, discount_pct). Line-item columns commonly differ between invoices — that's expected, keep them as they appear.
- Use plain numbers for quantities/amounts/rates (no currency symbols or thousands separators). Use YYYY-MM-DD for dates where the invoice makes that determinable.
- Output ONLY the JSON object, nothing else.`;

app.post('/api/scan-invoice', async (req, res) => {
  if (!NVIDIA_API_KEY) {
    return res.status(500).json({ error: 'Server not configured: NVIDIA_API_KEY is missing (check .env locally, or your host\'s env var settings in production)' });
  }

  const { image } = req.body || {};
  if (!image || typeof image !== 'string' || !image.startsWith('data:image/')) {
    return res.status(400).json({ error: "Missing or invalid 'image' field (expected a data: URI)" });
  }

  try {
    const nvRes = await fetch(NVIDIA_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${NVIDIA_API_KEY}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          {
            role: 'user',
            content: [
              { type: 'text', text: EXTRACTION_PROMPT },
              { type: 'image_url', image_url: { url: image } },
            ],
          },
        ],
        max_tokens: 1500,
        temperature: 0,
      }),
    });

    if (!nvRes.ok) {
      const errText = await nvRes.text();
      return res.status(502).json({ error: `NVIDIA API error (${nvRes.status}): ${errText}` });
    }

    const nvData = await nvRes.json();
    const raw = nvData?.choices?.[0]?.message?.content ?? '';
    const cleaned = raw.replace(/```json|```/g, '').trim();

    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch {
      return res.status(502).json({ error: 'Could not parse model output as JSON', raw });
    }

    res.json(parsed);
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

app.get('/', (req, res) => res.send('Medwell invoice-scan backend is running.'));

app.listen(PORT, () => console.log(`Invoice-scan backend listening on port ${PORT}`));
