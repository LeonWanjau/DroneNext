import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";
import util from 'util'
import {exec} from "node:child_process"
import fs from "node:fs/promises";

const promisifiedExec = util.promisify(exec)

async function getAdminAuthToken() {
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
  return authToken;
}

async function createApiToken(adminToken) {
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

async function getApiTokenId(adminToken) {
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

const authTokenFileName = "auth-token";

async function setApiToken() {
  try {
    fs.writeFile("./" + authTokenFileName, "", { flag: "w+" });
    const token = await fetchApiToken();
    fs.writeFile("./" + authTokenFileName, token, { flag: "w+" });

    // const token = await fetchApiToken();
    // console.log(token)

    // await promisifiedExec(`export AUTH_TOKEN=${token}`)
    // Run the script as eval $(node scriptName)
    // console.log(`export AUTH_TOKEN=${token}`)

  } catch (e) {
    console.log(e);
  }
}

dotenvExpand.expand(
  dotenv.config({
    path: ".env.local",
  })
);
await setApiToken();
