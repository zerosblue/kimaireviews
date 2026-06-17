"""
Review prompt templates for kimaireviews.com auto-generation pipeline.
"""

REVIEW_SYSTEM_PROMPT = """\
You are a professional AI tools reviewer and tech writer for kimaireviews.com.

ABOUT THE REVIEWER:
Korean solo developer based in Seoul. 18+ years in CRM/Sales Ops.
Daily Claude user. Tests AI tools for real productivity gains.
Motto: "Honest reviews of AI tools developers actually use."

WRITING STYLE:
- Honest, direct, no fluff
- Developer-friendly tone
- Real use cases, not marketing speak
- Mention Claude as the reviewer's primary tool when relevant for comparison
- Use "I" voice — first-person, personal experience

SEO REQUIREMENTS:
- Target word count: 1,500–2,000 words
- Include target keyword (tool name + "review") naturally 8-10 times
- 5 LSI (related) keywords woven in naturally

OUTPUT: Valid MDX format only. No markdown fences around the output.
"""

REVIEW_USER_PROMPT = """\
Write a detailed, honest review of {tool_name} for kimaireviews.com.

CATEGORY: {category}
AFFILIATE URL: {affiliate_url}

ARTICLE STRUCTURE (follow exactly):
1. Frontmatter (YAML, see format below)
2. ## Quick Verdict (3 sentences max)
3. ## What is {tool_name}?
4. ## Key Features (bullet list)
5. ## Hands-On Experience (most important — be specific, use personal anecdotes)
6. ## Pricing Breakdown (markdown table)
7. ## Who Should Use {tool_name}?
8. ## Alternatives to Consider
9. ## Final Rating: X.X / 5
10. ---
11. ## FAQ (4 questions with answers)

FRONTMATTER FORMAT:
---
title: "{tool_name} Review 2026: [Compelling subtitle]"
description: "[150 chars max — include tool name and key benefit]"
date: "{date}"
category: "{category}"
rating: [number 1.0–5.0]
pros:
  - "[specific pro]"
  - "[specific pro]"
  - "[specific pro]"
  - "[specific pro]"
cons:
  - "[specific con]"
  - "[specific con]"
  - "[specific con]"
affiliateUrl: "{affiliate_url}"
affiliateText: "Try {tool_name}"
toolWebsite: "{tool_website}"
pricingModel: "[e.g. Freemium — from $X/mo]"
featured: false
---

IMPORTANT RULES:
- The rating in frontmatter must match "Final Rating" section
- Pros and cons must be specific and verifiable, not generic
- Pricing table must use realistic, current prices
- Do NOT use excessive superlatives ("game-changing", "revolutionary") — be measured
- End with the AffiliateButton component:
  <AffiliateButton href="{affiliate_url}" text="Try {tool_name}" />
"""

CATEGORY_MAP = {
    "writing": "Writing",
    "coding": "Coding",
    "code": "Coding",
    "image": "Image",
    "images": "Image",
    "productivity": "Productivity",
    "video": "Video",
}

