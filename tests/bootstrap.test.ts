import { api, getAuthToken } from "./helpers/testHelpers";

describe("Bootstrap Endpoint", () => {
  let token: string;

  beforeEach(async () => {
    token = await getAuthToken();
  });

  describe("GET /api/bootstrap", () => {
    it("should return bootstrap data for authenticated user", async () => {
      const response = await api
        .get("/api/bootstrap")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
      // Bootstrap typically returns user's initial data (notes, labels, etc.)
      expect(typeof response.body === "object").toBe(true);
    });

    it("should return 401 when not authenticated", async () => {
      const response = await api.get("/api/bootstrap");

      expect(response.status).toBe(401);
    });

    it("should return 401 with invalid token", async () => {
      const response = await api
        .get("/api/bootstrap")
        .set("Authorization", "Bearer invalid-token");

      expect(response.status).toBe(401);
    });
  });
});
