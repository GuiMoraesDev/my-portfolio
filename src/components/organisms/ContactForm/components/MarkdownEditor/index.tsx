"use client";

import Placeholder from "@tiptap/extension-placeholder";
import UnderlineMark from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useId } from "react";
import { twMerge } from "tailwind-merge";

import { type FormProps } from "../../@types";

import { Toolbar } from "./Toolbar";

export const MarkdownEditor = (formMethods: FormProps) => {
  const editorId = useId();
  const { register, setValue } = formMethods;

  const editor = useEditor({
    extensions: [
      StarterKit,
      UnderlineMark,
      Placeholder.configure({
        placeholder: "Type your message here...",
      }),
    ],
    content: "",
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
        className={twMerge(
          "h-full min-h-16 w-full cursor-auto",
          "[&_.tiptap]:relative [&_.tiptap]:h-auto [&_.tiptap]:w-full [&_.tiptap]:outline-0",
          "[&_.is-empty]:before:pointer-events-none [&_.is-empty]:before:float-left [&_.is-empty]:before:h-0 [&_.is-empty]:before:text-gray-400 [&_.is-empty]:before:content-[attr(data-placeholder)]",
        )}
      />

      <Toolbar editor={editor} {...formMethods} />

      <input type="hidden" id="message" {...register("message")} />
    </label>
  );
};
