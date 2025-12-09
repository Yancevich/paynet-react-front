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

import type {
  AdminOperationsResponse,
  ExportListResponse,
  ExportOperationsRequest,
  ExportOperationsResponse,
} from "./data-contracts";
import { ContentType, HttpClient } from "./http-client";
import type { RequestParams } from "./http-client";

export class AdminOperations<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description Initiates asynchronous export of operations to CSV or XLSX file. **Asynchronous Processing**: Export is processed asynchronously. Returns immediately with export ID. Client should poll GET /admin/operations/exports to check status and get file URL. **Filtering**: Supports all filters from GET /admin/operations endpoint. **Formats**: CSV or XLSX **Rate Limiting**: Maximum 5 concurrent exports per user (configurable). **File Size Limit**: Maximum 1,000,000 rows per export (configurable). **File TTL**: Exported files are available for 24 hours (configurable), then automatically deleted.
   *
   * @tags Admin Operations
   * @name ExportOperations
   * @summary Export operations to file
   * @request POST:/admin/operations/export
   */
  exportOperations = (
    data: ExportOperationsRequest,
    params: RequestParams = {},
  ) =>
    this.request<ExportOperationsResponse, void>({
      path: `/admin/operations/export`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Retrieves paginated list of operations with filtering and sorting for administrative purposes. **Full Information**: Returns all operation fields including RAW JSON data (requestData, responseData). Operations are enriched with category and provider titles from related entities. **Filtering**: Supports filtering by date range, status, service ID, invoice ID, operation ID, channel code, and user ID. All filters are optional and can be combined. **Pagination**: Supports configurable page size (default: 20, max: 100). **Sorting**: Supports sorting by any field with ASC/DESC direction (default: createdAt DESC). **Use Cases**: - Viewing operation history in admin panel - Filtering operations by various criteria - Analyzing operation data including RAW JSON - Monitoring operation statuses **Authentication**: Requires admin authentication with PAYMENT_ADMIN_OPERATIONS_READ permission.
   *
   * @tags Admin Operations
   * @name GetAdminOperations
   * @summary Get operations list for admin
   * @request GET:/admin/operations
   */
  getAdminOperations = (
    query?: {
      /**
       * Page number (1-based, default: 1)
       * @format int32
       * @example 1
       */
      page?: number;
      /**
       * Number of records per page (default: 20, max: 100)
       * @format int32
       * @example 20
       */
      pageSize?: number;
      /**
       * Start of date range (ISO 8601 format, optional)
       * @format date-time
       * @example "2025-09-12T00:00:00Z"
       */
      createdAtFrom?: string;
      /**
       * End of date range (ISO 8601 format, optional)
       * @format date-time
       * @example "2025-09-12T23:59:59Z"
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
       * @example 203
       */
      serviceId?: number;
      /**
       * Invoice ID filter (optional)
       * @example "INV-883421"
       */
      invoiceId?: string;
      /**
       * Operation ID filter (internal operation ID from acquiring-service, optional)
       * @example "1231-1233-1233-1233"
       */
      operationId?: string;
      /**
       * Channel code filter (gateway: PAYNET, OCTOGAMES, etc., optional)
       * @example "PAYNET"
       */
      channelCode?: string;
      /**
       * User ID filter (UUID, optional)
       * @format uuid
       * @example "550e8400-e29b-41d4-a716-446655440000"
       */
      userId?: string;
      /**
       * Sort field (default: createdAt)
       * @example "createdAt"
       */
      sort?: string;
      /**
       * Sort direction (ASC/DESC, default: DESC)
       * @example "DESC"
       */
      order?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<AdminOperationsResponse, void>({
      path: `/admin/operations`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * @description Retrieves list of all operation exports for the current user. **Returns**: All exports created by authenticated user, ordered by creation date (newest first). **Statuses**: Includes exports in all states (PENDING, PROCESSING, COMPLETED, FAILED). **File URLs**: Only available for COMPLETED exports. Files are available for 24 hours (configurable).
   *
   * @tags Admin Operations
   * @name GetOperationExports
   * @summary Get list of operation exports
   * @request GET:/admin/operations/exports
   */
  getOperationExports = (params: RequestParams = {}) =>
    this.request<ExportListResponse, void>({
      path: `/admin/operations/exports`,
      method: "GET",
      ...params,
    });
}
