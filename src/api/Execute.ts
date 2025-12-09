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

import type { ExecuteRequest, ExecuteResponse } from "./data-contracts";
import { ContentType, HttpClient } from "./http-client";
import type { RequestParams } from "./http-client";

export class Execute<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description Executes a payment service (info or payment operation) based on service configuration. **Service Types**: - **Info Services** (isPayment=false): Performs synchronous data retrieval/validation via Paynet API. Returns SUCCESS status with response fields immediately. - **Payment Services** (isPayment=true): Creates invoice in acquiring-service, initiates payment, and tracks operation status. Returns operation status (INITIAL/PENDING/SUCCESS/FAILED) with operation and invoice IDs. **Request Format**: - All field values must be strings, even numeric values (e.g., amount: "10000" not 10000) - Field names must match exactly the 'name' field from service's request_field configuration - Common fields: "account" (phone/account number for Paynet), "amount" (for payment services) - **Important**: The "account" field is business data for Paynet, NOT the system user ID (user ID is extracted from JWT token separately) **Response Format**: - INFO services: status=SUCCESS, type=INFO, response fields array - PAYMENT services: status (INITIAL/PENDING/SUCCESS/FAILED), type=PAYMENT, operationId, invoiceId, response fields - Errors: status=FAILED, errorCode (e.g., PAYNET_105), localized error message **Operation Tracking**: After executing a payment service, use POST /operations/{operationId}/status to track payment progress. The operationId is returned in the execute response.
   *
   * @tags Execute
   * @name ExecuteService
   * @summary Execute service
   * @request POST:/{serviceId}/execute
   */
  executeService = (
    serviceId: number,
    data: ExecuteRequest,
    params: RequestParams = {},
  ) =>
    this.request<ExecuteResponse, void>({
      path: `/${serviceId}/execute`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
}
