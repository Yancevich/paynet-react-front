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
  DeleteTemplateResponse,
  ExecuteTemplateResponse,
  SaveTemplateRequest,
  SaveTemplateResponse,
  TemplatesResponse,
} from "./data-contracts";
import { ContentType, HttpClient } from "./http-client";
import type { RequestParams } from "./http-client";

export class UserTemplates<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description Updates existing user payment template by its unique identifier. **Idempotency**: PUT endpoint only updates existing templates, never creates new ones. Repeated PUT requests with the same data produce the same result. **Ownership Verification**: Users can only update their own templates. Attempting to update another user's template will return 404 Not Found. **Service Validation**: Service must be enabled (is_enabled=true), available (is_available=true), and be a payment service (is_payment=true). Otherwise returns 400 Bad Request. **Conflict Detection**: If providerId/serviceId combination changes and another template already uses the same combination for this user, returns 409 Conflict. **Validation**: All required fields (providerId, serviceId, templateData) must be provided. Invalid format or missing fields return 400 Bad Request.
   *
   * @tags User Templates
   * @name UpdateTemplate
   * @summary Update user payment template
   * @request PUT:/user/templates/{templateId}
   */
  updateTemplate = (
    templateId: string,
    data: SaveTemplateRequest,
    params: RequestParams = {},
  ) =>
    this.request<SaveTemplateResponse, void>({
      path: `/user/templates/${templateId}`,
      method: "PUT",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Deletes user payment template by its unique identifier. **Ownership Verification**: Users can only delete their own templates. Attempting to delete another user's template will return 403 Forbidden. **Physical Deletion**: Template is physically removed from database (not soft delete). After successful deletion, template will no longer appear in GET /user/templates response. **Validation**: Template ID must be a valid UUID format. Invalid format returns 400 Bad Request.
   *
   * @tags User Templates
   * @name DeleteTemplate
   * @summary Delete user payment template
   * @request DELETE:/user/templates/{templateId}
   */
  deleteTemplate = (templateId: string, params: RequestParams = {}) =>
    this.request<DeleteTemplateResponse, void>({
      path: `/user/templates/${templateId}`,
      method: "DELETE",
      ...params,
    });
  /**
   * @description Retrieves list of user's saved payment templates for quick reuse in future transactions. **Response Format**: Returns array of template objects, each containing: - Provider information (id as vendor_id, categoryId, title, images, order) - Saved payment parameters (templateData as flexible JSON structure) **Empty Result**: Returns empty array if user has no templates (no error). **Ordering**: Templates are ordered by creation date (newest first).
   *
   * @tags User Templates
   * @name GetUserTemplates
   * @summary Get user payment templates
   * @request GET:/user/templates
   */
  getUserTemplates = (params: RequestParams = {}) =>
    this.request<TemplatesResponse, void>({
      path: `/user/templates`,
      method: "GET",
      ...params,
    });
  /**
   * @description Saves or updates user payment template for quick reuse in future transactions. **Upsert Behavior**: If template with same providerId and serviceId exists, it will be updated instead of creating a duplicate. **Template Limit**: Maximum 100 templates per user. Attempting to create more will return 409 Conflict. **Template Data**: Flexible JSON structure containing payment parameters (accountNumber, phone, amount, etc.) specific to each service.
   *
   * @tags User Templates
   * @name SaveTemplate
   * @summary Save user payment template
   * @request POST:/user/templates
   */
  saveTemplate = (data: SaveTemplateRequest, params: RequestParams = {}) =>
    this.request<SaveTemplateResponse, void>({
      path: `/user/templates`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Executes user's saved template to pre-fill payment form with saved values. **Important**: This is NOT a payment execution - it only pre-fills the form for user review and editing. No operation/transaction is created. **Response Format**: Returns service metadata (id, provider_id, title) and form fields with pre-filled values from template_data. **Service Validation**: Service must be enabled (is_enabled=true) and available (is_available=true). Otherwise returns 403 Forbidden. **Ownership Verification**: Users can only execute their own templates. Attempting to execute another user's template will return 404 Not Found.
   *
   * @tags User Templates
   * @name ExecuteTemplate
   * @summary Execute user template to pre-fill payment form
   * @request POST:/user/templates/{templateId}/execute
   */
  executeTemplate = (templateId: string, params: RequestParams = {}) =>
    this.request<ExecuteTemplateResponse, void>({
      path: `/user/templates/${templateId}/execute`,
      method: "POST",
      ...params,
    });
}
