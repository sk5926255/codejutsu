'use client';

import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { RichTextEditor, Link } from '@mantine/tiptap';
import Placeholder from '@tiptap/extension-placeholder';
import { createLowlight } from 'lowlight';
import ts from 'highlight.js/lib/languages/typescript';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import cpp from 'highlight.js/lib/languages/cpp';
import java from 'highlight.js/lib/languages/java';
import Underline from '@tiptap/extension-underline';
import Superscript from '@tiptap/extension-superscript';
import Subscript from '@tiptap/extension-subscript';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import Color from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';

interface TiptapProps {
  setDescription: (description: string) => void;
  defaultContent?: string;
}

export default function TextEditor({ setDescription, defaultContent }: TiptapProps) {
  const lowlight = createLowlight();
  lowlight.register({ ts, cpp, java });
  //   function escapeHtml(unsafe: string) {
  //     return unsafe
  //       .replace(/&/g, '&amp;')
  //       .replace(/</g, '&lt;')
  //       .replace(/>/g, '&gt;')
  //       .replace(/"/g, '&quot;')
  //       .replace(/'/g, '&#039;');
  //   }

  //   const codeExample =
  //     escapeHtml(`// Valid braces Kata – https://www.codewars.com/kata/5277c8a221e209d3f6000b56

  // const pairs: Record<string, string> = {
  //   '[': ']',
  //   '{': '}',
  //   '(': ')',
  // };

  // const openBraces = Object.keys(pairs);

  // export function validBraces(braces: string) {
  //   const opened: string[] = [];

  //   for (let i = 0; i < braces.length; i += 1) {
  //     const brace = braces[i];

  //     if (openBraces.includes(brace)) {
  //       opened.push(brace);
  //       continue;
  //     }

  //     if (pairs[opened[opened.length - 1]] !== brace) {
  //       return false
  //     }

  //     opened.pop();
  //   }

  //   return opened.length === 0;
  // }`);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      CodeBlockLowlight.configure({ lowlight }),
      Link,
      Underline,
      Superscript,
      Color,
      Subscript,
      Highlight,
      TextStyle,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({ placeholder: "write blogs's content here..." }),
    ],
    // content: `<p>Regular paragraph</p><pre><code>${codeExample}</code></pre>`,
    content: defaultContent || '',

    onUpdate: ({ editor: updatedEditor }) => {
      const jsonContent = updatedEditor.getJSON();
      const jsonString = JSON.stringify(jsonContent);
      setDescription(jsonString);
    },
  });

  return (
    <RichTextEditor editor={editor}>
      <RichTextEditor.Toolbar sticky stickyOffset={60}>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Bold />
          <RichTextEditor.Italic />
          <RichTextEditor.Underline />
          <RichTextEditor.Strikethrough />
          <RichTextEditor.ClearFormatting />
          <RichTextEditor.Highlight />
          <RichTextEditor.CodeBlock />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.H1 />
          <RichTextEditor.H2 />
          <RichTextEditor.H3 />
          <RichTextEditor.H4 />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Blockquote />
          <RichTextEditor.Hr />
          <RichTextEditor.BulletList />
          <RichTextEditor.OrderedList />
          <RichTextEditor.Subscript />
          <RichTextEditor.Superscript />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Link />
          <RichTextEditor.Unlink />
        </RichTextEditor.ControlsGroup>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.ColorPicker
            colors={[
              '#25262b',
              '#868e96',
              '#fa5252',
              '#e64980',
              '#be4bdb',
              '#7950f2',
              '#4c6ef5',
              '#228be6',
              '#15aabf',
              '#12b886',
              '#40c057',
              '#82c91e',
              '#fab005',
              '#fd7e14',
            ]}
          />
          {/* <RichTextEditor.Color /> */}
          <RichTextEditor.UnsetColor />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.AlignLeft />
          <RichTextEditor.AlignCenter />
          <RichTextEditor.AlignJustify />
          <RichTextEditor.AlignRight />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Undo />
          <RichTextEditor.Redo />
        </RichTextEditor.ControlsGroup>
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content />
    </RichTextEditor>
  );
}
