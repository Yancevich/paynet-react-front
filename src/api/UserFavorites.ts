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

import type { FavoritesResponse } from "./data-contracts";
import { HttpClient } from "./http-client";
import type { RequestParams } from "./http-client";

export class UserFavorites<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description Retrieves list of user's favorite providers sorted by usage score (descending). **Ranking**: Providers are ranked by score (number of successful operations). Score is incremented on each successful payment operation. **Filtering**: Only active providers (is_enabled=true) are included in results. Disabled providers are automatically excluded even if they have high scores. **Limit**: Returns top 10 providers by default. **Empty Result**: Returns empty array if user has no favorites or all favorite providers are disabled. This is not an error condition.
   *
   * @tags User Favorites
   * @name GetUserFavorites
   * @summary Get user favorite providers
   * @request GET:/user/favorites
   */
  getUserFavorites = (params: RequestParams = {}) =>
    this.request<FavoritesResponse, void>({
      path: `/user/favorites`,
      method: "GET",
      ...params,
    });
}
