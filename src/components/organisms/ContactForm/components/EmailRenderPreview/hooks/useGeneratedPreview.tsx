import { renderAsync } from "@react-email/components";
import { useEffect, useState } from "react";
import sanitizeHtml from "sanitize-html";

import { type FormProps } from "../../../@types";

import { ContactEmailTemplate } from "@/emails/templates";

export const useGeneratedPreview = ({ watch }: FormProps) => {
  const [__html, setHtml] = useState<string>("");

  const {
    first_name = "",
    last_name = "",
    email = "",
    subject = "",
    message = "",
  } = watch();

  useEffect(() => {
    const loadHtml = async () => {
      const html = await renderAsync(
        <ContactEmailTemplate
          first_name={first_name}
          last_name={last_name}
          email={email}
          subject={subject}
          message={sanitizeHtml(message)}
        />,
      );

      setHtml(html);
    };

    loadHtml();
  }, [email, first_name, last_name, message, subject]);

  return {
    __html,
  };
};
