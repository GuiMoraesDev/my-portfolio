import { type Editor } from "@tiptap/react";
import { type UseFormReturn } from "react-hook-form";

import { type SendEmailProps } from "@/schemas/email/schema";

export type FormProps = UseFormReturn<SendEmailProps>;

export type EditorProps = {
  editor: Editor;
};
