#!/usr/bin/env bash
set -e
cd "$(dirname "$0")/.."

# Check every file first; stop before uploading anything if one is broken
for f in data/*.json; do
  node -e "JSON.parse(require('fs').readFileSync('$f','utf8'))" \
    || { echo "❌ Invalid JSON in $f — nothing uploaded"; exit 1; }
done

for f in data/*.json; do
  key="$(basename "$f" .json)"
  netlify blobs:set team-data "$key" --input "$f"
  echo "uploaded $key"
done