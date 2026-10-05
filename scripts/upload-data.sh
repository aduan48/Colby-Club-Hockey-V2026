#!/usr/bin/env bash
set -e
cd "$(dirname "$0")/.."   # always run from the project root

for f in data/*.json; do
  key="$(basename "$f" .json)"   # data/roster2026.json → roster2026
  netlify blobs:set team-data "$key" --input "$f"
  echo "uploaded $key"
done