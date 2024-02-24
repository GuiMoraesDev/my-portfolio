"use client";

import {
  CodeIcon,
  DividerHorizontalIcon,
  FontBoldIcon,
  FontItalicIcon,
  MagicWandIcon,
  ResetIcon,
  StrikethroughIcon,
  UnderlineIcon,
} from "@radix-ui/react-icons";
import { startSpan } from "@sentry/nextjs";
import { type Editor } from "@tiptap/react";
import { useLocale } from "next-intl";
import { type ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

import { type FormProps } from "../../@types";
import { useGenerateEmailMutation } from "../../hooks";

import { Tooltip } from "@/components/atoms/Tooltip";

type EditorProps = {
  editor: Editor;
};

type ToolBarProps = FormProps & EditorProps;
export const Toolbar = ({ editor, ...formMethods }: ToolBarProps) => (
  <nav className="flex w-full items-center gap-4 p-2">
    <section className="flex items-center gap-2">
      <ToolButton
        handleClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        description="Undo"
      >
        <ResetIcon />
      </ToolButton>

      <ToolButton
        handleClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        description="Redo"
      >
        <ResetIcon className="-scale-x-100" />
      </ToolButton>
    </section>

    <section className="flex items-center gap-2">
      <ToolButton
        handleClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        isActive={editor.isActive("bold")}
        description="Bold"
      >
        <FontBoldIcon />
      </ToolButton>

      <ToolButton
        handleClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        isActive={editor.isActive("italic")}
        description="Italic"
      >
        <FontItalicIcon />
      </ToolButton>

      <ToolButton
        handleClick={() => editor.chain().focus().toggleUnderline().run()}
        disabled={!editor.can().chain().focus().toggleUnderline().run()}
        isActive={editor.isActive("underline")}
        description="Underline"
      >
        <UnderlineIcon />
      </ToolButton>

      <ToolButton
        handleClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        isActive={editor.isActive("strike")}
        description="Strikethrough"
      >
        <StrikethroughIcon />
      </ToolButton>
    </section>

    <section className="flex items-center gap-2">
      <ToolButton
        handleClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        isActive={editor.isActive("code")}
        description="Code"
      >
        <CodeIcon />
      </ToolButton>

      <ToolButton
        handleClick={() => editor.chain().focus().setHorizontalRule().run()}
        description="Divider"
      >
        <DividerHorizontalIcon />
      </ToolButton>

      <GenerateButton {...formMethods} />
    </section>
  </nav>
);

const GenerateButton = ({ getValues, setValue, trigger, watch }: FormProps) => {
  const locale = useLocale();
  const { isPending, mutateAsync } = useGenerateEmailMutation();
  const [firstNameValue, lastNameValue, subjectValue] = watch([
    "first_name",
    "last_name",
    "subject",
  ]);

  const isFormFilled =
    firstNameValue?.length > 0 &&
    lastNameValue?.length > 0 &&
    subjectValue?.length > 0;

  const handleSubmit = async () => {
    await trigger?.(["first_name", "last_name", "subject"]);

    if (!isFormFilled) return;

    const values = getValues();
    startSpan(
      {
        name: "Generate email message from AI span",
        attributes: {
          ...values,
        },
      },
      async () => {
        const response = await mutateAsync({ locale, ...values });

        if (!response.ok) {
          throw new Error("Error on AI generate mutation");
        }

        const data = await response.json();
        setValue("message", data);
      },
    );
  };

  return (
    <ToolButton
      handleClick={handleSubmit}
      disabled={isPending || !isFormFilled}
      description="Fill the form to generate a message with AI"
    >
      <MagicWandIcon />
    </ToolButton>
  );
};

type ToolButtonProps = Omit<ComponentProps<"button">, "onClick"> & {
  handleClick?: () => void;
  isActive?: boolean;
  description: string;
};

const ToolButton = ({
  isActive,
  disabled,
  description,
  handleClick,
  className,
  ...props
}: ToolButtonProps) => {
  const onClick = () => {
    if (disabled) return;

    handleClick?.();
  };

  return (
    <Tooltip.Provider>
      <Tooltip.Root delayDuration={0}>
        <Tooltip.Trigger asChild>
          <button
            className={twMerge(
              "inline-flex h-full w-full cursor-pointer p-px text-sm",
              "disabled:cursor-not-allowed disabled:text-gray-400",
              isActive && "font-bold text-plum-900",
              className,
            )}
            {...props}
            disabled={disabled}
            type="button"
            onClick={onClick}
          />
        </Tooltip.Trigger>

        <Tooltip.Content className="border-plum-900 bg-plum-600">
          {description}
        </Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};
