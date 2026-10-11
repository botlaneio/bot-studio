"use client";

import { useEffect } from "react";
import { rememberArrival } from "@/lib/visitSource";

/** Notes how this tab arrived, for the inquiry email only (see visitSource). */
export function ArrivalNote() {
  useEffect(() => {
    rememberArrival();
  }, []);
  return null;
}
