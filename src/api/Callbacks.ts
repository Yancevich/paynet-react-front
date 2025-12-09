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

import type { PaymentCallbackRequest } from "./data-contracts";
import { ContentType, HttpClient } from "./http-client";
import type { RequestParams } from "./http-client";

export class Callbacks<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description Receives payment confirmation callback from acquiring-service. **Workflow**: 1. If status is FAILED → Set operation status to FAILED 2. If status is SUCCESS → Call Paynet /v2/transaction API with saved request fields 3. Process Paynet response according to error_codes table 4. If Paynet error code is missing → Record it and set operation status to FAILED 5. On success → Update operation status, increment user_favorites score, save recent accounts, enrich response_data **This is an internal endpoint** for inter-service communication.
   *
   * @tags Callbacks
   * @name PaymentConfirmationCallback
   * @summary Payment confirmation callback
   * @request POST:/callbacks/payment-confirmation
   */
  paymentConfirmationCallback = (
    data: PaymentCallbackRequest,
    params: RequestParams = {},
  ) =>
    this.request<void, void>({
      path: `/callbacks/payment-confirmation`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
}
