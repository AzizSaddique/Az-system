# Portfolio Backend (Phase 1, 2 & 4B)

Modular, production-ready Node.js + Express + TypeScript backend application built using native ES modules.

---

## 🏗️ Architecture & Features

- **Runtime & Language**: Node.js + TypeScript with ES module resolution (`NodeNext`).
- **Security Headers**: [Helmet](https://helmetjs.github.io/) configured for secure HTTP headers.
- **CORS Protection**: Environment-driven allowlist (defaults to `http://localhost:3000` for the React/Vite frontend).
- **Rate Limiting**:
  - Global IP rate limiter: 100 requests per 15 minutes per IP (1000 in dev).
  - Dedicated Contact Form rate limiter: 5 submissions per 15 minutes per IP (60 in dev).
  - Dedicated AI Chat Assistant rate limiter: 15 queries per 15 minutes per IP (60 in dev).
- **Body Parsing**: JSON body parsing strictly limited to 10 KB to prevent payload abuse.
- **Centralized Error Handling**: Safe error handling avoiding stack trace or secret leakage to the client.
- **Validation**: Schema-validated environment configuration and request payloads using [Zod](https://zod.dev/).
- **Email Service**: Official [Resend Node.js SDK](https://resend.com) integration with HTML escaping, plain-text fallback, and honeypot spam protection.
- **AI Portfolio Assistant**: Official `@google/genai` integration with Google Gemini (`gemini-2.5-flash`), grounded with verified portfolio knowledge, prompt injection defense, and 500-token response budgeting.

---

## 📁 Directory Structure

```text
server/
├── .env.example              # Environment template with placeholders
├── .env                      # Local environment config (git-ignored)
├── package.json              # Standalone backend package definition
├── tsconfig.json             # TypeScript NodeNext configuration
├── dist/                     # Compiled JavaScript output (git-ignored)
└── src/
    ├── config/
    │   └── env.ts            # Zod-validated environment config
    ├── controllers/
    │   ├── contactController.ts # Contact form submission controller
    │   └── chatController.ts    # AI chat submission controller
    ├── middleware/
    │   ├── cors.ts           # CORS policy & allowed origin check
    │   ├── rateLimit.ts      # Global, contact & chat rate limiters
    │   └── errorHandler.ts   # 404 & Centralized error handler
    ├── routes/
    │   ├── health.ts         # Health check route (GET /api/health)
    │   ├── contact.ts        # Contact form route (POST /api/contact)
    │   └── chat.ts           # AI Assistant chat route (POST /api/chat)
    ├── services/
    │   ├── emailService.ts   # Resend email notification service
    │   ├── turnstileService.ts # Cloudflare Turnstile token verification
    │   ├── aiKnowledge.ts    # Verified portfolio facts & grounding instructions
    │   └── aiService.ts      # Gemini client wrapper & error mapping
    ├── validators/
    │   ├── contactValidator.ts # Zod schema for contact form
    │   └── chatValidator.ts    # Zod schema for chat messages & history
    ├── tests/
    │   ├── contact.test.ts   # Contact API test suite
    │   └── chat.test.ts      # Mocked Gemini AI test suite
    ├── app.ts                # Express application setup
    └── index.ts              # Server entrypoint & graceful shutdown
```

---

## 🚀 Setup & Getting Started

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### 2. Install Dependencies
From the repository root:
```bash
cd server
npm install
```

### 3. Environment Variables
Copy `.env.example` to `.env` (if not already present):
```bash
cp .env.example .env
```

Configuration in `.env`:
```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000

# Resend Email Integration
RESEND_API_KEY=re_your_api_key_here
CONTACT_TO_EMAIL=azizsaddiquesaddique@gmail.com
CONTACT_FROM_EMAIL=Portfolio Contact <onboarding@resend.dev>

# Google Gemini AI Integration
# Obtain an API key from https://aistudio.google.com/
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-2.5-flash

# Optional Rate Limiting Overrides (Only effective in development/test)
# DEV_CONTACT_RATE_LIMIT=60
# DEV_CHAT_RATE_LIMIT=60
```

---

## 🛠️ Available Scripts

Run these scripts from within the `server/` directory:

| Command | Description |
|---|---|
| `npm run dev` | Starts development server with hot-reloading via `tsx watch` |
| `npm run typecheck` | Validates TypeScript types without emitting files (`tsc --noEmit`) |
| `npm run build` | Compiles TypeScript source to production JavaScript in `dist/` |
| `npm start` | Runs the compiled production server (`node dist/index.js`) |
| `npm test` | Executes both Contact and Chat automated test suites |

---

## 🩺 Endpoints

### 1. Health Check
- **Route**: `GET /api/health`
- **Response**:
  ```json
  {
    "status": "ok",
    "uptime": 24,
    "timestamp": "2026-10-11T10:07:11.458Z"
  }
  ```

### 2. Contact Notification
- **Route**: `POST /api/contact`
- **Rate Limit**: Max 5 requests per 15 minutes per IP (60 in dev)
- **Payload Schema**:
  ```json
  {
    "name": "Dr. Alex Mercer",
    "email": "alex@organization.com",
    "scope": "fullstack",
    "message": "Technical inquiry text up to 800 characters...",
    "nda": true,
    "_honeypot": "",
    "turnstileToken": "0.valid_cf_turnstile_token..."
  }
  ```
- **Allowed Scopes**: `fullstack`, `iot`, `career`, `robotics`, `general`
- **Successful Response**:
  ```json
  {
    "status": "ok",
    "message": "Transmission confirmed. Your message has been routed to engineering dispatch."
  }
  ```
- **Validation Failure Response (HTTP 400)**:
  ```json
  {
    "status": "error",
    "message": "Validation failed. Please verify your submission details.",
    "errors": {
      "email": ["Please provide a valid email address"]
    }
  }
  ```
- **Spam & Bot Defense**:
  - **Cloudflare Turnstile**: Requires valid single-use managed token verified server-side against Cloudflare Siteverify before emails are sent. Missing, expired, duplicate, or invalid tokens are rejected with HTTP 400.
  - **Honeypot Trap**: If the hidden `_honeypot` field contains any text (bot trap), the server silently responds with HTTP 200 without dispatching an email.

### 3. AI Portfolio Assistant
- **Route**: `POST /api/chat`
- **Rate Limit**: Max 15 requests per 15 minutes per IP (60 in dev)
- **Payload Schema**:
  ```json
  {
    "message": "What is Muhammad Aziz Saddique's flagship hardware project?",
    "history": [
      { "role": "user", "text": "Hello" },
      { "role": "model", "text": "Greetings! How can I assist you with Aziz's portfolio?" }
    ]
  }
  ```
- **Limits**:
  - `message`: 1–500 characters
  - `history`: Max 10 messages, each restricted to `user` or `model` roles and capped at 1,000 characters
- **Successful Response (HTTP 200)**:
  ```json
  {
    "status": "ok",
    "reply": "Muhammad Aziz Saddique engineered EcoPlugify, an intelligent IoT energy monitoring and control socket featuring an ESP32 microcontroller and PZEM-004T transducer..."
  }
  ```
- **Service Unconfigured (HTTP 503)**:
  When `GEMINI_API_KEY` is not configured, returns a friendly non-technical status code and fallback message directing users to the contact form or email.
- **Rate Limited (HTTP 429)**:
  Returns HTTP 429 when client IP limit or upstream Gemini quota is reached.
- **Validation Error (HTTP 400)**:
  Returns field-specific errors if `message` or `history` violates schema constraints.

---

## 🔒 Security & Privacy Directives

1. **Server-Side API Keys**:
   - `GEMINI_API_KEY` is kept strictly server-side in the git-ignored `.env` file and is never sent to the browser.
2. **Strict Grounding**:
   - The AI Assistant is explicitly grounded on verified facts from `src/data/portfolioData.ts`. It will not fabricate unverified credentials, dates, or claims.
3. **Prompt Injection Defense**:
   - Client-provided conversation histories are treated as untrusted dialogue turns. The assistant strictly resists attempts to override system instructions or reveal prompts.
4. **Zero Sensitive Logging**:
   - The server never logs API keys, prompt secrets, or complete conversation histories to stdout or files.

---

## 🧪 Testing

Run the full automated test suite:
```bash
npm test
```
The test suite verifies:
- **Contact API Suite**: Validation rules, boundary limits (800 chars), HTML escaping, honeypot suppression, rate limit headers, and 503 fallback.
- **Chat API Suite**: 1–500 char message validation, 10-item history limits, role validation, mocked Gemini invocation (tokens: 500, temp: 0.3), upstream 429 handling, and secret redaction.

