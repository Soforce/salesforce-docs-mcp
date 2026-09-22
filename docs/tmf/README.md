# TM Forum (TMF) PDFs

Drop TM Forum standard PDFs into this folder, then index them.

## Indexing

```bash
# Index ONLY the TMF corpus, keeping the existing Salesforce docs intact:
npm run build-index -- --source tmf

# Or do a full rebuild of every source (Salesforce + TMF):
npm run build-index
```

The `--source tmf` mode loads the existing database, removes any previously
indexed TMF documents, and re-indexes just this folder — so it is safe to run
repeatedly and never touches the Salesforce rows.

## Naming conventions → categorization

Documents are auto-categorized from their filenames. Keep the standard TMF
naming (the number is what matters most) so routing works:

| Filename pattern                    | Category (`source = tmf`) | Example                                       |
| ----------------------------------- | --------------------------- | --------------------------------------------- |
| `TMF620*`, `product catalog`    | `tmf_open_api` / product  | `TMF620_Product_Catalog_Management_API.pdf` |
| `TMF641*`, `service ordering`   | `tmf_open_api` / service  | `TMF641_Service_Ordering_API.pdf`           |
| `TMF639*`, `resource inventory` | `tmf_open_api` / resource | `TMF639_Resource_Inventory_API.pdf`         |
| `TMF632*`, `party`              | `tmf_open_api` / party    | `TMF632_Party_Management_API.pdf`           |
| `TMF666*`, `account/billing`    | `tmf_open_api` / billing  | `TMF666_Account_Management_API.pdf`         |
| `TMF<nnn>` (other)                | `tmf_open_api` / common   | `TMF700_Shipment_Tracking_API.pdf`          |
| `GB922*`, `SID`                 | `tmf_sid`                 | `GB922_Information_Framework.pdf`           |
| `GB921*`, `eTOM`                | `tmf_etom`                | `GB921_Business_Process_Framework.pdf`      |
| `IG1167*`, `ODA`                | `tmf_best_practice` / oda | `IG1167_ODA_Functional_Architecture.pdf`    |
| `GB929*`, `TAM`, guidebook      | `tmf_best_practice`       | `GB929_Application_Framework.pdf`           |
| `IG<nnnn>`, `GB<nnn>`           | `tmf_best_practice`       | `IG1228_...pdf`                             |

If a document does not match any pattern, it defaults to
`tmf_best_practice` / guidebook. To add or refine routing, edit
`TMF_DOCUMENT_PATTERNS` in `scripts/build-index.ts`.

## Searching

- `search_tmf_docs` — search only the TMF corpus.
- `get_tmf_api` — look up a specific Open API spec (e.g. `TMF620`).
- `search_salesforce_docs` with `source: "tmf"` — unified search scoped to TMF.
- Omit `source` to search Salesforce **and** TMF together.

> TMF documents are © TM Forum and subject to TM Forum's terms of use. They are
> not distributed with this repository; add your own licensed copies here.
