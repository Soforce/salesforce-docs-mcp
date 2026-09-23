/**
 * Type definitions for the Docs MCP Server
 *
 * The server hosts a unified corpus spanning multiple sources (Salesforce
 * developer documentation and TM Forum standards). The `source` dimension lets
 * searches span everything or scope to a single standards body.
 */

// Corpus source / standards body a document belongs to
export enum DocSource {
    SALESFORCE = "salesforce",
    TMF = "tmf"
}

// Document categories matching the architecture design
export enum DocCategory {
    // ---- Salesforce ----
    CORE_PLATFORM = "core_platform",
    APIS = "apis",
    DEV_TOOLS = "dev_tools",
    CLOUDS = "clouds",
    SECURITY = "security",
    INTEGRATION = "integration",
    BEST_PRACTICES = "best_practices",
    RELEASE_NOTES = "release_notes",

    // ---- TM Forum (TMF) ----
    TMF_OPEN_API = "tmf_open_api",       // TMFxxx Open API specifications
    TMF_SID = "tmf_sid",                 // Shared Information/Data model (GB922)
    TMF_ETOM = "tmf_etom",               // Business Process Framework / eTOM (GB921)
    TMF_BEST_PRACTICE = "tmf_best_practice" // Guidebooks, ODA, Frameworx, IGxxx
}

// Document types
export enum DocType {
    DEVELOPER_GUIDE = "developer_guide",
    API_REFERENCE = "api_reference",
    CHEATSHEET = "cheatsheet",
    IMPLEMENTATION_GUIDE = "implementation_guide",
    RELEASE_NOTES = "release_notes",
    WORKBOOK = "workbook",

    // ---- TM Forum ----
    API_SPECIFICATION = "api_specification",   // TMF Open API spec
    INFORMATION_MODEL = "information_model",    // SID
    PROCESS_FRAMEWORK = "process_framework",    // eTOM
    GUIDEBOOK = "guidebook"                      // TMF guidebook / ODA
}

// Subcategories
export enum Subcategory {
    // Core Platform
    APEX = "apex",
    VISUALFORCE = "visualforce",
    LIGHTNING = "lightning",
    SOQL_SOSL = "soql_sosl",
    FORMULAS = "formulas",
    
    // APIs
    REST_API = "rest_api",
    SOAP_API = "soap_api",
    STREAMING_API = "streaming_api",
    TOOLING_API = "tooling_api",
    BULK_API = "bulk_api",
    METADATA_API = "metadata_api",
    SPECIALIZED_APIS = "specialized_apis",
    
    // Dev Tools
    SFDX_CLI = "sfdx_cli",
    PACKAGING = "packaging",
    DEVOPS = "devops",
    MOBILE_SDK = "mobile_sdk",
    
    // Clouds
    SALES_CLOUD = "sales_cloud",
    SERVICE_CLOUD = "service_cloud",
    EXPERIENCE_CLOUD = "experience_cloud",
    MARKETING_CLOUD = "marketing_cloud",
    ANALYTICS_CLOUD = "analytics_cloud",
    INDUSTRY_CLOUDS = "industry_clouds",
    
    // Release Notes
    CURRENT = "current",
    HISTORICAL = "historical",

    // ---- TM Forum domains (shared across Open API & SID) ----
    TMF_PRODUCT = "tmf_product",       // Product domain (catalog, ordering, inventory)
    TMF_SERVICE = "tmf_service",       // Service domain (ordering, inventory, activation)
    TMF_RESOURCE = "tmf_resource",     // Resource domain (function, inventory)
    TMF_PARTY = "tmf_party",           // Party / Customer / engagement domain
    TMF_BILLING = "tmf_billing",       // Account, billing, revenue
    TMF_COMMON = "tmf_common",         // Common / cross-domain APIs & entities
    // ---- TM Forum best-practice subtypes ----
    TMF_ODA = "tmf_oda",               // Open Digital Architecture
    TMF_GUIDEBOOK = "tmf_guidebook",   // General guidebooks / Frameworx / TAM
    TMF_PROCESS = "tmf_process"        // eTOM process decompositions
}

// Ordered list of every category value. Single source of truth for the zod
// enums used by the MCP tool schemas (avoids repeating the list per tool).
export const DOC_CATEGORY_VALUES = Object.values(DocCategory) as [string, ...string[]];

// Ordered list of every source value, for source-filter tool schemas.
export const DOC_SOURCE_VALUES = Object.values(DocSource) as [string, ...string[]];

