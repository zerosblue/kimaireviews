#!/usr/bin/env python3
"""
kimaireviews.com — Daily Review Scheduler
Runs at 14:00 and 20:00 KST.
Reads topics from topics.txt; falls back to popular AI tools list.
Triggered by macOS launchd (see com.kimaireviews.scheduler.plist).
"""

import logging
import os
import random
import subprocess
import sys
from datetime import date
from pathlib import Path

from dotenv import load_dotenv

load_dotenv()

# ── Paths ─────────────────────────────────────────────────────────────────────

ROOT = Path(__file__).parent
POSTS_DIR = ROOT / "posts"
LOGS_DIR = ROOT / "logs"
TOPICS_FILE = ROOT / "topics.txt"
USED_FILE = ROOT / ".used_topics.txt"

LOGS_DIR.mkdir(exist_ok=True)
POSTS_DIR.mkdir(exist_ok=True)

# ── Logging ───────────────────────────────────────────────────────────────────

log_path = LOGS_DIR / f"{date.today().isoformat()}.log"
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[
        logging.StreamHandler(sys.stdout),
        logging.FileHandler(log_path, encoding="utf-8"),
    ],
)
log = logging.getLogger("scheduler")

# ── Default topic pool (if topics.txt not found) ──────────────────────────────

DEFAULT_TOPICS = [
    "Cursor", "GitHub Copilot", "Notion AI", "Jasper AI", "Copy.ai",
    "Adobe Firefly", "Runway", "Kling AI", "Pika Labs", "Sora",
    "Perplexity AI", "You.com", "Phind", "Tabnine", "Codeium",
    "Writesonic", "Rytr", "Anyword", "Synthesia", "HeyGen",
    "ElevenLabs", "Murf AI", "Otter.ai", "Fireflies.ai", "Mem.ai",
    "Reflect", "Obsidian AI", "Linear", "Height", "Raycast AI",
    "Grammarly", "QuillBot", "Wordtune", "Ideogram", "Leonardo AI",
    "Stable Diffusion", "DALL-E 3", "Canva AI", "Remove.bg",
    "Luma AI", "Descript", "Opus Clip", "Captions.ai",
]


def load_topics() -> list[str]:
    if TOPICS_FILE.exists():
        lines = TOPICS_FILE.read_text(encoding="utf-8").splitlines()
        topics = [l.strip() for l in lines if l.strip() and not l.startswith("#")]
        if topics:
            log.info(f"Loaded {len(topics)} topics from topics.txt")
            return topics
    log.info("topics.txt not found — using default topic pool")
    return DEFAULT_TOPICS


def load_used() -> set[str]:
    if USED_FILE.exists():
        return set(USED_FILE.read_text(encoding="utf-8").splitlines())
    return set()


def mark_used(tool: str) -> None:
    with USED_FILE.open("a", encoding="utf-8") as f:
        f.write(tool + "\n")


def pick_next_topic(topics: list[str], used: set[str]) -> str | None:
    # Try in-order from topics.txt; fall back to random from pool
    if TOPICS_FILE.exists():
        for t in topics:
            if t not in used:
                return t
        log.warning("All topics.txt entries used — resetting used list.")
        USED_FILE.unlink(missing_ok=True)
        return topics[0] if topics else None
    else:
        available = [t for t in topics if t not in used]
        if not available:
            log.warning("All default topics used — resetting.")
            USED_FILE.unlink(missing_ok=True)
            available = topics
        return random.choice(available)


def run_generate(tool: str) -> bool:
    python = sys.executable
    cmd = [
        python, str(ROOT / "generate.py"),
        "--tool", tool,
        "--push",
        "--log-dir", str(LOGS_DIR),
    ]
    log.info(f"Running: {' '.join(cmd)}")
    result = subprocess.run(cmd, cwd=ROOT)
    return result.returncode == 0


def main() -> None:
    log.info("=== KimAI Reviews Scheduler started ===")

    topics = load_topics()
    used = load_used()

    tool = pick_next_topic(topics, used)
    if not tool:
        log.error("No topics available. Add entries to topics.txt.")
        sys.exit(1)

    log.info(f"Selected topic: {tool}")
    success = run_generate(tool)

    if success:
        mark_used(tool)
        log.info(f"✅ {tool} review generated and deployed.")
    else:
        log.error(f"❌ {tool} review generation failed. See log for details.")
        sys.exit(1)


if __name__ == "__main__":
    main()
