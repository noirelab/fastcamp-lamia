export const SESSION_COOKIE_NAME = "fastcamp_session";

export const SESSION_MAX_AGE_SECONDS = 60 * 60;

export const createSession = () => {
  document.cookie = `${SESSION_COOKIE_NAME}=1; path=/; max-age=${SESSION_MAX_AGE_SECONDS}`;
};
