const config = {
  dev: import.meta.env.dev !== "production",
  production: import.meta.env.PROD || false,
  env: import.meta.env,
  BASE_URL: import.meta.env.VITE_APP_API_URL,
};
export default config;
