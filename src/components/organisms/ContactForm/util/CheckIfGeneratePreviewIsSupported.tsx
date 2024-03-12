export const CheckIfGeneratePreviewIsSupported = () => {
  if (process.env.TEST_ENV === "true") {
    return false;
  }

  try {
    new ReadableStream({
      type: "bytes",
    });

    return true;
  } catch (err) {
    return false;
  }
};
