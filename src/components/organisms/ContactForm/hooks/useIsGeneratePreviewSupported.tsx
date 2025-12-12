import { useMemo } from "react";

export const useIsGeneratePreviewSupported = () => {
  const isGeneratePreviewSupported = useMemo(() => {
    if (process.env.TEST_ENV === "true") {
      return false;
    }

    try {
      new ReadableStream({
        type: "bytes",
      });

      return true;
    } catch {
      return false;
    }
  }, []);

  return isGeneratePreviewSupported;
};
