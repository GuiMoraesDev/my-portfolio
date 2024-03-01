import { renderAsync } from "@react-email/components";
import { useEffect, useState } from "react";

import { type FormProps } from "../../../@types";

import { ContactEmailTemplate } from "@/emails/templates";

const validateSupport = () => {
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

export const useGeneratedPreview = ({ watch }: FormProps) => {
  const [__html, setHtml] = useState<string>("");

  const {
    first_name = "",
    last_name = "",
    email = "",
    subject = "",
    message = "",
  } = watch();

  const hasSomeValue = first_name || last_name || email || subject || message;
  const isSupported = validateSupport();

  useEffect(() => {
    const loadHtml = async () => {
      const html = await renderAsync(
        <ContactEmailTemplate
          first_name={first_name}
          last_name={last_name}
          email={email}
          subject={subject}
          message={message}
        />,
      );

      setHtml(html);
    };

    if (hasSomeValue && isSupported) {
      loadHtml();
    }
  }, [
    email,
    first_name,
    hasSomeValue,
    isSupported,
    last_name,
    message,
    subject,
  ]);

  return {
    __html,
    state: {
      support: isSupported,
      awaiting: !hasSomeValue,
    },
  };
};