// Human-readable category labels
export const CATEGORY_LABELS: Record<DocCategory, string> = {
    [DocCategory.CORE_PLATFORM]: "Core Platform (Apex, LWC, Visualforce, SOQL)",
    [DocCategory.APIS]: "APIs (REST, SOAP, Metadata, Bulk, Tooling)",
    [DocCategory.DEV_TOOLS]: "Development Tools (SFDX, VS Code, Packaging)",
    [DocCategory.CLOUDS]: "Clouds & Products (Sales, Service, Experience)",
    [DocCategory.SECURITY]: "Security & Identity",
    [DocCategory.INTEGRATION]: "Integration Patterns",
    [DocCategory.BEST_PRACTICES]: "Best Practices & Limits",
    [DocCategory.RELEASE_NOTES]: "Release Notes",
    [DocCategory.TMF_OPEN_API]: "TMF Open API Specifications",
    [DocCategory.TMF_SID]: "TMF SID (Information Framework)",
    [DocCategory.TMF_ETOM]: "TMF eTOM (Business Process Framework)",
    [DocCategory.TMF_BEST_PRACTICE]: "TMF Guidebooks, ODA & Best Practices"
};

export const SUBCATEGORY_LABELS: Record<Subcategory, string> = {
    [Subcategory.APEX]: "Apex Development",
    [Subcategory.VISUALFORCE]: "Visualforce",
    [Subcategory.LIGHTNING]: "Lightning (LWC & Aura)",
    [Subcategory.SOQL_SOSL]: "SOQL & SOSL",
    [Subcategory.FORMULAS]: "Formulas",
    [Subcategory.REST_API]: "REST API",
    [Subcategory.SOAP_API]: "SOAP API",
    [Subcategory.STREAMING_API]: "Streaming API",
    [Subcategory.TOOLING_API]: "Tooling API",
    [Subcategory.BULK_API]: "Bulk API",
    [Subcategory.METADATA_API]: "Metadata API",
    [Subcategory.SPECIALIZED_APIS]: "Specialized APIs",
    [Subcategory.SFDX_CLI]: "Salesforce CLI",
    [Subcategory.PACKAGING]: "Packaging",
    [Subcategory.DEVOPS]: "DevOps",
    [Subcategory.MOBILE_SDK]: "Mobile SDK",
    [Subcategory.SALES_CLOUD]: "Sales Cloud",
    [Subcategory.SERVICE_CLOUD]: "Service Cloud",
    [Subcategory.EXPERIENCE_CLOUD]: "Experience Cloud",
    [Subcategory.MARKETING_CLOUD]: "Marketing Cloud",
    [Subcategory.ANALYTICS_CLOUD]: "CRM Analytics",
    [Subcategory.INDUSTRY_CLOUDS]: "Industry Clouds",
    [Subcategory.CURRENT]: "Current Releases",
    [Subcategory.HISTORICAL]: "Historical Releases",
    [Subcategory.TMF_PRODUCT]: "Product Domain",
    [Subcategory.TMF_SERVICE]: "Service Domain",
    [Subcategory.TMF_RESOURCE]: "Resource Domain",
    [Subcategory.TMF_PARTY]: "Party / Customer Domain",
    [Subcategory.TMF_BILLING]: "Account & Billing Domain",
    [Subcategory.TMF_COMMON]: "Common / Cross-Domain",
    [Subcategory.TMF_ODA]: "Open Digital Architecture",
    [Subcategory.TMF_GUIDEBOOK]: "Guidebook / Frameworx",
    [Subcategory.TMF_PROCESS]: "eTOM Process"
};

// Document metadata interface
export interface DocumentMetadata {
    id: number;
    fileName: string;
    filePath: string;
    source: DocSource;
    category: DocCategory;
    subcategory: string;
    docType: DocType;
    title: string;
    description?: string;
    keywords: string[];
    apiVersion?: string;
    lastUpdated?: string;
    pageCount?: number;
    sizeBytes?: number;
    priority: number;  // 1-10, for search ranking boost
}

// Document chunk interface
export interface DocumentChunk {
    id: number;
    documentId: number;
    chunkIndex: number;
    content: string;
    sectionTitle?: string;
    pageNumber?: number;
}

// Search result interface
export interface SearchResult {
    document: DocumentMetadata;
    chunk: string;
    score: number;
    matchDensity?: number;  // 0-1, how many search terms matched
    highlights?: string[];
    sectionTitle?: string;
    detectedIntent?: {
        category?: string;
        subcategory?: string;
        confidence: 'high' | 'medium' | 'low';
        description: string;
    };
}

// Search options
export interface SearchOptions {
    source?: DocSource;
    category?: DocCategory;
    subcategory?: string;
    docType?: DocType;
    maxResults?: number;
    intent?: string;
    keywords?: string[];
    minScore?: number;
}

// Category count for listing
export interface CategoryCount {
    category: string;
    count: number;
    subcategories?: { name: string; count: number }[];
}

// Intent classification result
export interface IntentResult {
    intent: string;
    confidence: number;
    suggestedCategory?: DocCategory;
}
