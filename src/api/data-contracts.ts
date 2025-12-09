/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/** Request to save user payment template. Template allows quick reuse of payment parameters for repeat transactions. If template with same providerId and serviceId exists, it will be updated (upsert behavior). */
export interface SaveTemplateRequest {
  /**
   * Provider identifier from Paynet (vendor_id). This is the external Paynet provider ID, NOT the internal database UUID.
   * @format int64
   * @example 9457
   */
  providerId: number;
  /**
   * Service identifier from Paynet (vendor_id). This is the external Paynet service ID, NOT the internal database UUID.
   * @format int64
   * @example 1201
   */
  serviceId: number;
  /**
   * Category identifier from Paynet (vendor_id). Optional field for reference. This is the external Paynet category ID.
   * @format int64
   * @example 17
   */
  categoryId?: number | null;
  /**
   * User-friendly template name. Optional field for template identification in UI.
   * @example "Оплата Uztelecom"
   */
  templateName?: string | null;
  /**
   * Payment parameters to be saved in template. Structure is flexible and service-specific. Common fields: accountNumber, phone, amount, contractNumber, etc. Fields must match service's request_field configuration.
   * @example {"accountNumber":"123456789","amount":50000,"phone":"+998901234567"}
   */
  templateData: Record<string, object>;
}

/** Response after saving user payment template. Contains template identifier, operation status, and whether template was created or updated. */
export interface SaveTemplateResponse {
  /**
   * Template identifier (UUID). This is the internal database ID of the created or updated template.
   * @format uuid
   * @example "550e8400-e29b-41d4-a716-446655440000"
   */
  id: string;
  /**
   * Operation status. Always 'success' for successful save operations.
   * @example "success"
   */
  status: string;
  /**
   * Human-readable message describing the operation result.
   * @example "Template saved successfully"
   */
  message: string;
  /**
   * Indicates whether the template was created (true) or updated (false). Used by controller to determine HTTP status code: 201 Created for new templates, 200 OK for updates.
   * @example true
   */
  created: boolean;
}

/** Execution request containing field values and currency code. All field values must be strings. Field names must match service's request_field configuration. */
export interface ExecuteRequest {
  /**
   * Map of field names to field values. All values must be strings (e.g., amount should be "10000" not 10000). Field names must match exactly the 'name' field from service's request_field configuration. Required fields are determined by the service configuration.
   * @example {"account":"998901234567","amount":"10000"}
   */
  fields: Record<string, string>;
  /**
   * Currency code in ISO 4217 format (e.g., 'UZS', 'USD', 'EUR'). Used for payment amount formatting and validation.
   * @pattern ^[A-Z]{3}$
   * @example "UZS"
   */
  currency: string;
}

/** Response from service execution. Structure varies by service type and execution result. INFO services return SUCCESS status with response fields. PAYMENT services return operation status with operation/invoice IDs. Errors return FAILED status with error code and localized message. */
export interface ExecuteResponse {
  /**
   * Execution status: SUCCESS (info service completed), INITIAL (payment operation created), PENDING (payment in progress), FAILED (execution failed with error)
   * @example "SUCCESS"
   */
  status: "SUCCESS" | "INITIAL" | "PENDING" | "FAILED";
  /**
   * Service type: INFO for information services, PAYMENT for payment services
   * @example "INFO"
   */
  type: "INFO" | "PAYMENT";
  /**
   * Service identifier that was executed
   * @format int64
   * @example 5001
   */
  serviceId: number;
  /**
   * Operation identifier. Only present for PAYMENT services. Used for tracking payment status and idempotency.
   * @format int64
   * @example 120045
   */
  operationId?: number | null;
  /**
   * Invoice identifier from acquiring-service. Only present for PAYMENT services. Used for payment tracking.
   * @example "INV-845390"
   */
  invoiceId?: string | null;
  /**
   * Error code for failed executions. Format: PAYNET_XXX for Paynet errors, or custom error codes. Only present when status=FAILED.
   * @example "PAYNET_105"
   */
  errorCode?: string | null;
  /** Localized message in Russian, Uzbek, and English. Used for displaying user-friendly labels and messages in the appropriate language. */
  message?: LocalizedMessage;
  /**
   * Response fields array with localized labels and values. Mapped from Paynet response according to response_field configuration. Only present for successful executions (status=SUCCESS or status=INITIAL/PENDING).
   * @example []
   */
  response?: ResponseFieldItem[] | null;
}

/** Localized message in Russian, Uzbek, and English. Used for displaying user-friendly labels and messages in the appropriate language. */
export interface LocalizedMessage {
  /**
   * Text in Russian
   * @example "Статус платежа"
   */
  ru: string;
  /**
   * Text in Uzbek
   * @example "To'lov holati"
   */
  uz: string;
  /**
   * Text in English
   * @example "Payment status"
   */
  en: string;
}

/** Response field item with localized label and value. Used for displaying operation execution results (e.g., payment status, transaction details, account balance). Fields are mapped from operation.response_data according to service.response_field configuration. */
export type ResponseFieldItem = {
  /** Localized message in Russian, Uzbek, and English. Used for displaying user-friendly labels and messages in the appropriate language. */
  label: LocalizedMessage;
  /**
   * Field value as string. Format depends on field type (e.g., amount, date, text, status). Values come from Paynet API response or operation processing results.
   * @example "Успешно выполнен"
   */
  value: string;
} | null;

/** Pre-filled form structure based on user's saved template. Contains service metadata and form fields with values from template. This is NOT a payment execution - it only pre-fills the form for user review. */
export interface ExecuteTemplateResponse {
  /** Service metadata including identifier, provider ID, and localized title */
  service: ServiceInfo;
  /**
   * Form fields with pre-filled values from template. Each field includes name, localized title, value from template_data, and metadata (required, read_only, type).
   * @example []
   */
  fields: TemplateFieldDto[];
}

