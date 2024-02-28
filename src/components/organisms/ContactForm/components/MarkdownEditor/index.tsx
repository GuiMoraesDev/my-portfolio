"use client";

import { EditorContent } from "@tiptap/react";
import { twMerge } from "tailwind-merge";

import { type FormProps, type EditorProps } from "../../@types";

import { Toolbar } from "./Toolbar";

export type MarkdownEditorProps = FormProps & EditorProps;

export const MarkdownEditor = ({
  editor,
  ...formMethods
}: MarkdownEditorProps) => {
  const { register } = formMethods;

  return (
    <div className="flex h-32 w-full flex-col gap-1 divide-y rounded-md border border-gray-300 px-3 pt-2">
      <EditorContent
        editor={editor}
        id="editor"
        placeholder="Type your message here..."
        className={twMerge(
          "flex h-full min-h-16 w-full cursor-auto",
          "[&_.tiptap]:relative [&_.tiptap]:h-auto [&_.tiptap]:w-full [&_.tiptap]:outline-0",
          "[&_.is-empty]:before:pointer-events-none [&_.is-empty]:before:float-left [&_.is-empty]:before:h-0 [&_.is-empty]:before:text-gray-400 [&_.is-empty]:before:content-[attr(data-placeholder)]",
        )}
      />

      <Toolbar editor={editor} {...formMethods} />

      <input type="hidden" id="message" {...register("message")} />
    </div>
  );
};
