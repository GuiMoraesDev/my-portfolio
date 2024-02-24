import { renderAsync } from "@react-email/components";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

import { type FormProps } from "../../@types";

import { ContactEmailTemplate } from "@/emails/templates";

export const EmailRenderPreview = ({ watch }: FormProps) => {
  const [__html, setHtml] = useState<string>("");

  const {
    first_name = "",
    last_name = "",
    email = "",
    subject = "",
    message = "",
  } = watch();

  const hasSomeValue = first_name || last_name || email || subject || message;

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

    loadHtml();
  }, [email, first_name, last_name, message, subject]);

  return (
    <div
      className={twMerge(
        "h-full w-full rounded-md border border-gray-50 bg-gray-50 p-4 ring-2 ring-gray-800 transition-colors duration-300",
        hasSomeValue ? "bg-gray-50" : "bg-plum-600/80",
      )}
    >
      {hasSomeValue ? (
        <div dangerouslySetInnerHTML={{ __html }} />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <p className="text-center text-gray-500">
            Your email preview will be shown here
          </p>
        </div>
      )}
    </div>
  );
};
