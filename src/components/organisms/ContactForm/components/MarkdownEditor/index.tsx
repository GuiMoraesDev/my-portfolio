"use client";

import { EditorContent } from "@tiptap/react";
import { twMerge } from "tailwind-merge";

import { type FormProps, type EditorProps } from "../../@types";

import { Toolbar } from "./Toolbar";

export type MarkdownEditorProps = FormProps &
  EditorProps & {
    disabled?: boolean;
  };

export const MarkdownEditor = ({
  editor,
  disabled = false,
  ...formMethods
}: MarkdownEditorProps) => {
  const { register } = formMethods;

  return (
    <div
      className={twMerge(
        "flex h-auto w-full flex-col gap-1 divide-y rounded-md bg-plum-800/80 px-3 pt-2",
        disabled && "cursor-not-allowed opacity-50",
      )}
    >
      <EditorContent
        disabled={disabled}
        editor={editor}
        id="editor"
        className={twMerge(
          "flex h-full min-h-16 w-full cursor-auto",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "[&_.tiptap]:relative [&_.tiptap]:h-auto [&_.tiptap]:w-full [&_.tiptap]:outline-0",
          "[&_.is-empty]:before:pointer-events-none [&_.is-empty]:before:float-left [&_.is-empty]:before:h-0 [&_.is-empty]:before:text-gray-400 [&_.is-empty]:before:content-[attr(data-placeholder)]",
        )}
      />

      <Toolbar editor={editor} {...formMethods} />

      <input type="hidden" id="message" {...register("message")} />
    </div>
  );
};
