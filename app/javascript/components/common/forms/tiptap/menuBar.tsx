import { Editor } from "@tiptap/react";
import React, { useCallback, useState } from "react";
import { Button, Modal, TextInput } from "flowbite-react";
import i18n from "../../../../util/i18n";

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
    ? "text-white bg-orange-700 hover:bg-orange-800 focus:outline-none focus:ring-4 focus:ring-orange-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
    : "py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-orange-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700";
  return (
    <button type="button" className={className} {...rest}>
      {children}
    </button>
  );
};

const ToolbarLinkButton = ({ editor }: { editor: Editor }) => {
  const [isModalShown, setModalShown] = useState(false);
  const [urlFromModal, setUrlFromModal] = useState("");

  const setLink = useCallback(
    (url: string) => {
      // cancelled
      if (url === null) {
        return;
      }

      // empty
      if (url === "") {
        editor.chain().focus().extendMarkRange("link").unsetLink().run();

        return;
      }

      // update link
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    },
    [editor]
  );

  const openModal = () => {
    const previousUrl = editor.getAttributes("link").href;
    setUrlFromModal(previousUrl);
    setModalShown(true);
  };

  const closeModal = () => {
    setModalShown(false);
    setUrlFromModal("");
  };

  const submitModal = () => {
    setLink(urlFromModal);
    closeModal();
  };

  if (!editor) {
    return null;
  }

  return (
    <>
      <Modal show={isModalShown} onClose={() => closeModal()}>
        <Modal.Header>Link</Modal.Header>
        <Modal.Body>
          <TextInput
            value={urlFromModal}
            onChange={(e) => setUrlFromModal(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => submitModal()}>
            {i18n.t("forms.buttons.save")}
          </Button>
          <Button color={"light"} onClick={() => closeModal()}>
            {i18n.t("forms.buttons.cancel")}
          </Button>
        </Modal.Footer>
      </Modal>
      <ToolbarButton
        isActive={!!editor.isActive("link")}
        onClick={() => openModal()}
      >
        link
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().unsetLink().run()}
        disabled={!editor.isActive("link")}
      >
        unset link
      </ToolbarButton>
    </>
  );
};

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-wrap justify-center">
      <ToolbarLinkButton editor={editor} />
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

export { MenuBar };
