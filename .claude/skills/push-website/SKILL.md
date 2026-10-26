---
name: push-website
description: Publish the website — save all current changes and put them live on letsattune.com. Use whenever Shilpa says things like "publish", "make it live", "save my changes", "push the website", "update the site", "put this online", or "/push-website".
---

# Publish the website

Shilpa is **not technical**. She just wants her changes to appear on her live website.
Do this whole flow yourself, in plain language, without asking her to run any commands.

## Steps

1. Make sure you are in this repo — the `letsattune-website` folder this session is open in. Its place
   differs per machine, so do not assume a path.
2. See what changed: `git status --short`.
   - If **nothing** changed, tell her warmly: "There's nothing new to publish — your website is already up to date." Then stop.
3. Stage everything: `git add -A`.
4. Commit. Write a short, human commit message describing what changed in plain words
   (e.g. "Update workshop dates", "Change hero text", "Add new testimonial").
   - If you just made the edits this session, you already know what changed — use that.
   - If you're unsure what changed, glance at `git diff --stat` and summarise it. Don't ask her for a "commit message" — that's jargon.
   - End the commit message with:
     `Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>`
5. Publish: `git push origin main`.
6. Confirm in plain language, e.g.:
   > ✅ Done! Your changes are saved and will appear on your website (letsattune.com) in about 30 seconds. Refresh the page after a minute to see them.

## Notes

- The git commands are pre-approved in `.claude/settings.json`, so they run without prompting her.
- If a command fails (e.g. no internet, or a push is rejected), explain the problem simply and
  what to do — never show raw error stack traces as the main message. Example:
  "It looks like your internet may be down — please reconnect and tell me to publish again."
- If the push is rejected because the remote is ahead, run `git pull --no-rebase origin main`
  first, then push again. If that produces a conflict, explain it plainly and stop — don't guess.
- Never use `--force` or destructive git commands here.