/** Service metadata including identifier, provider ID, and localized title */
export interface ServiceInfo {
  /**
   * Service identifier (vendor_id from Paynet). This is the external service ID, NOT the internal database UUID.
   * @format int64
   * @example 123
   */
  id: number;
  /**
   * Provider identifier (vendor_id from Paynet) this service belongs to. This is the external provider ID, NOT the internal database UUID.
   * @format int64
   * @example 45
   */
  providerId: number;
  /** Localized title in three languages: Russian (ru), Uzbek (uz), and English (en). All fields are optional, but at least one should be provided. Frontend should use the appropriate language based on user preference, falling back to Russian if preferred language is not available. */
  title: TitleDto;
}

/**
 * Form field with pre-filled value from template_data. Includes field name, localized title, value from template, and metadata.
 * @example []
 */
export interface TemplateFieldDto {
  /**
   * Field name used in request body. Must match exactly when submitting execute request.
   * @example "phone"
   */
  name: string;
  /** Localized title in three languages: Russian (ru), Uzbek (uz), and English (en). All fields are optional, but at least one should be provided. Frontend should use the appropriate language based on user preference, falling back to Russian if preferred language is not available. */
  title: TitleDto;
  /**
   * Pre-filled value from template_data. Value is always returned as string, even for numeric fields. May be null if field is not present in template_data.
   * @example "+998901234567"
   */
  value?: string | null;
  /**
   * Whether this field is required for service execution
   * @example true
   */
  required: boolean;
  /**
   * Whether this field is read-only (cannot be edited by user)
   * @example false
   */
  readOnly: boolean;
  /**
   * Field type (text, number, date, etc.) for frontend form rendering
   * @example "text"
   */
  type: string;
}

/** Localized title in three languages: Russian (ru), Uzbek (uz), and English (en). All fields are optional, but at least one should be provided. Frontend should use the appropriate language based on user preference, falling back to Russian if preferred language is not available. */
export interface TitleDto {
  /**
   * Title in Russian language
   * @example "Мобильная связь"
   */
  ru?: string;
  /**
   * Title in Uzbek language
   * @example "Mobil aloqa"
   */
  uz?: string;
  /**
   * Title in English language
   * @example "Mobile communication"
   */
  en?: string;
}

/** Payment confirmation callback from acquiring-service. Notifies payment-service about invoice payment status (success or failure). This is an internal endpoint for inter-service communication. */
export interface PaymentCallbackRequest {
  /**
   * Invoice identifier from acquiring-service. Used to find the corresponding operation in payment-service database.
   * @example "INV-845390"
   */
  invoiceId: string;
  /**
   * Payment status from acquiring-service. SUCCESS: Payment was successful, proceed with Paynet transaction. FAILED: Payment failed, set operation status to FAILED.
   * @example "SUCCESS"
   */
  status: "SUCCESS" | "FAILED";
}

/** Request for exporting operations to file (CSV or XLSX) */
export interface ExportOperationsRequest {
  /**
   * Start of date range for filtering operations (ISO 8601 format)
   * @format date-time
   * @example "2025-09-01T00:00:00Z"
   */
  createdAtFrom?: string;
  /**
   * End of date range for filtering operations (ISO 8601 format)
   * @format date-time
   * @example "2025-09-30T23:59:59Z"
   */
  createdAtTo?: string;
  /**
   * Operation status filter (SUCCESS, FAILED, PENDING, CANCELLED, optional)
   * @example "SUCCESS"
   */
  status?: string;
  /**
   * Service vendor ID filter (external Paynet ID, optional)
   * @format int64
   * @example 201
   */
  serviceId?: number;
  /**
   * Invoice ID filter (optional)
   * @example "INV-12345"
   */
  invoiceId?: string;
  /**
   * User ID filter (UUID, optional)
   * @format uuid
   * @example "550e8400-e29b-41d4-a716-446655440000"
   */
  userId?: string;
  /**
   * Channel code filter (gateway: PAYNET, OCTOGAMES, etc., optional)
   * @example "PAYNET"
   */
  channelCode?: string;
  /**
   * Export file format: 'csv' or 'xlsx'
   * @pattern ^(csv|xlsx)$
   * @example "csv"
   */
  format: "csv" | "xlsx";
}

/** Response after initiating operation export */
export interface ExportOperationsResponse {
  /**
   * Export identifier for tracking export status
   * @example "exp_20251008_0001"
   */
  exportId: string;
  /**
   * Current status of the export
   * @example "PENDING"
   */
  status: "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED";
  /**
   * Timestamp when export was created (ISO 8601)
   * @format date-time
   * @example "2025-10-08T12:00:00Z"
   */
  createdAt: string;
}

/** Provider images: vendor logo and optional custom theme variants. Vendor image is the standard provider logo from Paynet CDN. Custom images are optional and may be null if not configured. */
export interface ProviderImagesDto {
  /**
   * URL to vendor-provided provider logo. This is the standard logo from Paynet CDN. Typically required.
   * @example "https://cdn.paynet.uz/images/providers/uztelecom.png"
   */
  vendorImageUrl: string;
  /**
   * URL to custom provider image for light theme. Used when application is in light mode. Optional.
   * @example "https://cdn.paynet.uz/custom/light/uztelecom.png"
   */
  customLight?: string | null;
  /**
   * URL to custom provider image for dark theme. Used when application is in dark mode. Optional.
   * @example "https://cdn.paynet.uz/custom/dark/uztelecom.png"
   */
  customDark?: string | null;
}

