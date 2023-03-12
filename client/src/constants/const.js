export const SERVER_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8000"
    : "https://something.render.com";

export const AMOUNT_OF_TIME_TO_STAY_LOGGED_IN_WITH_MS = 60 * 60 * 8 * 1000;
