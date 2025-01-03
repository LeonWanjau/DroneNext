"use server";

async function getAdminAuthToken() {
  if (process.env.AUTH_TOKEN !== undefined) {
    return process.env.AUTH_TOKEN;
  }
  const url = `${process.env.NEXT_PUBLIC_AUTH_URL}/admin/login`;
  const body = {
    email: process.env.STRAPI_EMAIL,
    password: process.env.STRAPI_PASSWORD,
  };
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  });
  if (!res.ok) {
    throw new Error("Unable to get auth token");
  }
  const responseData = await res.json();
  const authToken = responseData?.data?.token;
  const authTokenNotDefined = !!!authToken;
  if (authTokenNotDefined) {
    throw new Error("Unable to get auth token");
  }
  process.env.AUTH_TOKEN = authToken;
  return authToken as string;
}

async function createApiToken(adminToken: string) {
  const createTokenUrl = `${process.env.NEXT_PUBLIC_AUTH_URL}/admin/api-tokens`;
  const res = await fetch(createTokenUrl, {
    method: "POST",
    body: JSON.stringify({
      lifespan: null,
      description: "",
      type: "read-only",
      name: "strapi-token",
      permissions: null,
    }),
    headers: new Headers({
      Authorization: `Bearer ${adminToken}`,
      "Content-Type": "application/json",
    }),
  });
  if (!res.ok) {
    throw new Error("An error occurred while creating the strapi API token");
  }
  return (await res.json()).data.accessKey;
}

async function getApiTokenId(adminToken: string) {
  const apiTokensUrl = `${process.env.NEXT_PUBLIC_AUTH_URL}/admin/api-tokens`;
  const res = await fetch(apiTokensUrl, {
    method: "GET",
    headers: new Headers({
      Authorization: `Bearer ${adminToken}`,
    }),
  });
  if (!res.ok) {
    throw new Error("An error occurred while fetching a list of api tokens");
  }
  const firstTokenId = (await res.json()).data?.[0]?.id;
  return firstTokenId;
}

async function fetchApiToken() {
  const adminToken = await getAdminAuthToken();
  const tokenId = await getApiTokenId(adminToken);
  const tokenIdPresent = !!tokenId;
  if (tokenIdPresent) {
    const regenerateTokenUrl = `${process.env.NEXT_PUBLIC_AUTH_URL}/admin/api-tokens/${tokenId}/regenerate`;
    const res = await fetch(regenerateTokenUrl, {
      method: "POST",
      body: JSON.stringify({}),
      headers: new Headers({
        Authorization: `Bearer ${adminToken}`,
        "Content-Type": "application/json",
      }),
    });
    if (res.ok) {
      return (await res.json()).data.accessKey;
    }
  }
  return await createApiToken(adminToken);
}

async function getAuthToken() {
  let authToken = process.env.AUTH_TOKEN;
  const authTokenNotDefined = !!!authToken;
  if (authTokenNotDefined) {
    throw new Error("Auth token not set");
  }
  return authToken;
}

export async function setAuthToken() {
  if (process.env.AUTH_TOKEN !== undefined) {
    return;
  }
  const authToken = await fetchApiToken();
  process.env.AUTH_TOKEN = authToken;
}

export async function doFetch({
  url,
  options = {
    method: "GET",
    headers: undefined,
  },
}: {
  url: string;
  options?: RequestInit;
}) {
  const authToken = await getAuthToken();

  url = process.env.NEXT_PUBLIC_BASE_URL + url;

  if (options.headers instanceof Headers) {
    options.headers.append("Authorization", `Bearer ${authToken ?? ""}`);
  } else {
    options.headers = new Headers({
      Authorization: `Bearer ${authToken ?? ""}`,
    });
  }
  const hasContentTypeHeader = options.headers.has("Content-Type");
  if (!hasContentTypeHeader) {
    options.headers.append("Content-Type", "application/json");
  }
  options.credentials = "include";
  const res = await fetch(url, options);
  return res;
}
