import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import styles from './RichTextEditor.module.css'

export default function RichTextEditor({ value, onChange, placeholder }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        codeBlock: false,
        blockquote: false,
        horizontalRule: false,
        strike: false,
        code: false,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { target: '_blank', rel: 'noopener noreferrer' },
      }),
      Placeholder.configure({ placeholder }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  if (!editor) return null

  return (
    <div className={styles.root}>
      <div className={styles.toolbar}>
        <button
          type="button"
          className={`${styles.btn} ${editor.isActive('bold') ? styles.active : ''}`}
          onClick={() => editor.chain().focus().toggleBold().run()}
          title="Negrita"
        >
          <b>B</b>
        </button>
        <button
          type="button"
          className={`${styles.btn} ${editor.isActive('italic') ? styles.active : ''}`}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          title="Cursiva"
        >
          <i>I</i>
        </button>
        <span className={styles.sep} />
        <button
          type="button"
          className={`${styles.btn} ${editor.isActive('bulletList') ? styles.active : ''}`}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          title="Lista"
        >
          •≡
        </button>
        <button
          type="button"
          className={`${styles.btn} ${editor.isActive('orderedList') ? styles.active : ''}`}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          title="Lista numerada"
        >
          1.
        </button>
        <span className={styles.sep} />
        <button
          type="button"
          className={`${styles.btn} ${editor.isActive('link') ? styles.active : ''}`}
          onClick={() => {
            if (editor.isActive('link')) {
              editor.chain().focus().unsetLink().run()
              return
            }
            const url = window.prompt('URL del enlace:')
            if (url) {
              editor.chain().focus().setLink({ href: url }).run()
            }
          }}
          title="Enlace"
        >
          🔗
        </button>
      </div>
      <EditorContent editor={editor} className={styles.content} />
    </div>
  )
}
