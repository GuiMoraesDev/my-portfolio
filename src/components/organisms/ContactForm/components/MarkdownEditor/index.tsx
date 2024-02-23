"use client";

import UnderlineMark from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { Toolbar, FormProps } from "./Toolbar";

export const MarkdownEditor = (formMethods: FormProps) => {
  const { register, setValue } = formMethods;

  const editor = useEditor({
    extensions: [StarterKit, UnderlineMark],
    onTransaction({ editor }) {
      setValue("message", editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <label className="flex w-full flex-col gap-1 divide-y rounded-md border border-gray-300 px-2">
      <EditorContent
        editor={editor}
        placeholder="Type your message here..."
        className="h-full min-h-16 w-full resize p-2 [&_.tiptap]:h-full [&_.tiptap]:outline-0"
      />

      <Toolbar editor={editor} {...formMethods} />

      <input
        type="hidden"
        id="message"
        /* placeholder={t("form.placeholders.message")} */
        {...register("message")}
      />
    </label>
  );
};
