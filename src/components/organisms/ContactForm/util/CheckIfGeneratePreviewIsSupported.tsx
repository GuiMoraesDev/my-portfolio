export const checkIfGeneratePreviewIsSupported = () => {
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
};
