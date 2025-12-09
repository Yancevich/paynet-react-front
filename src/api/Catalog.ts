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
  CategoriesResponse,
  ProvidersResponse,
  ServicesResponse,
} from "./data-contracts";
import { HttpClient } from "./http-client";
import type { RequestParams } from "./http-client";

export class Catalog<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description Retrieves the list of active and available services for the specified provider. Services are individual payment operations (e.g., 'Mobile Payment', 'Balance Check') that users can execute. Only services with is_enabled=true and is_available=true are returned, sorted by display order. Each service includes all request fields with metadata needed for frontend form rendering. Services can be payment type (isPayment=true) or info type (isPayment=false).
   *
   * @tags Catalog
   * @name GetServicesByProvider
   * @summary Get services by provider
   * @request GET:/{providerId}/services
   */
  getServicesByProvider = (providerId: number, params: RequestParams = {}) =>
    this.request<ServicesResponse, void>({
      path: `/${providerId}/services`,
      method: "GET",
      ...params,
    });
  /**
   * @description Retrieves the list of active providers belonging to the specified category. Providers are payment service providers (e.g., mobile operators, ISPs) that users can select. Only providers with is_enabled=true for the given category are returned, sorted by display order. Each provider includes localized titles and image URLs for vendor logo and custom themes.
   *
   * @tags Catalog
   * @name GetProvidersByCategory
   * @summary Get providers by category
   * @request GET:/{categoryId}/providers
   */
  getProvidersByCategory = (categoryId: number, params: RequestParams = {}) =>
    this.request<ProvidersResponse, void>({
      path: `/${categoryId}/providers`,
      method: "GET",
      ...params,
    });
  /**
   * @description Searches for payment service providers by partial match in title fields (Russian, Uzbek, English). Search is case-insensitive and returns only enabled providers sorted by display order. Query must be at least 2 characters long. Empty or single character queries return empty result without error.
   *
   * @tags Catalog
   * @name SearchProviders
   * @summary Search providers by name
   * @request GET:/providers/search
   */
  searchProviders = (
    query?: {
      /**
       * Search query string for provider name. Optional parameter. If provided, minimum 2 characters required for search to be performed. Searches in Russian, Uzbek, and English title fields. Case-insensitive partial match. If empty, null, or shorter than 2 characters, returns empty array without error.
       * @example "uztelecom"
       */
      query?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<ProvidersResponse, void>({
      path: `/providers/search`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * @description Retrieves the list of all active payment service categories. Categories are used for grouping providers and are sorted by display order. Only categories with is_enabled=true are returned. Each category includes localized titles (ru, uz, en) and custom theme images.
   *
   * @tags Catalog
   * @name GetCategories
   * @summary Get all categories
   * @request GET:/categories
   */
  getCategories = (params: RequestParams = {}) =>
    this.request<CategoriesResponse, void>({
      path: `/categories`,
      method: "GET",
      ...params,
    });
}
