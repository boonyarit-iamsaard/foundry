export const AUTH_MESSAGES = {
  credentialsFailed:
    'Could not sign in with those credentials. Check your details and try again.',
  codeSendFailed: 'Could not send a verification code. Try again in a moment.',
  codeSent: 'Verification code sent.',
  codeRequired: 'Please enter the verification code.',
  codeVerificationFailed:
    'That verification code did not work. Check the code and try again.',
  finalizeFailed: 'Could not finish signing in. Try again.',
  noVerificationMethod:
    'This sign-in method is not available right now. Start over or contact support.',
  unexpected: 'Something went wrong. Try again.',
} as const;