/** Request to update provider data. All fields are optional for partial updates (PATCH semantics). Only provided fields will be updated, other fields remain unchanged. */
export interface UpdateProviderRequest {
  /** Localized title in three languages: Russian (ru), Uzbek (uz), and English (en). All fields are optional, but at least one should be provided. Frontend should use the appropriate language based on user preference, falling back to Russian if preferred language is not available. */
  title?: TitleDto;
  /**
   * Display order for sorting providers within category. Lower values appear first. Optional field. If provided, must be >= 1.
   * @format int32
   * @min 1
   * @example 2
   */
  order?: number | null;
  /** Provider images: vendor logo and optional custom theme variants. Vendor image is the standard provider logo from Paynet CDN. Custom images are optional and may be null if not configured. */
  images?: ProviderImagesDto;
  /**
   * Whether this provider is enabled and visible to users. Optional field. If provided, must be a boolean value (true or false). Disabled providers (isEnabled=false) are hidden from regular catalog endpoints but visible in admin endpoints for management purposes.
   * @example true
   */
  isEnabled?: boolean | null;
}

/**
 * Admin provider response with full information including administrative fields. Contains all provider data needed for administrative operations and editing.
 * @example []
 */
export interface AdminProviderResponseDto {
  /**
   * Provider identifier from Paynet (vendor_id). This is the external Paynet provider ID, NOT the internal database UUID. Internal UUIDs are never exposed in API responses.
   * @format int64
   * @example 101
   */
  id: number;
  /**
   * Provider vendor identifier from Paynet (same as id). This is the external Paynet provider ID used for API operations.
   * @format int64
   * @example 5001
   */
  vendorId: number;
  /** Localized title in three languages: Russian (ru), Uzbek (uz), and English (en). All fields are optional, but at least one should be provided. Frontend should use the appropriate language based on user preference, falling back to Russian if preferred language is not available. */
  title: TitleDto;
  /**
   * Display order for sorting providers within category. Lower values appear first.
   * @format int32
   * @min 1
   * @example 1
   */
  order: number;
  /** Provider images: vendor logo and optional custom theme variants. Vendor image is the standard provider logo from Paynet CDN. Custom images are optional and may be null if not configured. */
  images: ProviderImagesDto;
  /**
   * Whether this provider is enabled and visible to users. Disabled providers (isEnabled=false) are hidden from regular catalog endpoints but visible in admin endpoints for management purposes.
   * @example true
   */
  isEnabled: boolean;
  /**
   * Timestamp when provider was created in the system
   * @format date-time
   * @example "2025-06-01T09:00:00Z"
   */
  createdAt: string;
  /**
   * Timestamp when provider was last updated
   * @format date-time
   * @example "2025-09-25T12:40:00Z"
   */
  updatedAt: string;
}

/** Response after successfully updating a provider. Contains the updated provider with full administrative information. */
export interface UpdateProviderResponse {
  /** Admin provider response with full information including administrative fields. Contains all provider data needed for administrative operations and editing. */
  provider: AdminProviderResponseDto;
}

/** Request to update response field data. All fields are optional for partial updates (PATCH semantics). Only provided fields will be updated, other fields remain unchanged. */
export interface UpdateResponseFieldRequest {
  /** Localized title in three languages: Russian (ru), Uzbek (uz), and English (en). All fields are optional, but at least one should be provided. Frontend should use the appropriate language based on user preference, falling back to Russian if preferred language is not available. */
  label?: TitleDto;
  /**
   * Display order for sorting fields. Lower values appear first. Optional field. If provided, must be >= 1.
   * @format int32
   * @min 1
   * @example 2
   */
  order?: number | null;
  /**
   * Whether this field is enabled and visible to users. Optional field. If provided, must be a boolean value (true or false). Disabled fields (isEnabled=false) are hidden from regular endpoints but visible in admin endpoints for management purposes.
   * @example true
   */
  isEnabled?: boolean | null;
  /**
   * Field control type (e.g., 'input', 'select', 'textarea'). Optional field. If provided, must be a valid control type.
   * @example "input"
   */
  fieldControl?: string | null;
  /**
   * Field size (maximum length or width). Optional field. If provided, must be > 0.
   * @format int32
   * @min 1
   * @example 12
   */
  fieldSize?: number | null;
  /** Field values (JSON array for select/dropdown fields). Optional field. If provided, must be valid JSON array. If null is provided, field values will be cleared. */
  fieldValues?: string | null;
}

/** Request field definition with full metadata for administrative field management. Represents an input field that users must fill when creating a service request. */
export interface AdminRequestFieldDto {
  /**
   * Sequential field identifier (1, 2, 3...) assigned based on position in sorted list. This is NOT the database UUID and NOT Paynet vendor_id. It's a simple sequential number for API response ordering. Database uses UUID internally, but API exposes sequential IDs for compatibility.
   * @format int64
   * @example 1
   */
  id: number;
  /**
   * Field name used in request body. Must match exactly when submitting execute request.
   * @example "phoneNumber"
   */
  name: string;
  /** Localized title in three languages: Russian (ru), Uzbek (uz), and English (en). All fields are optional, but at least one should be provided. Frontend should use the appropriate language based on user preference, falling back to Russian if preferred language is not available. */
  title: TitleDto;
  /**
   * Whether this field is required for service execution
   * @example true
   */
  required: boolean;
  /**
   * Whether this field is read-only (cannot be edited by user)
   * @example false
   */
  readOnly: boolean;
  /**
   * Field data type: string, decimal, number, date, etc. Used for validation and formatting.
   * @example "string"
   */
  fieldType: string;
  /**
   * UI control type for rendering: input, select, datepicker, etc. Determines which frontend component to use.
   * @example "input"
   */
  fieldControl: string;
  /**
   * Maximum field size (character length for strings, precision for numbers)
   * @format int32
   * @min 1
   * @example 12
   */
  fieldSize: number;
  /**
   * JSON string containing available values for SELECT controls. Format: JSON object or array. Null for non-SELECT fields.
   * @example "null"
   */
  fieldValues?: string | null;
  /**
   * Whether this field represents customer identifier. Used for user favorites and history tracking.
   * @example true
   */
  isCustomerId: boolean;
  /**
   * Display order for sorting fields in form. Lower values appear first.
   * @format int32
   * @min 1
   * @example 1
   */
  order: number;
}

