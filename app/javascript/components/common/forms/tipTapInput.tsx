import React from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import Paragraph from "@tiptap/extension-paragraph";

type ToolbarToolbarButtonProps =
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode;
    isActive?: boolean;
  };

const ToolbarButton = ({
  children,
  isActive,
  ...rest
}: ToolbarToolbarButtonProps) => {
  const className = isActive
    ? "text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    : "py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700";
  return (
    <button type="button" className={className} {...rest}>
      {children}
    </button>
  );
};

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-wrap justify-center">
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        isActive={!!editor.isActive("bold")}
      >
        bold
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        isActive={!!editor.isActive("italic")}
      >
        italic
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        isActive={!!editor.isActive("strike")}
      >
        strike
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        isActive={!!editor.isActive("code")}
      >
        code
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
      >
        clear marks
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().clearNodes().run()}>
        clear nodes
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().setParagraph().run()}
        isActive={!!editor.isActive("paragraph")}
      >
        paragraph
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        isActive={!!editor.isActive("heading", { level: 1 })}
      >
        h1
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        isActive={!!editor.isActive("heading", { level: 2 })}
      >
        h2
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        isActive={!!editor.isActive("heading", { level: 3 })}
      >
        h3
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        isActive={!!editor.isActive("heading", { level: 4 })}
      >
        h4
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        isActive={!!editor.isActive("heading", { level: 5 })}
      >
        h5
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        isActive={!!editor.isActive("heading", { level: 6 })}
      >
        h6
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isActive={!!editor.isActive("bulletList")}
      >
        bullet list
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        isActive={!!editor.isActive("orderedList")}
      >
        ordered list
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        isActive={!!editor.isActive("codeBlock")}
      >
        code block
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        isActive={!!editor.isActive("blockquote")}
      >
        blockquote
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      >
        horizontal rule
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().setHardBreak().run()}
      >
        hard break
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        undo
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        redo
      </ToolbarButton>
    </div>
  );
};

type TipTapInputProps = {
  value: string;
  inputName: string;
};

export default ({ value, inputName }: TipTapInputProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
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
