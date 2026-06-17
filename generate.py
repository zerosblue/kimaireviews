#!/usr/bin/env python3
"""
kimaireviews.com — AI Review Auto-Generator
Usage: python generate.py --tool "Cursor" [--category "Coding"] [--affiliate-url "https://..."]
"""

import argparse
import os
import re
import subprocess
import sys
import logging
from datetime import date
from pathlib import Path

import anthropic
from dotenv import load_dotenv
from prompts import (
    REVIEW_SYSTEM_PROMPT,
    REVIEW_USER_PROMPT,
    CATEGORY_MAP,
    TOOL_DEFAULTS,
)

# ── Setup ────────────────────────────────────────────────────────────────────

load_dotenv()

POSTS_DIR = Path(__file__).parent / "posts"
POSTS_DIR.mkdir(exist_ok=True)

log = logging.getLogger("generate")


def setup_logging(log_dir: Path | None = None) -> None:
    handlers: list[logging.Handler] = [logging.StreamHandler(sys.stdout)]
    if log_dir:
        log_dir.mkdir(exist_ok=True)
        log_file = log_dir / f"{date.today().isoformat()}.log"
        handlers.append(logging.FileHandler(log_file, encoding="utf-8"))
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s [%(levelname)s] %(message)s",
        handlers=handlers,
    )


# ── Slug helpers ─────────────────────────────────────────────────────────────

def slugify(name: str) -> str:
    slug = name.lower()
    slug = re.sub(r"[^\w\s-]", "", slug)
    slug = re.sub(r"[\s_]+", "-", slug)
    slug = re.sub(r"-+", "-", slug).strip("-")
    return slug + "-review"


# ── Claude API ───────────────────────────────────────────────────────────────

def generate_review(
    tool_name: str,
    category: str,
    affiliate_url: str,
    tool_website: str,
) -> str:
    api_key = os.getenv("ANTHROPIC_API_KEY")
    if not api_key:
        raise EnvironmentError("ANTHROPIC_API_KEY not set in .env")

    client = anthropic.Anthropic(api_key=api_key)
    today = date.today().isoformat()

    user_prompt = REVIEW_USER_PROMPT.format(
        tool_name=tool_name,
        category=category,
        affiliate_url=affiliate_url,
        tool_website=tool_website,
        date=today,
    )

    log.info(f"Generating review for: {tool_name} [{category}]")

    message = client.messages.create(
        model="claude-opus-4-7",
        max_tokens=4096,
        system=REVIEW_SYSTEM_PROMPT,
        messages=[{"role": "user", "content": user_prompt}],
    )

    return message.content[0].text


# ── File management ──────────────────────────────────────────────────────────

def save_mdx(tool_name: str, content: str) -> Path:
    slug = slugify(tool_name)
    path = POSTS_DIR / f"{slug}.mdx"

    if path.exists():
        log.warning(f"File already exists — overwriting: {path.name}")

    path.write_text(content, encoding="utf-8")
    log.info(f"Saved: {path}")
    return path


# ── GitHub push ──────────────────────────────────────────────────────────────

def git_push(file_path: Path, tool_name: str) -> bool:
    repo_dir = file_path.parent.parent

    try:
        subprocess.run(["git", "add", str(file_path)], cwd=repo_dir, check=True)
        subprocess.run(
            ["git", "commit", "-m", f"feat: add {tool_name} review"],
            cwd=repo_dir, check=True,
        )
        subprocess.run(["git", "push"], cwd=repo_dir, check=True)
        log.info("Pushed to GitHub.")
        return True
    except subprocess.CalledProcessError as e:
        log.error(f"Git push failed: {e}")
        return False


def vercel_deploy(repo_dir: Path) -> bool:
    vercel = subprocess.run(["which", "vercel"], capture_output=True, text=True).stdout.strip()
    if not vercel:
        vercel = "/usr/local/bin/vercel"

    try:
        subprocess.run([vercel, "--prod", "--yes"], cwd=repo_dir, check=True)
        log.info("Vercel production deployment complete.")
        return True
    except subprocess.CalledProcessError as e:
        log.error(f"Vercel deploy failed: {e}")
        return False


# ── Email notification ────────────────────────────────────────────────────────

def send_email_notification(tool_name: str, slug: str, success: bool) -> None:
    """
    Email notification via Gmail SMTP.
    Set GMAIL_USER and GMAIL_APP_PASSWORD in .env to enable.
    """
    gmail_user = os.getenv("GMAIL_USER")
    gmail_password = os.getenv("GMAIL_APP_PASSWORD")
    notify_email = os.getenv("NOTIFY_EMAIL", gmail_user)

    if not gmail_user or not gmail_password:
        log.debug("Email notification skipped — GMAIL_USER/GMAIL_APP_PASSWORD not set.")
        return

    import smtplib
    from email.mime.text import MIMEText

    status = "✅ Success" if success else "❌ Failed"
    url = f"https://kimaireviews.com/reviews/{slug}"

    body = (
        f"{status}: {tool_name} review auto-generated\n\n"
        f"URL: {url}\n"
        f"File: posts/{slug}.mdx\n"
    )

    msg = MIMEText(body)
    msg["Subject"] = f"[KimAI Reviews] {status} — {tool_name}"
    msg["From"] = gmail_user
    msg["To"] = notify_email

    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as smtp:
            smtp.login(gmail_user, gmail_password)
            smtp.send_message(msg)
        log.info(f"Email notification sent to {notify_email}")
    except Exception as e:
        log.error(f"Email failed: {e}")


# ── Main ─────────────────────────────────────────────────────────────────────

def main() -> None:
    parser = argparse.ArgumentParser(description="Generate an AI tool review for kimaireviews.com")
    parser.add_argument("--tool", required=True, help='AI tool name, e.g. "Cursor"')
    parser.add_argument("--category", default=None, help="Writing/Coding/Image/Productivity/Video")
    parser.add_argument("--affiliate-url", default=None)
    parser.add_argument("--tool-website", default=None)
    parser.add_argument("--push", action="store_true", default=True, help="Auto-push to GitHub (default: on)")
    parser.add_argument("--no-push", dest="push", action="store_false")
    parser.add_argument("--log-dir", default=None, help="Directory for log files")
    args = parser.parse_args()

    log_dir = Path(args.log_dir) if args.log_dir else None
    setup_logging(log_dir)

    tool_name = args.tool.strip()
    defaults = TOOL_DEFAULTS.get(tool_name, {})

    category = args.category or defaults.get("category", "Productivity")
    if category.lower() in CATEGORY_MAP:
        category = CATEGORY_MAP[category.lower()]

    affiliate_url = args.affiliate_url or defaults.get("affiliate_url", f"https://{slugify(tool_name).replace('-review','')}.com")
    tool_website = args.tool_website or defaults.get("tool_website", affiliate_url)

    try:
        content = generate_review(tool_name, category, affiliate_url, tool_website)
        file_path = save_mdx(tool_name, content)
        slug = file_path.stem

        push_ok = False
        if args.push:
            push_ok = git_push(file_path, tool_name)
            if push_ok:
                vercel_deploy(file_path.parent.parent)

        send_email_notification(tool_name, slug, success=True)
        log.info(f"Done! View at: https://kimaireviews.com/reviews/{slug}")

    except Exception as e:
        log.error(f"Generation failed: {e}")
        send_email_notification(tool_name, slugify(tool_name), success=False)
        sys.exit(1)


if __name__ == "__main__":
    main()