/** Response field definition with full metadata for administrative field management. Represents an output field that may be returned by Paynet in service response. */
export interface AdminResponseFieldDto {
  /**
   * Sequential field identifier (1, 2, 3...) assigned based on position in sorted list. This is NOT the database UUID and NOT Paynet vendor_id. It's a simple sequential number for API response ordering. Database uses UUID internally, but API exposes sequential IDs for compatibility.
   * @format int64
   * @example 1
   */
  id: number;
  /**
   * Field name as returned by Paynet API. This name is used to extract field value from Paynet response.
   * @example "abonentName"
   */
  fieldName: string;
  /** Localized title in three languages: Russian (ru), Uzbek (uz), and English (en). All fields are optional, but at least one should be provided. Frontend should use the appropriate language based on user preference, falling back to Russian if preferred language is not available. */
  label: TitleDto;
  /**
   * Display order for sorting fields in response. Lower values appear first.
   * @format int32
   * @min 1
   * @example 1
   */
  order: number;
  /**
   * Whether this field is enabled and should be displayed in response. Disabled fields (isEnabled=false) are not included in service responses.
   * @example true
   */
  isEnabled: boolean;
}

/** Response after successfully updating a field. Contains the updated field with full administrative information. */
export interface UpdateFieldResponse {
  /**
   * Updated field ID (sequential number from API, not database UUID)
   * @format int64
   * @example 12
   */
  id: number;
  /**
   * Service vendor ID (external Paynet ID, NOT internal UUID)
   * @format int64
   * @example 201
   */
  serviceId: number;
  /**
   * Field type: 'request' for input fields, 'response' for output fields
   * @example "request"
   */
  type: string;
  /** Request field definition with full metadata for administrative field management. Represents an input field that users must fill when creating a service request. */
  requestField?: AdminRequestFieldDto;
  /** Response field definition with full metadata for administrative field management. Represents an output field that may be returned by Paynet in service response. */
  responseField?: AdminResponseFieldDto;
  /**
   * Timestamp when field was last updated
   * @format date-time
   * @example "2025-10-08T08:30:00Z"
   */
  updatedAt: string;
}

/** Request to update request field data. All fields are optional for partial updates (PATCH semantics). Only provided fields will be updated, other fields remain unchanged. */
export interface UpdateRequestFieldRequest {
  /** Localized title in three languages: Russian (ru), Uzbek (uz), and English (en). All fields are optional, but at least one should be provided. Frontend should use the appropriate language based on user preference, falling back to Russian if preferred language is not available. */
  title?: TitleDto;
  /**
   * Whether this field is required when submitting service request. Optional field. If provided, must be a boolean value (true or false).
   * @example true
   */
  required?: boolean | null;
  /**
   * Whether this field is read-only (cannot be edited by user). Optional field. If provided, must be a boolean value (true or false).
   * @example false
   */
  readOnly?: boolean | null;
  /**
   * Field type (e.g., 'string', 'decimal', 'integer'). Optional field. If provided, must be a valid field type.
   * @example "string"
   */
  fieldType?: string | null;
  /**
   * Field control type (e.g., 'input', 'select', 'textarea'). Optional field. If provided, must be a valid control type.
   * @example "input"
   */
  fieldControl?: string | null;
  /**
   * Field size (maximum length or width). Optional field. If provided, must be > 0.
   * @format int32
   * @min 1
   * @example 12
   */
  fieldSize?: number | null;
  /** Field values (JSON array for select/dropdown fields). Optional field. If provided, must be valid JSON array. If null is provided, field values will be cleared. */
  fieldValues?: string | null;
  /**
   * Display order for sorting fields. Lower values appear first. Optional field. If provided, must be >= 1.
   * @format int32
   * @min 1
   * @example 1
   */
  order?: number | null;
}

/** Request to update category data. All fields are optional for partial updates (PATCH semantics). Only provided fields will be updated, other fields remain unchanged. */
export interface UpdateCategoryRequest {
  /** Localized title in three languages: Russian (ru), Uzbek (uz), and English (en). All fields are optional, but at least one should be provided. Frontend should use the appropriate language based on user preference, falling back to Russian if preferred language is not available. */
  title?: TitleDto;
  /**
   * Display order for sorting categories. Lower values appear first. Optional field. If provided, must be >= 1.
   * @format int32
   * @min 1
   * @example 2
   */
  order?: number | null;
  /**
   * URL to category custom image. Optional field. If provided, must be a valid URL format. Typically hosted on CDN (e.g., cdn.paynet.uz). This field maps to custom_dark_image_url in database. If null is provided, the image URL will be cleared.
   * @pattern ^(https?://.+)?$
   * @example "https://cdn.paynet.uz/images/categories/dark/mobile.png"
   */
  customImages?: string | null;
  /**
   * Whether this category is enabled and visible to users. Optional field. If provided, must be a boolean value (true or false). Disabled categories (isEnabled=false) are hidden from regular catalog endpoints but visible in admin endpoints for management purposes.
   * @example true
   */
  isEnabled?: boolean | null;
}

/**
 * Admin category response with full information including administrative fields. Contains all category data needed for administrative operations and editing.
 * @example []
 */
