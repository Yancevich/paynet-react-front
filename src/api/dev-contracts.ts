// Manual definitions for development token endpoints that are no longer in Swagger
export interface DevTokenResponse {
  access_token?: string;
  token_type?: string;
  expires_in?: number;
  scope?: string;
}

export interface TokenResponse {
  access_token?: string;
  token_type?: string;
  expires_in?: number;
  scope?: string;
}

export interface TestTokenResponse {
  access_token?: string;
  token_type?: string;
  expires_in?: number;
  scope?: string;
}
