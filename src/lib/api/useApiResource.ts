"use client";

import { useEffect, useState } from "react";

export type ApiState<T> =
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; code: string; message: string; httpStatus: number };

interface ApiEnvelopeSuccess<T> {
  data: T;
}

interface ApiEnvelopeError {
  error: { code: string; message: string };
}

/**
 * Fetches one SkillGraph API endpoint from the browser and exposes a
 * loading/success/error state a component can render directly. Never talks
 * to CognoDB or the service/query layers itself — only the JSON contract
 * the API routes already return.
 */
export function useApiResource<T>(path: string | null): ApiState<T> & { refetch: () => void } {
  const [state, setState] = useState<ApiState<T>>({ status: "loading" });
  const [nonce, setNonce] = useState(0);

  // Reset to loading during render (not inside the Effect below) when the
  // requested path itself changes, per React's "adjust state while
  // rendering" pattern — this avoids an extra render with stale data.
  const [trackedPath, setTrackedPath] = useState(path);
  if (path !== trackedPath) {
    setTrackedPath(path);
    setState({ status: "loading" });
  }

  useEffect(() => {
    if (!path) {
      return;
    }

    let cancelled = false;

    fetch(path)
      .then(async (response) => {
        if (cancelled) return;

        const body = (await response.json()) as ApiEnvelopeSuccess<T> | ApiEnvelopeError;

        if (!response.ok || "error" in body) {
          const errorBody = "error" in body ? body.error : null;
          setState({
            status: "error",
            code: errorBody?.code ?? "UNKNOWN",
            message: errorBody?.message ?? "Something went wrong.",
            httpStatus: response.status,
          });
          return;
        }

        setState({ status: "success", data: body.data });
      })
      .catch(() => {
        if (!cancelled) {
          setState({
            status: "error",
            code: "NETWORK_ERROR",
            message: "Could not reach SkillGraph.",
            httpStatus: 0,
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [path, nonce]);

  const refetch = () => {
    setState({ status: "loading" });
    setNonce((n) => n + 1);
  };

  return { ...state, refetch };
}
