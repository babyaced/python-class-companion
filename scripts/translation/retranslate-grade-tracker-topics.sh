#!/usr/bin/env bash
# Retranslate the five Grade Tracker topic pages from EN to ZH.
# Requires DEEPL_AUTH_KEY to be set.
# Run from repo root: bash scripts/translation/retranslate-grade-tracker-topics.sh

set -e
cd "$(dirname "$0")/../.."

FILES=(
  "content/en/Variables/TypesOfVariables/DataStructures/Lists.mdx"
  "content/en/ControlFlow/Loops/page.mdx"
  "content/en/ControlFlow/Conditionals/IfStatements.mdx"
  "content/en/ControlFlow/Conditionals/ComparisonOperators.mdx"
  "content/en/InputAndOutput/HandlingFiles.mdx"
)

for f in "${FILES[@]}"; do
  echo "Translating $f ..."
  node scripts/translation/translate-with-deepl.js "$f"
done

echo "Done. All five Grade Tracker topic pages retranslated to content/zh/"
