import { generateOpenApiDocument } from "trpc-openapi";

import { appRouter } from "./router";

import { env } from "../env";

const urlFromEnv = () => {
  if (env.ENVIRONMENT === "production") {
    return "https://price.hawksight.co";
  }

  if (env.ENVIRONMENT === "staging") {
    return "https://stagingprice.hawksight.co";
  }

  if (env.ENVIRONMENT === "development") {
    return "http://0.0.0.0:3000";
  }
};

// Generate OpenAPI schema document
export const openApiDocument = generateOpenApiDocument(appRouter, {
  title: "Hawksight Price API",
  description: "Get USD prices for tokens",
  version: "0.0.0",
  baseUrl: urlFromEnv() + "/api",
  tags: ["event"],
});
