import React from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import { MenuBar } from "./menuBar";

type TipTapInputProps = {
  value: string;
  inputName: string;
};

export default ({ value, inputName }: TipTapInputProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        paragraph: {
          HTMLAttributes: {
            class: "leading-6",
          },
        },
      }),
      Link.configure({
        linkOnPaste: true,
        protocols: ["https"],
        validate: (href) => /^https?:\/\//.test(href),
        HTMLAttributes: {
          class: "text-accent",
        },
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class:
          "min-h-[30ch] md:min-h-[50ch] min-w-full border border-gray-300 prose md:prose-md focus:outline-none bg-white rounded-lg",
      },
    },
  });

  return (
    <div>
      <input
        type="hidden"
        name={inputName}
        value={editor?.getHTML() ?? ""}
      ></input>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};
