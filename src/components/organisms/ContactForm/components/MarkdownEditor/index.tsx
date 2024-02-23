"use client";

import UnderlineMark from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useId } from "react";

import { type FormProps } from "../../@types";

import { Toolbar } from "./Toolbar";

export const MarkdownEditor = (formMethods: FormProps) => {
  const editorId = useId();
  const { register, setValue } = formMethods;

  const editor = useEditor({
    extensions: [StarterKit, UnderlineMark],
    onUpdate({ editor }) {
      setValue("message", editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <label
      htmlFor={editorId}
      className="flex w-full flex-col gap-1 divide-y rounded-md border border-gray-300 p-2"
    >
      <EditorContent
        editor={editor}
        placeholder="Type your message here..."
        id={editorId}
        className="flex h-full min-h-16 w-full cursor-auto resize [&_.tiptap]:h-auto [&_.tiptap]:w-full [&_.tiptap]:outline-0"
      />

      <Toolbar editor={editor} {...formMethods} />

      <input type="hidden" id="message" {...register("message")} />
    </label>
  );
};
