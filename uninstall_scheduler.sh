#!/bin/bash
# Removes the launchd scheduler daemons

AGENTS_DIR="$HOME/Library/LaunchAgents"

launchctl unload "$AGENTS_DIR/com.kimaireviews.scheduler.14.plist" 2>/dev/null && echo "Unloaded 14:00 scheduler"
launchctl unload "$AGENTS_DIR/com.kimaireviews.scheduler.20.plist" 2>/dev/null && echo "Unloaded 20:00 scheduler"

rm -f "$AGENTS_DIR/com.kimaireviews.scheduler.14.plist"
rm -f "$AGENTS_DIR/com.kimaireviews.scheduler.20.plist"

echo "✅ Scheduler removed."
