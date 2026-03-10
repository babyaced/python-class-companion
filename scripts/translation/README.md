# Translation assets

## Do-not-translate list

- **`do-not-translate.txt`** – Key terms that should not be translated (brands, product names, technical terms). For reference and any custom tooling.
- **`deepl-glossary-en-zh.csv`** – Same terms in DeepL glossary format (EN → ZH).

In DeepL, a glossary entry with **identical source and target** (e.g. `CodeSandbox,CodeSandbox`) makes that term appear unchanged in the translated text.

## Script: translate-with-deepl.js

A Node.js script that uses the DeepL API and the do-not-translate glossary to translate EN → ZH. It only sends **prose** to DeepL; code blocks and inline code are left unchanged.

1. **Set your API key**  
   Paste it in the script at the line `const DEEPL_AUTH_KEY = ...` or set the env var:  
   `DEEPL_AUTH_KEY=your_key`

2. **Test run** (creates glossary and translates a sample sentence):
   ```bash
   node scripts/translation/translate-with-deepl.js
   ```

3. **Translate one MDX file** (writes to the matching path under `content/zh/`):
   ```bash
   node scripts/translation/translate-with-deepl.js content/en/GettingStarted/page.mdx
   ```

4. **Retranslate all Grade Tracker topic pages** (after revising the EN versions):
   ```bash
   bash scripts/translation/retranslate-grade-tracker-topics.sh
   ```

Uses the free API by default (`api-free.deepl.com`). For Pro, set `DEEPL_BASE=https://api.deepl.com`.

## Using the glossary with the DeepL API directly

1. Create a glossary via the [DeepL API](https://www.deepl.com/docs-api/managing-glossaries/creating-a-glossary/) (e.g. `POST /v2/glossaries` or the glossary endpoint for your plan).
2. Use **source_lang** `EN` and **target_lang** `ZH` for this list.
3. Send the CSV contents of `deepl-glossary-en-zh.csv` as the glossary entries.
4. When calling the translate endpoint, pass the glossary ID so DeepL applies these entries.

You can add or remove rows in the CSV as needed; keep the header `source,target`.
