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
    "Cursor": {
        "category": "Coding",
        "affiliate_url": "https://cursor.com",
        "tool_website": "https://cursor.com",
    },
    "GitHub Copilot": {
        "category": "Coding",
        "affiliate_url": "https://github.com/features/copilot",
        "tool_website": "https://github.com/features/copilot",
    },
    "Notion AI": {
        "category": "Productivity",
        "affiliate_url": "https://notion.so",
        "tool_website": "https://notion.so",
    },
    "Jasper": {
        "category": "Writing",
        "affiliate_url": "https://jasper.ai",
        "tool_website": "https://jasper.ai",
    },
    "Adobe Firefly": {
        "category": "Image",
        "affiliate_url": "https://firefly.adobe.com",
        "tool_website": "https://firefly.adobe.com",
    },
    "Runway": {
        "category": "Video",
        "affiliate_url": "https://runwayml.com",
        "tool_website": "https://runwayml.com",
    },
}
