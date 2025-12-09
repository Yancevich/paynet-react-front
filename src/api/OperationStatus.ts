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

import type { OperationStatusResponse } from "./data-contracts";
import { HttpClient } from "./http-client";
import type { RequestParams } from "./http-client";

export class OperationStatus<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description Retrieves the current status of a payment operation by its ID. **Authorization**: Only the user who created the operation can access its status. User ID is extracted from JWT token (claim "sub") and compared with operation.user_id. **Operation Statuses**: - INITIAL: Operation created, payment not yet initiated - PENDING: Payment in progress, awaiting completion - SUCCESS: Payment completed successfully - FAILED: Payment failed (check errorCode and message for details) - CANCELLED: Operation was cancelled - REFUNDED: Payment was refunded - EXPIRED: Operation expired **Response**: Includes operation status, type, service ID, operation ID, invoice ID, and response fields with localized labels and values (if available). **Use Case**: Frontend polls this endpoint to track payment status after executing a payment service. The operationId is returned from POST /{serviceId}/execute endpoint.
   *
   * @tags Operation Status
   * @name GetOperationStatus
   * @summary Get operation status
   * @request GET:/operations/{operationId}/status
   * @secure
   */
  getOperationStatus = (
    operationId: string,
    query?: {
      invoiceId?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<OperationStatusResponse, void>({
      path: `/operations/${operationId}/status`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
}
