"use client";

import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useTheme } from "next-themes";

interface RichEditorProps {
  value: string;
  onChange: (value: string) => void;
  height?: number;
}

export function RichEditor({ value, onChange, height = 400 }: RichEditorProps) {
  const editorRef = useRef<any>(null);
  const { resolvedTheme } = useTheme();

  return (
    <Editor
      apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY || "no-api-key"}
      onInit={(_, editor) => (editorRef.current = editor)}
      value={value}
      onEditorChange={onChange}
      init={{
        height,
        menubar: false,
        skin: resolvedTheme === "dark" ? "oxide-dark" : "oxide",
        content_css: resolvedTheme === "dark" ? "dark" : "default",
        plugins: [
          "advlist",
          "autolink",
          "lists",
          "link",
          "image",
          "charmap",
          "preview",
          "anchor",
          "searchreplace",
          "visualblocks",
          "code",
          "fullscreen",
          "insertdatetime",
          "media",
          "table",
          "help",
          "wordcount",
        ],
        toolbar:
          "undo redo | blocks | bold italic underline strikethrough | table " +
          "alignleft aligncenter alignright alignjustify | " +
          "bullist numlist outdent indent | link image | " +
          "removeformat | code | help",
        content_style:
          "body { font-family: Inter, sans-serif; font-size: 14px; line-height: 1.6; }",
        branding: false,
        promotion: false,
      }}
    />
  );
}
