#!/bin/bash
# Auto-commit and push script for git repository
# This script watches for file changes and automatically commits and pushes them

REPO_PATH="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$REPO_PATH"

echo "Starting auto-commit watcher for: $REPO_PATH"
echo "This will automatically commit and push changes to GitHub..."
echo ""

# Function to perform commit and push
auto_commit() {
    if git diff --quiet && git diff --cached --quiet; then
        return 0
    fi
    
    # Check if there are any uncommitted changes
    if ! git diff-index --quiet HEAD --; then
        echo "[$(date '+%Y-%m-%d %H:%M:%S')] Changes detected, committing..."
        git add -A
        git commit -m "Auto-commit: $(date '+%Y-%m-%d %H:%M:%S')"
        
        # Push to GitHub
        if git push; then
            echo "[$(date '+%Y-%m-%d %H:%M:%S')] Successfully pushed to GitHub"
        else
            echo "[$(date '+%Y-%m-%d %H:%M:%S')] Error pushing to GitHub"
        fi
    fi
}

# Watch for file changes using inotifywait (requires inotify-tools)
if command -v inotifywait &> /dev/null; then
    echo "Using inotifywait for file monitoring..."
    inotifywait -m -r -e modify,create,delete \
        --exclude '\.git|node_modules|\.vscode' \
        . | while read path action file; do
        echo "[$(date '+%Y-%m-%d %H:%M:%S')] File changed: $path$file"
        sleep 1  # Wait 1 second to batch multiple changes
        auto_commit
    done
else
    # Fallback: simple polling method
    echo "inotify-tools not found. Using polling method (checks every 5 seconds)..."
    echo "For better performance, install inotify-tools: sudo apt-get install inotify-tools"
    echo ""
    
    while true; do
        auto_commit
        sleep 5
    done
fi