TOOL_DEFAULTS = {
    # ── Writing ──────────────────────────────────────────────
    "Jasper AI":        {"category": "Writing", "affiliate_url": "https://jasper.ai", "tool_website": "https://jasper.ai"},
    "Jasper":           {"category": "Writing", "affiliate_url": "https://jasper.ai", "tool_website": "https://jasper.ai"},
    "Copy.ai":          {"category": "Writing", "affiliate_url": "https://copy.ai", "tool_website": "https://copy.ai"},
    "Writesonic":       {"category": "Writing", "affiliate_url": "https://writesonic.com", "tool_website": "https://writesonic.com"},
    "Rytr":             {"category": "Writing", "affiliate_url": "https://rytr.me", "tool_website": "https://rytr.me"},
    "Anyword":          {"category": "Writing", "affiliate_url": "https://anyword.com", "tool_website": "https://anyword.com"},
    "Sudowrite":        {"category": "Writing", "affiliate_url": "https://sudowrite.com", "tool_website": "https://sudowrite.com"},
    "NovelAI":          {"category": "Writing", "affiliate_url": "https://novelai.net", "tool_website": "https://novelai.net"},
    "ProWritingAid":    {"category": "Writing", "affiliate_url": "https://prowritingaid.com", "tool_website": "https://prowritingaid.com"},
    "Hemingway Editor": {"category": "Writing", "affiliate_url": "https://hemingwayapp.com", "tool_website": "https://hemingwayapp.com"},
    "Wordtune":         {"category": "Writing", "affiliate_url": "https://wordtune.com", "tool_website": "https://wordtune.com"},
    "QuillBot":         {"category": "Writing", "affiliate_url": "https://quillbot.com", "tool_website": "https://quillbot.com"},
    "Scrivener":        {"category": "Writing", "affiliate_url": "https://literatureandlatte.com/scrivener", "tool_website": "https://literatureandlatte.com"},

    # ── Coding ───────────────────────────────────────────────
    "Cursor":               {"category": "Coding", "affiliate_url": "https://cursor.com", "tool_website": "https://cursor.com"},
    "GitHub Copilot":       {"category": "Coding", "affiliate_url": "https://github.com/features/copilot", "tool_website": "https://github.com/features/copilot"},
    "Windsurf":             {"category": "Coding", "affiliate_url": "https://codeium.com/windsurf", "tool_website": "https://codeium.com/windsurf"},
    "Codeium":              {"category": "Coding", "affiliate_url": "https://codeium.com", "tool_website": "https://codeium.com"},
    "Tabnine":              {"category": "Coding", "affiliate_url": "https://tabnine.com", "tool_website": "https://tabnine.com"},
    "Replit AI":            {"category": "Coding", "affiliate_url": "https://replit.com", "tool_website": "https://replit.com"},
    "Amazon CodeWhisperer": {"category": "Coding", "affiliate_url": "https://aws.amazon.com/codewhisperer", "tool_website": "https://aws.amazon.com/codewhisperer"},
    "Sourcegraph Cody":     {"category": "Coding", "affiliate_url": "https://sourcegraph.com/cody", "tool_website": "https://sourcegraph.com/cody"},
    "Aider":                {"category": "Coding", "affiliate_url": "https://aider.chat", "tool_website": "https://aider.chat"},
    "Continue.dev":         {"category": "Coding", "affiliate_url": "https://continue.dev", "tool_website": "https://continue.dev"},
    "Zed AI":               {"category": "Coding", "affiliate_url": "https://zed.dev", "tool_website": "https://zed.dev"},
    "Devin AI":             {"category": "Coding", "affiliate_url": "https://devin.ai", "tool_website": "https://devin.ai"},
    "bolt.new":             {"category": "Coding", "affiliate_url": "https://bolt.new", "tool_website": "https://bolt.new"},

    # ── Image ────────────────────────────────────────────────
    "Adobe Firefly":    {"category": "Image", "affiliate_url": "https://firefly.adobe.com", "tool_website": "https://firefly.adobe.com"},
    "DALL-E 3":         {"category": "Image", "affiliate_url": "https://openai.com/dall-e-3", "tool_website": "https://openai.com/dall-e-3"},
    "Stable Diffusion": {"category": "Image", "affiliate_url": "https://stability.ai", "tool_website": "https://stability.ai"},
    "Ideogram":         {"category": "Image", "affiliate_url": "https://ideogram.ai", "tool_website": "https://ideogram.ai"},
    "Leonardo AI":      {"category": "Image", "affiliate_url": "https://leonardo.ai", "tool_website": "https://leonardo.ai"},
    "Canva AI":         {"category": "Image", "affiliate_url": "https://canva.com", "tool_website": "https://canva.com"},
    "NightCafe":        {"category": "Image", "affiliate_url": "https://nightcafe.studio", "tool_website": "https://nightcafe.studio"},
    "Playground AI":    {"category": "Image", "affiliate_url": "https://playground.com", "tool_website": "https://playground.com"},
    "Lexica":           {"category": "Image", "affiliate_url": "https://lexica.art", "tool_website": "https://lexica.art"},
    "Bing Image Creator": {"category": "Image", "affiliate_url": "https://bing.com/images/create", "tool_website": "https://bing.com/images/create"},
    "Magnific AI":      {"category": "Image", "affiliate_url": "https://magnific.ai", "tool_website": "https://magnific.ai"},

    # ── Productivity ─────────────────────────────────────────
    "Notion AI":    {"category": "Productivity", "affiliate_url": "https://notion.so", "tool_website": "https://notion.so"},
    "Otter.ai":     {"category": "Productivity", "affiliate_url": "https://otter.ai", "tool_website": "https://otter.ai"},
    "Fireflies.ai": {"category": "Productivity", "affiliate_url": "https://fireflies.ai", "tool_website": "https://fireflies.ai"},
    "Mem.ai":       {"category": "Productivity", "affiliate_url": "https://mem.ai", "tool_website": "https://mem.ai"},
    "Raycast AI":   {"category": "Productivity", "affiliate_url": "https://raycast.com", "tool_website": "https://raycast.com"},
    "Reclaim AI":   {"category": "Productivity", "affiliate_url": "https://reclaim.ai", "tool_website": "https://reclaim.ai"},
    "Motion":       {"category": "Productivity", "affiliate_url": "https://usemotion.com", "tool_website": "https://usemotion.com"},
    "Superhuman AI":{"category": "Productivity", "affiliate_url": "https://superhuman.com", "tool_website": "https://superhuman.com"},
    "Shortwave":    {"category": "Productivity", "affiliate_url": "https://shortwave.com", "tool_website": "https://shortwave.com"},
    "Reflect":      {"category": "Productivity", "affiliate_url": "https://reflect.app", "tool_website": "https://reflect.app"},
    "Linear AI":    {"category": "Productivity", "affiliate_url": "https://linear.app", "tool_website": "https://linear.app"},
    "Granola":      {"category": "Productivity", "affiliate_url": "https://granola.so", "tool_website": "https://granola.so"},
    "Perplexity AI":{"category": "Productivity", "affiliate_url": "https://perplexity.ai", "tool_website": "https://perplexity.ai"},

    # ── Video / Audio ────────────────────────────────────────
    "Runway":       {"category": "Video", "affiliate_url": "https://runwayml.com", "tool_website": "https://runwayml.com"},
    "Kling AI":     {"category": "Video", "affiliate_url": "https://klingai.com", "tool_website": "https://klingai.com"},
    "Pika Labs":    {"category": "Video", "affiliate_url": "https://pika.art", "tool_website": "https://pika.art"},
    "Sora":         {"category": "Video", "affiliate_url": "https://openai.com/sora", "tool_website": "https://openai.com/sora"},
    "HeyGen":       {"category": "Video", "affiliate_url": "https://heygen.com", "tool_website": "https://heygen.com"},
    "Synthesia":    {"category": "Video", "affiliate_url": "https://synthesia.io", "tool_website": "https://synthesia.io"},
    "Descript":     {"category": "Video", "affiliate_url": "https://descript.com", "tool_website": "https://descript.com"},
    "Opus Clip":    {"category": "Video", "affiliate_url": "https://opus.pro", "tool_website": "https://opus.pro"},
    "Captions.ai":  {"category": "Video", "affiliate_url": "https://captions.ai", "tool_website": "https://captions.ai"},
    "ElevenLabs":   {"category": "Video", "affiliate_url": "https://elevenlabs.io", "tool_website": "https://elevenlabs.io"},
    "Murf AI":      {"category": "Video", "affiliate_url": "https://murf.ai", "tool_website": "https://murf.ai"},
    "Luma AI":      {"category": "Video", "affiliate_url": "https://lumalabs.ai", "tool_website": "https://lumalabs.ai"},
    "Suno AI":      {"category": "Video", "affiliate_url": "https://suno.com", "tool_website": "https://suno.com"},
    "Udio":         {"category": "Video", "affiliate_url": "https://udio.com", "tool_website": "https://udio.com"},
}