export interface AdminCategoryResponseDto {
  /**
   * Category identifier from Paynet (vendor_id). This is the external Paynet category ID, NOT the internal database UUID. Internal UUIDs are never exposed in API responses.
   * @format int64
   * @example 1
   */
  id: number;
  /**
   * Category vendor identifier from Paynet (same as id). This is the external Paynet category ID used for API operations.
   * @format int64
   * @example 101
   */
  vendorId: number;
  /** Localized title in three languages: Russian (ru), Uzbek (uz), and English (en). All fields are optional, but at least one should be provided. Frontend should use the appropriate language based on user preference, falling back to Russian if preferred language is not available. */
  title: TitleDto;
  /**
   * Display order for sorting categories. Lower values appear first.
   * @format int32
   * @min 1
   * @example 1
   */
  order: number;
  /**
   * URL to category custom image. Image is optional and may be null if not configured. Typically hosted on CDN (e.g., cdn.paynet.uz).
   * @example "https://cdn.paynet.uz/images/categories/dark/mobile.png"
   */
  customImages?: string | null;
  /**
   * Whether this category is enabled and visible to users. Disabled categories (isEnabled=false) are hidden from regular catalog endpoints but visible in admin endpoints for management purposes.
   * @example true
   */
  isEnabled: boolean;
  /**
   * Timestamp when category was created in the system
   * @format date-time
   * @example "2025-10-08T08:00:00Z"
   */
  createdAt: string;
  /**
   * Timestamp when category was last updated
   * @format date-time
   * @example "2025-10-08T09:00:00Z"
   */
  updatedAt: string;
}

/** Response after successfully updating a category. Contains the updated category with full administrative information. */
export interface UpdateCategoryResponse {
  /** Admin category response with full information including administrative fields. Contains all category data needed for administrative operations and editing. */
  category: AdminCategoryResponseDto;
}

/**
 * Request field definition with metadata for frontend form rendering. Each field specifies validation rules, control type, localized labels, and display order.
 * @example []
 */
export interface ServiceFieldResponseDto {
  /**
   * Field identifier in database. This is an internal identifier and is not required for API operations. Frontend should use 'name' field for field identification.
   * @format int64
   * @example 9001
   */
  id?: number | null;
  /**
   * Field name used in request body. Must match exactly when submitting execute request.
   * @example "account"
   */
  name: string;
  /** Localized title in three languages: Russian (ru), Uzbek (uz), and English (en). All fields are optional, but at least one should be provided. Frontend should use the appropriate language based on user preference, falling back to Russian if preferred language is not available. */
  title: TitleDto;
  /**
   * Whether this field is required for service execution
   * @example true
   */
  required: boolean;
  /**
   * Whether this field is read-only (cannot be edited by user)
   * @example false
   */
  readOnly: boolean;
  /**
   * Field data type: STRING, NUMBER, DECIMAL, DATE, etc. Used for validation and formatting.
   * @example "STRING"
   */
  fieldType: "STRING" | "NUMBER" | "DECIMAL" | "DATE" | "BOOLEAN";
  /**
   * UI control type for rendering: TEXT_INPUT, NUMBER_INPUT, SELECT, DATE_PICKER, etc. Determines which frontend component to use.
   * @example "TEXT_INPUT"
   */
  fieldControl:
    | "TEXT_INPUT"
    | "NUMBER_INPUT"
    | "SELECT"
    | "DATE_PICKER"
    | "CHECKBOX";
  /**
   * Maximum field size (character length for strings, precision for numbers)
   * @format int32
   * @min 1
   * @example 20
   */
  fieldSize: number;
  /**
   * JSON string containing available values for SELECT controls. Format: JSON object or array. Null for non-SELECT fields.
   * @example "null"
   */
  fieldValues?: string | null;
  /**
   * Whether this field represents customer identifier. Used for user favorites and history tracking.
   * @example true
   */
  isCustomerId: boolean;
  /**
   * Display order for sorting fields in form. Lower values appear first.
   * @format int32
   * @min 1
   * @example 1
   */
  order: number;
}

/**
 * Payment service with request fields and metadata. Services can be payment type (isPayment=true) for actual payments or info type (isPayment=false) for data retrieval/validation. Each service includes all request fields needed for frontend form rendering.
 * @example []
 */
export interface ServiceResponseDto {
  /**
   * Service identifier. Mapped from vendor_id in database. This is the external ID used by Paynet API.
   * @format int64
   * @example 321
   */
  id: number;
  /**
   * Provider identifier this service belongs to
   * @format int64
   * @example 101
   */
  providerId: number;
  /** Localized title in three languages: Russian (ru), Uzbek (uz), and English (en). All fields are optional, but at least one should be provided. Frontend should use the appropriate language based on user preference, falling back to Russian if preferred language is not available. */
  title: TitleDto;
  /**
   * Display order for sorting services within provider. Lower values appear first.
   * @format int32
   * @min 1
   * @example 1
   */
  order: number;
  /**
   * Parent service ID for hierarchical services. Null for top-level services.
   * @format int64
   */
  parentId?: number | null;
  /**
   * Child service ID for multi-level services. Null if service has no child.
   * @format int64
   */
  childId?: number | null;
  /**
   * Merchant Category Code (MCC) for payment categorization. Used for transaction classification. Null for info services.
   * @example "4814"
   */
  mcc?: string | null;
  /**
   * Service type flag: true for payment services, false for info services. Payment services create invoices and operations. Info services perform synchronous data retrieval/validation.
   * @example true
   */
  isPayment: boolean;
  /**
   * List of request fields required for service execution. Fields are sorted by order and include metadata for frontend rendering: field type, control type, validation rules, localized labels, etc.
   * @example []
   */
  fields: ServiceFieldResponseDto[];
}

/** Response containing list of active and available services for the specified provider. Services are sorted by display order (order field, ascending). Only services with is_enabled=true and is_available=true are included. Each service includes all request fields needed for frontend form rendering. */
export interface ServicesResponse {
  /**
   * List of active services for the provider with their request fields, sorted by display order
   * @example []
   */
  services: ServiceResponseDto[];
}

/**
 * Payment service provider with localized titles and images. Providers belong to a category and offer multiple services.
 * @example []
 */
