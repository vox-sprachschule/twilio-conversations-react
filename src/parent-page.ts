/**
 * The VOX back office embeds this app in an iframe and drives it through postMessage: it sends the Twilio token
 * (setJwt) and the conversation to open (upsertConvo), and answers requestJwt with a fresh setJwt.
 */
const PARENT_ORIGINS = ["http://localhost", "https://bo.vox-sprachschule.ch"];

let parentOrigin: string | null = null;

export const isParentOrigin = (origin: string): boolean =>
  PARENT_ORIGINS.includes(origin);

/**
 * Remembers the back office that sent the token, so requestJwt goes back to it.
 */
export const setParentOrigin = (origin: string): void => {
  parentOrigin = origin;
};

/**
 * Asks the back office for a fresh token. Returns false when no back office has sent one: the app is not embedded
 * and signs in with a password instead.
 */
export const requestTokenFromParent = (): boolean => {
  if (parentOrigin === null) {
    return false;
  }

  window.parent.postMessage({ call: "requestJwt" }, parentOrigin);
  return true;
};
