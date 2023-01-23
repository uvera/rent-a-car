import React from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import Paragraph from "@tiptap/extension-paragraph";
import Link from "@tiptap/extension-link";
import { MenuBar } from "./menuBar";

type TipTapInputProps = {
  value: string;
  inputName: string;
};

export default ({ value, inputName }: TipTapInputProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        linkOnPaste: true,
        protocols: ["https"],
        validate: (href) => /^https?:\/\//.test(href),
        HTMLAttributes: {
          class: "text-yellow-600",
        },
      }),
      Paragraph.configure({
        HTMLAttributes: {
          class: "leading-6",
        },
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class:
          "min-h-[50em] min-w-full border border-gray-300 prose md:prose-md m-5 focus:outline-none",
      },
    },
  });

  return (
    <div>
      <input type="hidden" name={inputName} value={editor?.getHTML()}></input>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};
