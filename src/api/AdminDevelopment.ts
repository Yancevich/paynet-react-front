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
  DevTokenResponse,
  TestTokenResponse,
  TokenResponse,
} from './dev-contracts'
import { HttpClient } from './http-client'
import type { RequestParams } from './http-client'

export class AdminDevelopment<
  SecurityDataType = unknown
> extends HttpClient<SecurityDataType> {
  /**
   * @description Generates a JWT token signed with our development RSA key. The token is valid for 1 hour and includes all required scopes for payment service endpoints. This endpoint is only available in development profile. Optional scopes can be provided as query parameter. If not provided, default scopes are used: payment_catalog:read payment:execute
   *
   * @tags Admin - Development
   * @name GenerateJwtToken
   * @summary Generate development JWT token
   * @request GET:/admin/dev/jwt-token
   */
  generateJwtToken = (
    query?: {
      /**
       * Optional space-separated scopes (default: payment_catalog:read payment:execute)
       * @example "payment_catalog:read payment:execute"
       */
      scopes?: string
    },
    params: RequestParams = {}
  ) =>
    this.request<DevTokenResponse, object>({
      path: `/admin/dev/jwt-token`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    })
  /**
   * @description OAuth2 Client Credentials compatible endpoint for Swagger UI integration. Generates a JWT token signed with our development RSA key. Client credentials are ignored in development mode - no real credentials needed. Accepts application/x-www-form-urlencoded content type as per OAuth2 specification.
   *
   * @tags Admin - Development
   * @name GenerateJwtTokenOAuth2
   * @summary Generate development JWT token (OAuth2 compatible)
   * @request POST:/admin/dev/jwt-token
   */
  generateJwtTokenOAuth2 = (
    query?: {
      /**
       * OAuth2 grant type (must be 'client_credentials')
       * @example "client_credentials"
       */
      grant_type?: string
      /**
       * OAuth2 client ID (ignored in development mode)
       * @example "dev-client"
       */
      client_id?: string
      /**
       * OAuth2 client secret (ignored in development mode)
       * @example "dev-secret"
       */
      client_secret?: string
      /**
       * Optional space-separated scopes
       * @example "payment_catalog:read payment:execute"
       */
      scope?: string
    },
    params: RequestParams = {}
  ) =>
    this.request<DevTokenResponse, object>({
      path: `/admin/dev/jwt-token`,
      method: 'POST',
      query: query,
      format: 'json',
      ...params,
    })
  /**
   * @description Obtains an OAuth2 access token using Client Credentials flow. This endpoint is intended for development/testing purposes to simplify token acquisition for Swagger UI. Provide Client ID and Client Secret as query parameters.
   *
   * @tags Admin - Development
   * @name GetToken
   * @summary Get OAuth2 access token for testing
   * @request GET:/admin/dev/token
   */
  getToken = (
    query: {
      /**
       * OAuth2 Client ID
       * @example "paynet-service"
       */
      clientId: string
      /** OAuth2 Client Secret */
      clientSecret: string
    },
    params: RequestParams = {}
  ) =>
    this.request<TokenResponse, object>({
      path: `/admin/dev/token`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    })
  /**
   * @description Obtains an OAuth2 access token from the OAuth2 server for testing API endpoints in Swagger UI. If Client ID and Client Secret are provided, calls the OAuth2 server to get a properly signed token that will pass Spring Security validation. If credentials are not provided, returns an error with instructions. This endpoint is only available in development profile.
   *
   * @tags Admin - Development
   * @name GenerateTestToken
   * @summary Get OAuth2 token for testing (with optional credentials)
   * @request GET:/admin/dev/test-token
   */
  generateTestToken = (
    query?: {
      /**
       * OAuth2 Client ID (optional, but required for real token)
       * @example "paynet-service"
       */
      clientId?: string
      /** OAuth2 Client Secret (optional, but required for real token) */
      clientSecret?: string
    },
    params: RequestParams = {}
  ) =>
    this.request<TestTokenResponse, object>({
      path: `/admin/dev/test-token`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    })
}
