import { AdminCatalog } from "./AdminCatalog";
import { AdminDevelopment } from "./AdminDevelopment";
import { AdminOperations } from "./AdminOperations";
import { Callbacks } from "./Callbacks";
import { Catalog } from "./Catalog";
import { Execute } from "./Execute";
import { OperationStatus } from "./OperationStatus";
import { UserFavorites } from "./UserFavorites";
import { UserTemplates } from "./UserTemplates";
import type { ApiConfig } from "./http-client";
import { ensureDevToken } from "./devToken";
import { API_BASE_URL } from "@/shared/api/config";
import { getStoredToken } from "@/shared/lib/tokenStorage";

const apiConfig: ApiConfig = {
  baseURL: API_BASE_URL,
  secure: true,
  securityWorker: async () => {
    await ensureDevToken();
    const token = getStoredToken();
    return token
      ? {
          headers: { Authorization: `Bearer ${token}` },
        }
      : undefined;
  },
};

export const catalogApi = new Catalog(apiConfig);
export const adminCatalogApi = new AdminCatalog(apiConfig);
export const adminDevelopmentApi = new AdminDevelopment(apiConfig);
export const adminOperationsApi = new AdminOperations(apiConfig);
export const callbacksApi = new Callbacks(apiConfig);
export const executeApi = new Execute(apiConfig);
export const operationStatusApi = new OperationStatus(apiConfig);
export const userFavoritesApi = new UserFavorites(apiConfig);
export const userTemplatesApi = new UserTemplates(apiConfig);
