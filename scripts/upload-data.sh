#!/usr/bin/env bash
set -e
cd "$(dirname "$0")/.."

# Optional argument: which file to upload (e.g. "roster", "roster.json", or "data/roster.json")
if [ -n "$1" ]; then
  name="$(basename "$1" .json)"
  files=("data/$name.json")
  if [ ! -f "${files[0]}" ]; then
    echo "❌ No such file: ${files[0]}"
    echo "Available: $(ls data/*.json | xargs -n1 basename | sed 's/\.json$//' | tr '\n' ' ')"
    exit 1
  fi
else
  files=(data/*.json)
fi

# Check every file first; stop before uploading anything if one is broken
for f in "${files[@]}"; do
  node -e "JSON.parse(require('fs').readFileSync(process.argv[1],'utf8'))" "$f" \
    || { echo "❌ Invalid JSON in $f — nothing uploaded"; exit 1; }
done

for f in "${files[@]}"; do
  key="$(basename "$f" .json)"
  netlify blobs:set team-data "$key" --input "$f"
  echo "uploaded $key"
done