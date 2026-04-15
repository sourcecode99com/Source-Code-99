import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Youtube from '@tiptap/extension-youtube';
import { 
  Bold, Italic, Underline as UnderlineIcon, 
  List, ListOrdered, Quote, Heading1, Heading2, Heading3,
  AlignLeft, AlignCenter, AlignRight, 
  Link as LinkIcon, Image as ImageIcon, Youtube as YoutubeIcon,
  Undo, Redo, Code
} from 'lucide-react';
import { cn } from '../lib/utils';

interface TiptapEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) return null;

  const addLink = () => {
    const url = window.prompt('URL');
    if (url) {
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }
  };

  const addImage = () => {
    const url = window.prompt('Image URL');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const addYoutube = () => {
    const url = window.prompt('YouTube URL');
    if (url) {
      editor.commands.setYoutubeVideo({ src: url });
    }
  };

  const buttons = [
    { icon: Bold, action: () => editor.chain().focus().toggleBold().run(), active: 'bold' },
    { icon: Italic, action: () => editor.chain().focus().toggleItalic().run(), active: 'italic' },
    { icon: UnderlineIcon, action: () => editor.chain().focus().toggleUnderline().run(), active: 'underline' },
    { icon: Code, action: () => editor.chain().focus().toggleCode().run(), active: 'code' },
    { type: 'divider' },
    { icon: Heading1, action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(), active: { heading: { level: 1 } } },
    { icon: Heading2, action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), active: { heading: { level: 2 } } },
    { icon: Heading3, action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(), active: { heading: { level: 3 } } },
    { type: 'divider' },
    { icon: List, action: () => editor.chain().focus().toggleBulletList().run(), active: 'bulletList' },
    { icon: ListOrdered, action: () => editor.chain().focus().toggleOrderedList().run(), active: 'orderedList' },
    { icon: Quote, action: () => editor.chain().focus().toggleBlockquote().run(), active: 'blockquote' },
    { type: 'divider' },
    { icon: AlignLeft, action: () => editor.chain().focus().setTextAlign('left').run(), active: { textAlign: 'left' } },
    { icon: AlignCenter, action: () => editor.chain().focus().setTextAlign('center').run(), active: { textAlign: 'center' } },
    { icon: AlignRight, action: () => editor.chain().focus().setTextAlign('right').run(), active: { textAlign: 'right' } },
    { type: 'divider' },
    { icon: LinkIcon, action: addLink, active: 'link' },
    { icon: ImageIcon, action: addImage },
    { icon: YoutubeIcon, action: addYoutube },
    { type: 'divider' },
    { icon: Undo, action: () => editor.chain().focus().undo().run() },
    { icon: Redo, action: () => editor.chain().focus().redo().run() },
  ];

  return (
    <div className="flex flex-wrap gap-1 p-2 border-b border-slate-800 bg-slate-900/50 sticky top-0 z-10">
      {buttons.map((btn, i) => {
        if (btn.type === 'divider') {
          return <div key={i} className="w-px h-6 bg-slate-800 mx-1 self-center" />;
        }
        const Icon = btn.icon!;
        const isActive = btn.active ? editor.isActive(btn.active) : false;

        return (
          <button
            key={i}
            onClick={btn.action}
            className={cn(
              "p-2 rounded-lg transition-colors",
              isActive 
                ? "bg-blue-600/20 text-blue-500" 
                : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
            )}
          >
            <Icon size={18} />
          </button>
        );
      })}
    </div>
  );
};

const TiptapEditor: React.FC<TiptapEditorProps> = ({ content, onChange, placeholder }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-500 hover:underline cursor-pointer',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-xl max-w-full h-auto my-8 shadow-2xl',
        },
      }),
      Placeholder.configure({
        placeholder: placeholder || 'Mulai menulis artikel...',
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Youtube.configure({
        width: 840,
        height: 480,
        HTMLAttributes: {
          class: 'rounded-xl overflow-hidden aspect-video w-full my-8 shadow-2xl',
        },
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none min-h-[500px] p-8 focus:outline-none',
      },
    },
  });

  // Update content if it changes externally (e.g. from AI)
  React.useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  return (
    <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-900/30">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default TiptapEditor;
