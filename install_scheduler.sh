#!/bin/bash
# Installs the launchd scheduler daemons for kimaireviews.com
# Run once: bash install_scheduler.sh

set -e

AGENTS_DIR="$HOME/Library/LaunchAgents"
PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "📦 Installing KimAI Reviews scheduler..."

# Copy plists to LaunchAgents
cp "$PROJECT_DIR/com.kimaireviews.scheduler.14.plist" "$AGENTS_DIR/"
cp "$PROJECT_DIR/com.kimaireviews.scheduler.20.plist" "$AGENTS_DIR/"

# Create logs dir
mkdir -p "$PROJECT_DIR/logs"

# Load agents
launchctl load "$AGENTS_DIR/com.kimaireviews.scheduler.14.plist"
launchctl load "$AGENTS_DIR/com.kimaireviews.scheduler.20.plist"

echo ""
echo "✅ Scheduler installed!"
echo "   → Runs daily at 14:00 and 20:00"
echo "   → Logs: $PROJECT_DIR/logs/"
echo ""
echo "To unload:  bash uninstall_scheduler.sh"
echo "To test now: python3 $PROJECT_DIR/scheduler.py"
