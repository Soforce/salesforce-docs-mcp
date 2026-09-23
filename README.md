# Salesforce Documentation MCP Server

[![MCP](https://img.shields.io/badge/MCP-Model%20Context%20Protocol-blue)](https://modelcontextprotocol.io/)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A **local-first** Model Context Protocol (MCP) server for searching Salesforce Developer Documentation. Search across 360 official Salesforce PDF documents directly from VS Code, Claude Desktop, or any MCP-compatible client.

## ✨ Features

- 🎯 **Intent-Based Search** - Automatically detects query topic (Apex, REST API, LWC, etc.) and searches in relevant docs
- 📚 **360 Documents** - 291 developer guides + 69 release notes (Apex, LWC, REST API, Metadata API, and more)
- 🏠 **100% Local** - All data stays on your machine, works offline
- ⚡ **Fast** - Sub-second query latency with intelligent filtering + LRU caching
- 🔍 **Smart Fallback** - Expands search if topic-filtered results are sparse
- 📦 **Packageable** - Pure JavaScript (sql.js), no native dependencies
- 🔐 **Secure** - Parameterized queries, input validation with zod

## 🚀 Quick Start

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- VS Code with GitHub Copilot or Claude Desktop

### Installation

```bash
# Clone the repository
git clone https://github.com/SalesforceDiariesBySanket/salesforce-docs-mcp.git
cd salesforce-docs-mcp

# Install dependencies
npm install

# Build the TypeScript
npm run build

# Build the search index (parses all PDFs - takes 5-10 minutes)
npm run build-index
```

### Configure VS Code

Add to your VS Code MCP configuration (`%APPDATA%\Code\User\mcp.json` on Windows):

```json
{
  "servers": {
    "salesforce-docs": {
      "type": "stdio",
      "command": "node",
      "args": ["C:\\path\\to\\salesforce-docs-mcp\\dist\\index.js"]
    }
  }
}
```

### Configure Claude Desktop

Add to your Claude Desktop configuration (`%APPDATA%\Claude\claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "salesforce-docs": {
      "command": "node",
      "args": ["C:\\path\\to\\salesforce-docs-mcp\\dist\\index.js"]
    }
  }
}
```

## 🛠️ Available Tools

### `search_salesforce_docs`
Search across all Salesforce documentation with natural language queries.

```
Example: "How to create an Apex trigger on Account"
Example: "REST API authentication with OAuth 2.0"
Example: "Lightning Web Component wire service"
```

### `get_api_reference`
Get specific Salesforce API reference documentation.

```
Example: API name "REST API", endpoint "/services/data"
Example: API name "Bulk API 2.0", endpoint "jobs"
```

### `get_release_notes`
Get Salesforce release notes for specific releases or features.

```
Example: release "Winter 26"
Example: feature "Dynamic Forms"
```

### `get_code_example`
Get code examples from Salesforce documentation.

```
Example: topic "trigger on Account", language "apex"
```

### `list_doc_categories`
List all documentation categories with document counts.

### `get_document`
Get full content of a specific document by ID or filename.

## 🎯 Intent-Based Search

The MCP server automatically detects the topic of your query and searches in the most relevant documentation:

| Query | Detected Intent | Searches In |
|-------|-----------------|-------------|
| "How to create an Apex trigger" | Apex Development | ~15 Apex docs |
| "REST API OAuth authentication" | REST API | ~10 REST API docs |
| "LWC wire decorator" | Lightning/LWC | ~12 Lightning docs |
| "Bulk API 2.0 job" | Bulk API | ~5 Bulk API docs |
| "sharing rules permission set" | Security | 12 Security docs |
| "SOQL query limits" | SOQL/SOSL | ~5 SOQL docs |

**Benefits:**
- 🎯 **More relevant results** - Searches in topic-specific docs first
- ⚡ **Faster queries** - Scans ~15 docs instead of 357
- 🔄 **Smart fallback** - Expands search if too few results found

**Override:** You can always specify `category` or `subcategory` to search in a specific area.

## 📁 Documentation Categories

| Category | Description |
|----------|-------------|
| `core_platform` | Apex, LWC, Visualforce, SOQL/SOSL, Formulas |
| `apis` | REST, SOAP, Metadata, Bulk, Tooling APIs |
| `dev_tools` | Salesforce CLI, VS Code, Packaging |
| `clouds` | Sales, Service, Experience, Industry Clouds |
| `security` | Authentication, Authorization, Sharing |
| `integration` | Integration Patterns, Connectors |
| `best_practices` | Limits, Performance, Cheatsheets |
| `release_notes` | Winter '15 to present |

## 🏗️ Project Structure

```
salesforce-docs-mcp/
├── src/
│   ├── index.ts              # MCP server entry point
│   ├── types.ts              # TypeScript type definitions
│   ├── db/
│   │   ├── database.ts       # SQLite connection (sql.js)
│   │   └── queries.ts        # Search queries with intent detection
│   └── utils/
│       ├── formatter.ts      # Result formatting
│       ├── intent.ts         # Intent detection patterns
│       ├── classifier.ts     # Document classification
│       └── chunker.ts        # PDF text chunking
├── scripts/
│   ├── build-index.ts        # Multi-source PDF parsing and indexing
│   ├── test-search.ts        # Search testing (114 tests)
│   ├── test-llm-judge.ts     # LLM-as-judge evaluation
│   └── postinstall.js        # Post-install setup
├── docs/
│   ├── pdfs/                 # Salesforce developer PDFs (source: salesforce)
│   ├── release-notes/        # Salesforce release notes PDFs (source: salesforce)
│   └── tmf/                   # TM Forum PDFs (source: tmf)
│       └── README.md         # TMF naming conventions & indexing guide
├── data/
│   └── salesforce-docs.db    # Unified SQLite search index (salesforce + tmf)
├── package.json
├── tsconfig.json
└── README.md
```

## 📡 TM Forum (TMF) Support

In addition to Salesforce docs, this server can index **TM Forum** standards in a
unified corpus. Every document carries a `source` (`salesforce` | `tmf`) so you can
search across both or scope to one.

Supported TMF families:

| Category | Contents |
|----------|----------|
| `tmf_open_api` | Open API specs (TMFxxx) — Product, Service, Resource, Party, Billing domains |
| `tmf_sid` | SID / Information Framework (GB922) |
| `tmf_etom` | eTOM / Business Process Framework (GB921) |
| `tmf_best_practice` | ODA, Frameworx, guidebooks (GBxxx) & implementation guides (IGxxx) |

**Adding TMF docs:** drop PDFs into `docs/tmf/` (see [`docs/tmf/README.md`](docs/tmf/README.md)
for naming conventions), then index just TMF without re-parsing Salesforce docs:

```bash
npm run build-index -- --source tmf
```

**TMF tools:** `search_tmf_docs`, `get_tmf_api`, plus `search_salesforce_docs` /
`semantic_search_docs` / `get_document_summaries` all accept a `source: "tmf"` filter.

## 📥 Adding Documentation

Download Salesforce PDFs to `docs/pdfs/` then rebuild the index:

```bash
npm run build-index
```

> A full rebuild reindexes **all** sources. To (re)index a single source without
> touching the others, pass `--source salesforce` or `--source tmf`.

PDFs can be downloaded from:
```
https://resources.docs.salesforce.com/{version}/latest/en-us/sfdc/pdf/{name}.pdf
```

Current version: **258** (Winter '26, API v65.0)

## 🔧 Development

```bash
# Run in development mode
npm run dev

# Build TypeScript
npm run build

# Test search functionality
npm run test-search
```

## ⚡ Performance

| Metric | Value |
|--------|--------|
| PDF Documents | 360 (291 + 69 release notes) |
| Documents indexed | 357 |
| Search chunks | ~156,000 |
| Database size | ~520 MB |
| Intent-filtered query | < 50ms (scoped search) |
| Unfiltered query | < 500ms (full corpus) |
| Cached query | < 10ms |

### How Intent-Based Search Improves Performance

```
Traditional Search:
  "Apex trigger" → Scan all 156K chunks → Filter → Rank → ~500ms

Intent-Based Search:
  "Apex trigger" → Detect: Apex (high confidence)
                 → Filter to apex subcategory (~15 docs, ~6,000 chunks)
                 → Scan → Rank → ~50ms
```

> **Note:** Uses sql.js (pure JavaScript SQLite) with LIKE-based text search. Intent detection reduces search scope by 90%+ for topic-specific queries.

## 🔐 Security

- **100% Local**: No data leaves your machine
- **No API Keys**: Works completely offline
- **stdio Transport**: No exposed HTTP endpoints
- **Parameterized Queries**: Protection against SQL injection
- **Input Validation**: All tool inputs validated with zod schemas

## 📜 License

MIT License - see [LICENSE](LICENSE) for details.

## ⚠️ Disclaimer

**Salesforce Documentation:** The Salesforce documentation PDF files included in this repository are the property of Salesforce, Inc. and are provided for convenience only. These documents are subject to Salesforce's own terms of use and copyright.

**Trademark Notice:** The trademarks and product names of Salesforce®, including the mark Salesforce®, are the property of Salesforce, Inc. This project is **not affiliated with, sponsored by, or endorsed by Salesforce, Inc.** The use of the Salesforce® trademark and Salesforce documentation in this project does not indicate an endorsement, recommendation, or business relationship between Salesforce, Inc. and the project maintainers.

**Official Documentation:** For official Salesforce documentation, please visit [developer.salesforce.com/docs](https://developer.salesforce.com/docs).

---

© 2026 Sanket (SalesforceDiariesBySanket) | Salesforce documentation © Salesforce, Inc.
