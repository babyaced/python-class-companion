/**
 * DeepL translation script for EN → ZH (Chinese).
 * Uses the do-not-translate glossary so key terms stay unchanged.
 *
 * Usage:
 *   1. Paste your API key in DEEPL_AUTH_KEY below, or set env: DEEPL_AUTH_KEY=your_key
 *   2. node scripts/translation/translate-with-deepl.js              # test run
 *   3. node scripts/translation/translate-with-deepl.js content/en/GettingStarted/page.mdx
 *
 * Get an API key: https://www.deepl.com/pro-api
 * Free tier: https://api-free.deepl.com
 */

const { readFileSync, writeFileSync, existsSync, mkdirSync } = require('fs')
const { dirname, join } = require('path')

// ——— Insert your DeepL API key here, or set env DEEPL_AUTH_KEY ———
const DEEPL_AUTH_KEY = process.env.DEEPL_AUTH_KEY || ''

// Free tier: api-free.deepl.com — Pro: api.deepl.com
const DEEPL_BASE = process.env.DEEPL_BASE || 'https://api-free.deepl.com'

const GLOSSARY_CSV_PATH = join(__dirname, 'deepl-glossary-en-zh.csv')
const CONTENT_EN = join(__dirname, '../../content/en')
const CONTENT_ZH = join(__dirname, '../../content/zh')

function getAuthKey() {
  const key = DEEPL_AUTH_KEY.trim()
  if (!key) {
    console.error('Missing DeepL API key. Set DEEPL_AUTH_KEY env or paste your key in this script.')
    process.exit(1)
  }
  return key
}

/**
 * Create a glossary from the CSV (do-not-translate list). Returns glossary_id.
 */
async function createGlossary(authKey) {
  const csv = readFileSync(GLOSSARY_CSV_PATH, 'utf-8')
  const lines = csv.trim().split('\n').filter((line) => line && !line.startsWith('source,'))
  const entriesStr = lines.join('\n')

  const body = new URLSearchParams({
    name: 'python-companion-en-zh',
    source_lang: 'EN',
    target_lang: 'ZH',
    entries: entriesStr,
    entries_format: 'csv',
  })

  const res = await fetch(`${DEEPL_BASE}/v2/glossaries`, {
    method: 'POST',
    headers: {
      Authorization: `DeepL-Auth-Key ${authKey}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: body.toString(),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`DeepL glossary creation failed (${res.status}): ${err}`)
  }

  const data = await res.json()
  return data.glossary_id
}

/**
 * Translate one or more text strings EN → ZH using optional glossary_id.
 */
async function translateText(authKey, textOrArray, glossaryId = null) {
  const textArray = Array.isArray(textOrArray) ? textOrArray : [textOrArray]
  const body = {
    text: textArray,
    source_lang: 'EN',
    target_lang: 'ZH',
    ...(glossaryId && { glossary_id: glossaryId }),
  }

  const res = await fetch(`${DEEPL_BASE}/v2/translate`, {
    method: 'POST',
    headers: {
      Authorization: `DeepL-Auth-Key ${authKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`DeepL translate failed (${res.status}): ${err}`)
  }

  const data = await res.json()
  const translations = data.translations.map((t) => t.text)
  return textArray.length === 1 ? translations[0] : translations
}

/**
 * Split MDX into segments: { type: 'code'|'prose', content }.
 * Prose is sent to DeepL; code blocks are kept as-is.
 */
function splitMdx(content) {
  const segments = []
  const codeBlockRe = /^(\s*```[\w]*\n[\s\S]*?^\s*```)/gm
  let lastEnd = 0
  let m
  while ((m = codeBlockRe.exec(content)) !== null) {
    if (m.index > lastEnd) {
      const prose = content.slice(lastEnd, m.index).trim()
      if (prose) segments.push({ type: 'prose', content: prose })
    }
    segments.push({ type: 'code', content: m[1] })
    lastEnd = m.index + m[0].length
  }
  if (lastEnd < content.length) {
    const prose = content.slice(lastEnd).trim()
    if (prose) segments.push({ type: 'prose', content: prose })
  }
  return segments
}

/**
 * Translate an MDX file: only prose segments go to DeepL; code blocks unchanged.
 */
async function translateMdxFile(authKey, enPath, glossaryId) {
  const raw = readFileSync(enPath, 'utf-8')
  const segments = splitMdx(raw)
  const proseSegments = segments.filter((s) => s.type === 'prose')
  if (proseSegments.length === 0) return raw

  const proseTexts = proseSegments.map((s) => s.content)
  const translated = await translateText(authKey, proseTexts, glossaryId)
  const translatedArray = Array.isArray(translated) ? translated : [translated]

  let i = 0
  const result = segments
    .map((s) => {
      if (s.type === 'code') return s.content
      return translatedArray[i++]
    })
    .join('\n\n')

  return result
}

async function main() {
  const authKey = getAuthKey()

  const args = process.argv.slice(2)
  const fileArg = args[0]

  if (!fileArg) {
    // Test run: create glossary and translate a sample
    console.log('Creating glossary from', GLOSSARY_CSV_PATH, '...')
    const glossaryId = await createGlossary(authKey)
    console.log('Glossary ID:', glossaryId)

    const sample = 'In this class, we will be using an online code editor called CodeSandbox.'
    const out = await translateText(authKey, sample, glossaryId)
    console.log('Sample translation:', out)
    return
  }

  // Translate one file
  const enPath = fileArg.startsWith('content/') ? join(__dirname, '..', '..', fileArg) : fileArg
  if (!existsSync(enPath)) {
    console.error('File not found:', enPath)
    process.exit(1)
  }

  console.log('Creating glossary...')
  const glossaryId = await createGlossary(authKey)
  console.log('Translating (prose only, code unchanged):', enPath)
  const translated = await translateMdxFile(authKey, enPath, glossaryId)
  const outPath = enPath.replace(/content[/\\]en[/\\]/, 'content/zh/')
  const outDir = dirname(outPath)
  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true })
  writeFileSync(outPath, translated, 'utf-8')
  console.log('Wrote:', outPath)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
