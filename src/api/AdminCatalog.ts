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
  AdminCategoriesResponse,
  AdminProvidersResponse,
  AdminServiceFieldsResponse,
  AdminServicesResponse,
  UpdateCategoryRequest,
  UpdateCategoryResponse,
  UpdateFieldResponse,
  UpdateProviderRequest,
  UpdateProviderResponse,
  UpdateRequestFieldRequest,
  UpdateResponseFieldRequest,
} from "./data-contracts";
import { ContentType, HttpClient } from "./http-client";
import type { RequestParams } from "./http-client";

export class AdminCatalog<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description Updates provider data by vendor ID (external Paynet ID). **Partial Update (PATCH semantics)**: Only provided fields in request are updated. Other fields remain unchanged. This allows flexible updates without requiring all fields. **Updatable Fields**: - title: Localized titles in Russian, Uzbek, and English (at least one language required) - order: Display order for sorting within category (must be >= 1) - images: Provider images including vendor logo and custom theme variants (valid URL format or empty string to clear) - isEnabled: Enable/disable provider (boolean) **Automatic Updates**: - updated_at timestamp is automatically updated when any field is changed **Validation**: - order: must be >= 1 if provided - images: URLs must be valid HTTP/HTTPS URL format if provided - title: at least one language (ru, uz, or en) must be provided if title is specified **Authentication**: Requires admin authentication with PAYMENT_ADMIN_CATALOG_WRITE permission.
   *
   * @tags Admin Catalog
   * @name UpdateProvider
   * @summary Update provider data
   * @request PATCH:/admin/providers/{providerId}
   */
  updateProvider = (
    providerId: number,
    data: UpdateProviderRequest,
    params: RequestParams = {},
  ) =>
    this.request<UpdateProviderResponse, void>({
      path: `/admin/providers/${providerId}`,
      method: "PATCH",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Updates response field (output field) data by sequential field ID. **Partial Update (PATCH semantics)**: Only provided fields in request are updated. Other fields remain unchanged. **Field ID**: Sequential number (1, 2, 3...) based on order in sorted list, not the internal database UUID. **Service ID**: Required query parameter to identify which service the field belongs to. **Automatic Updates**: The updated_at timestamp is automatically updated when any field is modified. **Validation**: - order: must be >= 1 if provided - fieldSize: must be > 0 if provided - label: at least one language (ru, uz, or en) should be provided if label is specified **Authentication**: Requires admin authentication with PAYMENT_ADMIN_CATALOG_WRITE permission.
   *
   * @tags Admin Catalog
   * @name UpdateResponseField
   * @summary Update response field
   * @request PATCH:/admin/fields/response/{fieldId}
   */
  updateResponseField = (
    fieldId: number,
    query: {
      /**
       * Service vendor ID (external Paynet ID, NOT internal UUID). Required to identify which service the field belongs to.
       * @format int64
       * @example 201
       */
      serviceId: number;
    },
    data: UpdateResponseFieldRequest,
    params: RequestParams = {},
  ) =>
    this.request<UpdateFieldResponse, void>({
      path: `/admin/fields/response/${fieldId}`,
      method: "PATCH",
      query: query,
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Updates request field (input field) data by sequential field ID. **Partial Update (PATCH semantics)**: Only provided fields in request are updated. Other fields remain unchanged. **Field ID**: Sequential number (1, 2, 3...) based on order in sorted list, not the internal database UUID. **Service ID**: Required query parameter to identify which service the field belongs to. **Automatic Updates**: The updated_at timestamp is automatically updated when any field is modified. **Validation**: - order: must be >= 1 if provided - fieldSize: must be > 0 if provided - title: at least one language (ru, uz, or en) should be provided if title is specified **Authentication**: Requires admin authentication with PAYMENT_ADMIN_CATALOG_WRITE permission.
   *
   * @tags Admin Catalog
   * @name UpdateRequestField
   * @summary Update request field
   * @request PATCH:/admin/fields/request/{fieldId}
   */
  updateRequestField = (
    fieldId: number,
    query: {
      /**
       * Service vendor ID (external Paynet ID, NOT internal UUID). Required to identify which service the field belongs to.
       * @format int64
       * @example 201
       */
      serviceId: number;
    },
    data: UpdateRequestFieldRequest,
    params: RequestParams = {},
  ) =>
    this.request<UpdateFieldResponse, void>({
      path: `/admin/fields/request/${fieldId}`,
      method: "PATCH",
      query: query,
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Updates category data by vendor ID (external Paynet ID). **Partial Update (PATCH semantics)**: Only provided fields in request are updated. Other fields remain unchanged. This allows flexible updates without requiring all fields. **Updatable Fields**: - title: Localized titles in Russian, Uzbek, and English (at least one language required) - order: Display order for sorting (must be >= 1) - customImages: URL to category custom image (valid URL format or empty string to clear) - isEnabled: Enable/disable category (boolean) **Automatic Updates**: - updated_at timestamp is automatically updated when any field is changed **Validation**: - order: must be >= 1 if provided - customImages: must be valid HTTP/HTTPS URL format if provided - title: at least one language (ru, uz, or en) must be provided if title is specified **Authentication**: Requires admin authentication with PAYMENT_ADMIN_CATALOG_WRITE permission.
   *
   * @tags Admin Catalog
   * @name UpdateCategory
   * @summary Update category data
   * @request PATCH:/admin/categories/{categoryId}
   */
  updateCategory = (
    categoryId: number,
    data: UpdateCategoryRequest,
    params: RequestParams = {},
  ) =>
    this.request<UpdateCategoryResponse, void>({
      path: `/admin/categories/${categoryId}`,
      method: "PATCH",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Retrieves all request fields (input) and response fields (output) for a specific service for administrative purposes. **Request Fields**: Input fields that users must fill when creating a service request. Includes validation rules, control types, localized labels, and display order. **Response Fields**: Output fields that may be returned by Paynet in service response. Includes field names, localized labels, display order, and enabled status. **Sorting**: Both request and response fields are sorted by order (ascending). **Use Cases**: - Display field configuration for a service in admin panel - Edit field definitions - Manage field order and status - Configure field validation rules **Authentication**: Requires admin authentication with PAYMENT_ADMIN_CATALOG_READ permission.
   *
   * @tags Admin Catalog
   * @name GetAdminServiceFields
   * @summary Get service fields for admin
   * @request GET:/admin/{serviceId}/fields
   */
  getAdminServiceFields = (serviceId: number, params: RequestParams = {}) =>
    this.request<AdminServiceFieldsResponse, void>({
      path: `/admin/${serviceId}/fields`,
      method: "GET",
      ...params,
    });
  /**
   * @description Retrieves the list of all payment service providers for a specific category for administrative purposes. **Full Information**: Returns all providers including disabled ones (is_enabled=false), with complete administrative fields (isEnabled, createdAt, updatedAt). **Use Cases**: - Display provider management table for a category in admin panel - Edit provider records - Manage provider order and status - Manage provider images **Sorting**: Providers are sorted by display order (ascending). **Authentication**: Requires admin authentication with PAYMENT_ADMIN_CATALOG_READ permission.
   *
   * @tags Admin Catalog
   * @name GetAdminProvidersByCategory
   * @summary Get all providers for category (admin)
   * @request GET:/admin/{categoryId}/providers
   */
  getAdminProvidersByCategory = (
    categoryId: number,
    params: RequestParams = {},
  ) =>
    this.request<AdminProvidersResponse, void>({
      path: `/admin/${categoryId}/providers`,
      method: "GET",
      ...params,
    });
  /**
   * @description Retrieves the list of all payment services for a specific provider for administrative purposes. **Full Information**: Returns all services including disabled ones (is_enabled=false) and unavailable ones (is_available=false), with complete administrative fields (isEnabled, isAvailable, createdAt, updatedAt). **Use Cases**: - Display service management table for a provider in admin panel - Edit service records - Manage service order and status - Manage service availability **Sorting**: Services are sorted by display order (ascending). **Authentication**: Requires admin authentication with PAYMENT_ADMIN_CATALOG_READ permission.
   *
   * @tags Admin Catalog
   * @name GetAdminServicesByProvider
   * @summary Get all services for provider (admin)
   * @request GET:/admin/providers/{providerId}/services
   */
  getAdminServicesByProvider = (
    providerId: number,
    params: RequestParams = {},
  ) =>
    this.request<AdminServicesResponse, void>({
      path: `/admin/providers/${providerId}/services`,
      method: "GET",
      ...params,
    });
  /**
   * @description Retrieves the list of all payment service categories for administrative purposes. **Full Information**: Returns all categories including disabled ones (is_enabled=false), with complete administrative fields (isEnabled, createdAt, updatedAt). **Use Cases**: - Display category management table in admin panel - Edit category records (via PATCH /admin/categories/{id}) - Manage category order and status - Manage category images **Sorting**: Categories are sorted by display order (ascending). **Authentication**: Requires admin authentication with PAYMENT_ADMIN_CATALOG_READ permission.
   *
   * @tags Admin Catalog
   * @name GetAdminCategories
   * @summary Get all categories for admin
   * @request GET:/admin/categories
   */
  getAdminCategories = (params: RequestParams = {}) =>
    this.request<AdminCategoriesResponse, void>({
      path: `/admin/categories`,
      method: "GET",
      ...params,
    });
}