export interface ProviderResponseDto {
  /**
   * Provider identifier from Paynet (vendor_id). This is the external Paynet provider ID, NOT the internal database UUID. Internal UUIDs are never exposed in API responses.
   * @format int64
   * @example 9457
   */
  id: number;
  /**
   * Category identifier from Paynet (vendor_id) this provider belongs to. This is the external Paynet category ID, NOT the internal database UUID.
   * @format int64
   * @example 17
   */
  categoryId: number;
  /** Localized title in three languages: Russian (ru), Uzbek (uz), and English (en). All fields are optional, but at least one should be provided. Frontend should use the appropriate language based on user preference, falling back to Russian if preferred language is not available. */
  title: TitleDto;
  /**
   * Display order for sorting providers within category. Lower values appear first.
   * @format int32
   * @min 1
   * @example 10
   */
  order: number;
  /** Provider images: vendor logo and optional custom theme variants. Vendor image is the standard provider logo from Paynet CDN. Custom images are optional and may be null if not configured. */
  images: ProviderImagesDto;
}

/** Response containing list of active providers for the specified category. Providers are sorted by display order (order field, ascending). Only providers with is_enabled=true for the category are included. */
export interface ProvidersResponse {
  /**
   * List of active providers for the category, sorted by display order
   * @example []
   */
  providers: ProviderResponseDto[];
}

/** Single template item containing provider information and saved payment parameters. The id field is the provider's Paynet vendor_id, NOT the internal database UUID. */
export interface TemplateItemDto {
  /**
   * Provider identifier from Paynet (vendor_id). This is the external Paynet provider ID, NOT the internal database UUID. Internal UUIDs are never exposed in API responses.
   * @format int64
   * @example 9457
   */
  id: number;
  /**
   * Category identifier from Paynet (vendor_id) this provider belongs to. This is the external Paynet category ID, NOT the internal database UUID.
   * @format int64
   * @example 17
   */
  categoryId: number;
  /**
   * Saved payment parameters as flexible JSON structure. Contains service-specific fields such as accountNumber, phone, amount, etc. Structure depends on the service's request_field configuration.
   * @example {"phone":"998901234567","account":"123456789"}
   */
  templateData: Record<string, object>;
  /** Localized title in three languages: Russian (ru), Uzbek (uz), and English (en). All fields are optional, but at least one should be provided. Frontend should use the appropriate language based on user preference, falling back to Russian if preferred language is not available. */
  title: TitleDto;
  /**
   * Display order for sorting providers within category. Lower values appear first.
   * @format int32
   * @min 1
   * @example 10
   */
  order: number;
  /** Provider images: vendor logo and optional custom theme variants. Vendor image is the standard provider logo from Paynet CDN. Custom images are optional and may be null if not configured. */
  images: ProviderImagesDto;
}

/** Response containing list of user's saved payment templates. Each template includes provider information (vendor_id, category_id, title, images) and saved payment parameters (templateData). Returns empty array if user has no templates. */
export interface TemplatesResponse {
  /** List of user's saved payment templates. Each template represents a saved payment configuration for quick reuse. Empty array if user has no templates. */
  providers: TemplateItemDto[];
}

/**
 * Favorite provider item with usage score. Providers are ranked by score (number of successful operations).
 * @example []
 */
export interface FavoriteItemDto {
  /**
   * Provider identifier from Paynet (vendor_id). This is the external Paynet provider ID, NOT the internal database UUID.
   * @format int64
   * @example 9457
   */
  id: number;
  /**
   * Category identifier from Paynet (vendor_id) this provider belongs to. This is the external Paynet category ID, NOT the internal database UUID.
   * @format int64
   * @example 17
   */
  categoryId: number;
  /** Localized title in three languages: Russian (ru), Uzbek (uz), and English (en). All fields are optional, but at least one should be provided. Frontend should use the appropriate language based on user preference, falling back to Russian if preferred language is not available. */
  title: TitleDto;
  /**
   * Usage score - number of successful operations with this provider. Higher score means provider appears higher in favorites list. Score is incremented on each successful payment.
   * @format int32
   * @min 1
   * @example 25
   */
  score: number;
  /** Provider images: vendor logo and optional custom theme variants. Vendor image is the standard provider logo from Paynet CDN. Custom images are optional and may be null if not configured. */
  images: ProviderImagesDto;
}

/** Response containing user's favorite providers. Providers are sorted by usage score (number of successful operations) in descending order. Only active providers are included. Returns top 10 providers by default. */
export interface FavoritesResponse {
  /**
   * List of favorite providers sorted by score (descending). Returns empty array if user has no favorites or all favorite providers are disabled.
   * @example []
   */
  favorites: FavoriteItemDto[];
}

/** Operation status response containing current operation state and related information. Response fields are populated based on service.response_field configuration and operation.response_data. */
export interface OperationStatusResponse {
  /**
   * Current operation status. INITIAL: Operation created, payment not yet initiated. PENDING: Payment in progress, awaiting completion. SUCCESS: Payment completed successfully. FAILED: Payment failed (check errorCode and message for details). CANCELLED: Operation was cancelled. REFUNDED: Payment was refunded. EXPIRED: Operation expired.
   * @example "SUCCESS"
   */
  status:
    | "INITIAL"
    | "PENDING"
    | "SUCCESS"
    | "FAILED"
    | "CANCELLED"
    | "REFUNDED"
    | "EXPIRED";
  /**
   * Operation type: INFO for information services, PAYMENT for payment services. Determined from service.is_payment field.
   * @example "PAYMENT"
   */
  type: "INFO" | "PAYMENT";
  /**
   * Service identifier that was executed. Mapped from service.vendor_id in database. This is the external Paynet service ID (Long), not the internal UUID primary key.
   * @format int64
   * @example 5001
   */
  serviceId: number;
  /**
   * Operation identifier (operation.operationId field, String UUID). This is the same ID used in the endpoint path parameter. Used for tracking and idempotency.
   * @example "550e8400-e29b-41d4-a716-446655440000"
   */
  operationId?: string | null;
  /**
   * Invoice identifier from acquiring-service. Only present for payment services. Used for payment tracking and reconciliation.
   * @example "INV-845390"
   */
  invoiceId?: string | null;
  /** Response fields array with localized labels and values. Mapped from operation.response_data according to service.response_field configuration. Contains operation results (e.g., payment status, transaction details). Only present when operation has response data. */
  response?: ResponseFieldItem[] | null;
  /**
   * Operation amount in minor units (e.g., 1000 for 1000.00). Mapped from operation.amount field.
   * @example 1000
   */
  amount?: number | null;
  /**
   * Operation currency code (ISO 4217, 3 letters). Mapped from operation.currency field.
   * @example "UZS"
   */
  currency?: string | null;
  /**
   * Operation creation timestamp in ISO-8601 format. Mapped from operation.created_at field.
   * @format date-time
   * @example "2025-10-08T12:34:56.789Z"
   */
  createdAt?: string | null;
}

