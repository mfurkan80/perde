import { useSyncExternalStore } from "react";
import { getConsentState, subscribeConsent } from "../utils/consent";

export const useConsent = () =>
  useSyncExternalStore(subscribeConsent, getConsentState);
