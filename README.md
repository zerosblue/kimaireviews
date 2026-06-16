# KimAI Reviews

> Honest AI tool reviews — kimaireviews.com

Next.js 15 blog with MDX content and an Anthropic-powered auto-generation pipeline.

---

## Project Structure

```
kimaireviews/
├── app/                    ← Next.js App Router pages
│   ├── layout.tsx
│   ├── page.tsx            ← Home
│   ├── about/page.tsx
│   ├── privacy/page.tsx
│   ├── category/[slug]/
│   └── reviews/[slug]/
├── components/             ← Reusable UI components
├── lib/reviews.ts          ← MDX file reader
├── posts/                  ← MDX review files (git-tracked)
├── logs/                   ← Auto-generated logs (gitignored)
├── generate.py             ← One-off review generator
├── scheduler.py            ← Daily scheduler (called by launchd)
├── prompts.py              ← Claude API prompt templates
├── topics.txt              ← Ordered topic queue
├── .env                    ← API keys (gitignored)
├── .env.example
├── requirements.txt
└── vercel.json
```

---

## Quick Start

### 1. Install Node dependencies

```bash
npm install
npm run dev
# → http://localhost:3000
```

### 2. Install Python dependencies

```bash
pip install -r requirements.txt
```

### 3. Set up environment variables

```bash
cp .env.example .env
# Edit .env and fill in your keys
```

Required:
- `ANTHROPIC_API_KEY` — get at console.anthropic.com
- `GITHUB_TOKEN` — Personal Access Token with `repo` scope
- `GMAIL_USER` + `GMAIL_APP_PASSWORD` — for email notifications

---

## Generating a Review

### One-off (manual)

```bash
python generate.py --tool "Cursor"
python generate.py --tool "Notion AI" --category "Productivity"
python generate.py --tool "Runway" --no-push   # generate without git push
```

The script:
1. Calls Claude (claude-opus-4-7) with your prompt template
2. Saves the MDX to `posts/{tool-name}-review.mdx`
3. `git add`, `git commit`, `git push` → triggers Vercel auto-deploy
4. Sends email notification to `NOTIFY_EMAIL`

### Scheduled (automatic, 2x daily)

See [Scheduler Setup](#scheduler-setup) below.

---

## Writing Reviews Manually

Create `posts/your-tool-review.mdx` with this frontmatter:

```yaml
---
title: "Tool Name Review 2026: Is It Worth It?"
description: "150-char meta description"
date: "2026-06-16"
category: "Writing"          # Writing | Coding | Image | Productivity | Video
rating: 4.5
pros:
  - "Specific pro"
cons:
  - "Specific con"
affiliateUrl: "https://tool.com"
affiliateText: "Try Tool Free"
toolWebsite: "https://tool.com"
pricingModel: "Freemium — from $20/mo"
featured: false
---

## Your content here
```

---

## Scheduler Setup

The scheduler runs `scheduler.py` twice daily via macOS launchd.

### Install

```bash
bash install_scheduler.sh
```

This copies the two plist files to `~/Library/LaunchAgents/` and loads them.

**Schedule:**
- 14:00 KST — generates 1 review
- 20:00 KST — generates 1 review

### Topic Queue

Topics are read from `topics.txt` top-to-bottom. Completed topics are tracked in `.used_topics.txt`.

```
# topics.txt
Cursor
GitHub Copilot
Notion AI
...
```

If `topics.txt` doesn't exist, the scheduler selects randomly from a built-in list of 40+ popular AI tools.

### Test the scheduler manually

```bash
python scheduler.py
```

### View logs

```bash
ls logs/
cat logs/2026-06-16.log
```

### Uninstall

```bash
bash uninstall_scheduler.sh
```

---

## Vercel Deployment

### Option A — Automatic via GitHub (recommended)

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → **Add New Project**
3. Import your GitHub repo
4. Framework: **Next.js** (auto-detected)
5. Click **Deploy**

Every `git push` to `main` triggers a production deployment automatically.

### Option B — Vercel CLI

```bash
npm i -g vercel
vercel --prod
```

### GitHub Actions Setup

Add these secrets to your GitHub repo (`Settings → Secrets`):

| Secret | Where to get it |
|--------|----------------|
| `VERCEL_TOKEN` | vercel.com → Account Settings → Tokens |
| `VERCEL_ORG_ID` | `.vercel/project.json` after `vercel link` |
| `VERCEL_PROJECT_ID` | `.vercel/project.json` after `vercel link` |

```bash
vercel link   # creates .vercel/project.json with IDs
```

---

## Domain Setup: Vercel + Namecheap

### Step 1 — Add domain on Vercel

1. Go to your project → **Settings → Domains**
2. Enter `kimaireviews.com` and click **Add**
3. Vercel shows you DNS records to add

### Step 2 — Configure Namecheap DNS

1. Log in to Namecheap → **Domain List** → **Manage** → **Advanced DNS**
2. Delete any existing A or CNAME records for `@` and `www`
3. Add these records:

| Type | Host | Value | TTL |
|------|------|-------|-----|
| `A` | `@` | `76.76.21.21` | Automatic |
| `CNAME` | `www` | `cname.vercel-dns.com` | Automatic |

4. Click the green checkmark to save each record

### Step 3 — Wait for propagation

DNS changes take 5–60 minutes. Vercel's domain dashboard shows a green ✓ when verified.

### Step 4 — Enable HTTPS

Vercel provisions an SSL certificate automatically once DNS is verified. No action needed.

---

## AdSense Setup

When your AdSense account is approved:

1. Open `app/layout.tsx`
2. Uncomment the `<AdSense>` line and add your publisher ID:
   ```tsx
   <AdSense publisherId="ca-pub-XXXXXXXXXXXXXXXX" />
   ```
3. Replace ad placeholder divs in pages with `<AdUnit slot="YOUR_SLOT_ID" />`
4. Import `AdUnit` from `@/components/AdSense`

---

## Affiliate Link Component

```tsx
import AffiliateButton from '@/components/AffiliateButton'

<AffiliateButton
  href="https://tool.com/signup"
  text="Try It Free"
  toolName="ToolName"
/>
```

The component fires a `gtag` affiliate_click event automatically when GA4 is configured.

---

## License

MIT — see `LICENSE`