/** Response containing list of active payment service categories. Categories are sorted by display order (order field, ascending). Only categories with is_enabled=true are included. */
export interface CategoriesResponse {
  /**
   * List of active categories, sorted by display order
   * @example []
   */
  categories: CategoryResponseDto[];
}

/** Category images for light and dark themes. Both fields are optional and may be null if custom images are not configured. Images are typically hosted on CDN (e.g., cdn.paynet.uz). */
export interface CategoryImagesDto {
  /**
   * URL to category image for light theme. Used when application is in light mode.
   * @example "https://cdn.paynet.uz/images/categories/light/mobile.png"
   */
  customLight?: string | null;
  /**
   * URL to category image for dark theme. Used when application is in dark mode.
   * @example "https://cdn.paynet.uz/images/categories/dark/mobile.png"
   */
  customDark?: string | null;
}

/**
 * Payment service category with localized titles and theme images. Categories are used to group providers for navigation in the payment catalog.
 * @example []
 */
export interface CategoryResponseDto {
  /**
   * Category identifier from Paynet (vendor_id). This is the external Paynet category ID, NOT the internal database UUID. Internal UUIDs are never exposed in API responses.
   * @format int64
   * @example 17
   */
  id: number;
  /** Localized title in three languages: Russian (ru), Uzbek (uz), and English (en). All fields are optional, but at least one should be provided. Frontend should use the appropriate language based on user preference, falling back to Russian if preferred language is not available. */
  title: TitleDto;
  /**
   * Display order for sorting categories. Lower values appear first.
   * @format int32
   * @min 1
   * @example 1
   */
  order: number;
  /** Category images for light and dark themes. Both fields are optional and may be null if custom images are not configured. Images are typically hosted on CDN (e.g., cdn.paynet.uz). */
  images?: CategoryImagesDto;
}

/** Service fields response containing both request fields (input) and response fields (output). Both collections are sorted by order (ascending). Used for administrative field management and UI configuration. */
export interface AdminServiceFieldsResponse {
  /**
   * Service vendor ID (external Paynet ID). This is the external Paynet service ID used for API operations.
   * @format int64
   * @example 201
   */
  serviceId: number;
  /** Request fields (input fields) that users must fill when creating a service request. Sorted by order (ascending). */
  requestFields: AdminRequestFieldDto[];
  /** Response fields (output fields) that may be returned by Paynet in service response. Sorted by order (ascending). */
  responseFields: AdminResponseFieldDto[];
}

/** Response containing list of all providers for the specified category. Providers are sorted by display order (order field, ascending). Includes both enabled and disabled providers for administrative management. */
export interface AdminProvidersResponse {
  /**
   * Category identifier from Paynet (vendor_id). This is the external Paynet category ID, NOT the internal database UUID.
   * @format int64
   * @example 1
   */
  categoryId: number;
  /**
   * List of all providers for the category (including disabled), sorted by display order
   * @example []
   */
  providers: AdminProviderResponseDto[];
}

/**
 * Admin service response with full information including administrative fields. Used for administrative service management and editing. Includes all services regardless of isEnabled and isAvailable status.
 * @example []
 */
export interface AdminServiceResponseDto {
  /**
   * Service identifier. Mapped from vendor_id in database. This is the external Paynet service ID used for API operations.
   * @format int64
   * @example 201
   */
  id: number;
  /**
   * Service vendor ID (external Paynet ID). Same as id per API specification.
   * @format int64
   * @example 7001
   */
  vendorId: number;
  /** Localized title in three languages: Russian (ru), Uzbek (uz), and English (en). All fields are optional, but at least one should be provided. Frontend should use the appropriate language based on user preference, falling back to Russian if preferred language is not available. */
  title: TitleDto;
  /**
   * Display order for sorting services within provider. Lower values appear first.
   * @format int32
   * @min 1
   * @example 1
   */
  order: number;
  /**
   * Parent service ID for hierarchical services. Null for top-level services. Mapped from parent_id vendor_id in database.
   * @format int64
   */
  parentId?: number | null;
  /**
   * Child service ID for multi-level services. Null if service has no child. Mapped from child_id vendor_id in database.
   * @format int64
   */
  childId?: number | null;
  /**
   * Merchant Category Code (MCC) for payment categorization. Used for transaction classification. Null for info services.
   * @example "4814"
   */
  mcc?: string | null;
  /**
   * Whether this service is enabled and visible to users. Disabled services (isEnabled=false) are hidden from regular catalog endpoints but visible in admin endpoints for management purposes.
   * @example true
   */
  isEnabled: boolean;
  /**
   * Whether this service is available for execution. Unavailable services (isAvailable=false) cannot be executed by users but are visible in admin endpoints for management purposes.
   * @example true
   */
  isAvailable: boolean;
  /**
   * Service type flag: true for payment services, false for info services. Payment services create invoices and operations. Info services perform synchronous data retrieval/validation.
   * @example true
   */
  isPayment: boolean;
  /**
   * Service creation timestamp
   * @format date-time
   * @example "2025-06-15T10:00:00Z"
   */
  createdAt: string;
  /**
   * Service last update timestamp
   * @format date-time
   * @example "2025-09-28T15:45:00Z"
   */
  updatedAt: string;
}

