const { createClient } = require("@commercetools/sdk-client");
const {
  createAuthMiddlewareForClientCredentialsFlow,
} = require("@commercetools/sdk-middleware-auth");
const { createHttpMiddleware } = require("@commercetools/sdk-middleware-http");
const fetch = require("node-fetch");

// Configure commercetools client
const projectKey = "repurpose";
const authMiddleware = createAuthMiddlewareForClientCredentialsFlow({
  host: "https://auth.europe-west1.gcp.commercetools.com",
  projectKey,
  credentials: {
    clientId: "mPWbmP0AbFnskNcOgzaoOxqV",
    clientSecret: "XZGSH_ZtMN_yM3Rw7Lq73LFcyVWGK75b",
  },
  scopes: ["manage_project:repurpose"],
  fetch,
});
const httpMiddleware = createHttpMiddleware({
  host: "https://api.europe-west1.gcp.commercetools.com",
  fetch,
});
const client = createClient({
  middlewares: [authMiddleware, httpMiddleware],
});

module.exports = client;