/** Response containing list of all services for the specified provider with full administrative information. Services are sorted by display order (order field, ascending). Includes all services regardless of isEnabled and isAvailable status. */
export interface AdminServicesResponse {
  /**
   * Provider vendor ID (external Paynet ID) for which services are returned
   * @format int64
   * @example 101
   */
  providerId: number;
  /**
   * List of all services for the provider with full administrative information, sorted by display order
   * @example []
   */
  services: AdminServiceResponseDto[];
}

/**
 * Operation information for administrative purposes. Includes all operation fields and RAW JSON data (requestData, responseData). Enriched with category and provider titles from related entities.
 * @example []
 */
export interface AdminOperationDto {
  /**
   * Sequential operation ID (1, 2, 3...) based on order in result set. This is NOT the database UUID and NOT Paynet operation_id. It's a simple sequential number for API response ordering.
   * @format int64
   * @example 501
   */
  id: number;
  /**
   * Service vendor ID (external Paynet ID, NOT internal UUID)
   * @format int64
   * @example 203
   */
  serviceId: number;
  /** Localized title in three languages: Russian (ru), Uzbek (uz), and English (en). All fields are optional, but at least one should be provided. Frontend should use the appropriate language based on user preference, falling back to Russian if preferred language is not available. */
  categoryTitle: TitleDto;
  /** Localized title in three languages: Russian (ru), Uzbek (uz), and English (en). All fields are optional, but at least one should be provided. Frontend should use the appropriate language based on user preference, falling back to Russian if preferred language is not available. */
  providerTitle: TitleDto;
  /**
   * Invoice ID from acquiring-service
   * @example "INV-883421"
   */
  invoiceId?: string | null;
  /**
   * Internal operation ID from acquiring-service (external operation identifier)
   * @example "1231-1233-1233-1233"
   */
  operationId: string;
  /**
   * Payment channel code (gateway). Examples: PAYNET, OCTOGAMES. This is the 'Payment method' displayed in admin UI.
   * @example "PAYNET"
   */
  channelCode: string;
  /**
   * Operation status: SUCCESS, FAILED, PENDING, CANCELLED
   * @example "SUCCESS"
   */
  status: "SUCCESS" | "FAILED" | "PENDING" | "CANCELLED";
  /**
   * Operation amount
   * @example 15000
   */
  amount: number;
  /**
   * Currency code (ISO 4217, 3 characters)
   * @example "UZS"
   */
  currency: string;
  /** Response data as RAW JSON (unmodified from database). This is the original response data received from the service. May be null for PENDING operations. */
  requestData: JsonNode;
  /** Response data as RAW JSON (unmodified from database). This is the original response data received from the service. May be null for PENDING operations. */
  responseData?: JsonNode;
  /**
   * Operation creation timestamp
   * @format date-time
   * @example "2025-09-12T10:45:00Z"
   */
  createdAt: string;
  /**
   * Operation last update timestamp
   * @format date-time
   * @example "2025-09-12T10:45:10Z"
   */
  updatedAt: string;
}

/** Response containing paginated list of operations for administrative purposes. Operations are sorted by created_at DESC (newest first) by default. Includes all operation fields and RAW JSON data. */
export interface AdminOperationsResponse {
  /**
   * Current page number (1-based)
   * @format int32
   * @min 1
   * @example 1
   */
  page: number;
  /**
   * Number of records per page
   * @format int32
   * @min 1
   * @max 100
   * @example 10
   */
  pageSize: number;
  /**
   * Total number of operations matching the filter criteria (across all pages)
   * @format int64
   * @min 0
   * @example 245
   */
  totalCount: number;
  /**
   * List of operations for the current page, sorted by created_at DESC (newest first) by default
   * @example []
   */
  operations: AdminOperationDto[];
}

/** Response data as RAW JSON (unmodified from database). This is the original response data received from the service. May be null for PENDING operations. */
export type JsonNode = object | null;

/** Single export item in the exports list */
export interface ExportItemDto {
  /**
   * Export identifier
   * @example "exp_20251008_0001"
   */
  exportId: string;
  /**
   * Current status of the export
   * @example "COMPLETED"
   */
  status: "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED";
  /**
   * Timestamp when export was created (ISO 8601)
   * @format date-time
   * @example "2025-10-08T12:00:00Z"
   */
  createdAt: string;
  /**
   * Timestamp when export was completed (ISO 8601, null if not completed)
   * @format date-time
   * @example "2025-10-08T12:05:30Z"
   */
  completedAt?: string;
  /**
   * URL to download the exported file (null if not completed or failed)
   * @example "https://storage.company/files/exp_20251008_0001.csv"
   */
  fileUrl?: string;
  /**
   * Size of the exported file in bytes (null if not completed)
   * @format int64
   * @example 3423423
   */
  fileSizeBytes?: number;
  /**
   * Export file format
   * @example "csv"
   */
  format: "csv" | "xlsx";
}

/** List of operation exports */
export interface ExportListResponse {
  /** List of export items */
  items: ExportItemDto[];
}

/** Response containing list of all categories for administrative management. Includes both enabled and disabled categories, sorted by display order. Each category includes full administrative information (isEnabled, createdAt, updatedAt). */
export interface AdminCategoriesResponse {
  /**
   * List of all categories (enabled and disabled), sorted by display order
   * @example []
   */
  categories: AdminCategoryResponseDto[];
}

/** Response after deleting user payment template. Contains operation status and success message. */
export interface DeleteTemplateResponse {
  /**
   * Operation status. Always 'success' for successful deletion operations.
   * @example "success"
   */
  status: string;
  /**
   * Human-readable message describing the operation result.
   * @example "Template deleted successfully"
   */
  message: string;
}
