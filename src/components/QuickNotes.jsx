import React, { useState } from 'react'
import { Plus, Trash2, Copy, Check, StickyNote } from 'lucide-react'

export default function QuickNotes({ notes, setNotes }) {
  const [content, setContent] = useState('')
  const [copiedId, setCopiedId] = useState(null)

  const handleAdd = (e) => {
    e.preventDefault()
    if (!content.trim()) return

    const newNote = {
      id: Date.now(),
      text: content.trim(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      color: ['#fef3c7', '#e0e7ff', '#dcfce7', '#fce7f3'][Math.floor(Math.random() * 4)]
    }

    setNotes([newNote, ...notes])
    setContent('')
  }

  const handleDelete = (id) => {
    setNotes(notes.filter(n => n.id !== id))
  }

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Add Note Input */}
      <form
        onSubmit={handleAdd}
        style={{
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: '16px',
          padding: '1.25rem',
          boxShadow: 'var(--card-shadow)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent)' }}>
          <StickyNote size={18} />
          <span style={{ fontWeight: 700, fontSize: '0.9375rem' }}>Add Quick Thought / Scratchpad</span>
        </div>
        <textarea
          placeholder="Jot down quick ideas, meeting snippets, or terminal commands..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={3}
          style={{
            width: '100%',
            padding: '0.75rem 1rem',
            borderRadius: '10px',
            border: '1px solid var(--border-color)',
            backgroundColor: 'var(--bg-tertiary)',
            outline: 'none',
            fontSize: '0.875rem',
            resize: 'vertical'
          }}
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            type="submit"
            disabled={!content.trim()}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.5rem 1.25rem',
              borderRadius: '8px',
              backgroundColor: content.trim() ? 'var(--accent)' : 'var(--text-muted)',
              color: '#ffffff',
              fontSize: '0.875rem',
              fontWeight: 600,
              cursor: content.trim() ? 'pointer' : 'not-allowed'
            }}
          >
            <Plus size={16} />
            <span>Save Note</span>
          </button>
        </div>
      </form>

      {/* Notes Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        gap: '1rem'
      }}>
        {notes.length === 0 ? (
          <div style={{
            gridColumn: '1 / -1',
            textAlign: 'center',
            padding: '3rem 1rem',
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: '16px',
            border: '1px dashed var(--border-color)',
            color: 'var(--text-muted)'
          }}>
            <p style={{ fontWeight: 600 }}>Your scratchpad is empty</p>
            <p style={{ fontSize: '0.8125rem', marginTop: '0.25rem' }}>Add notes above to keep track of quick ideas!</p>
          </div>
        ) : (
          notes.map((note) => (
            <div
              key={note.id}
              style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: '16px',
                padding: '1.25rem',
                boxShadow: 'var(--card-shadow)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '140px',
                gap: '1rem',
                position: 'relative'
              }}
            >
              <p style={{
                fontSize: '0.875rem',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                lineHeight: 1.6,
                color: 'var(--text-primary)'
              }}>
                {note.text}
              </p>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '0.75rem',
                borderTop: '1px solid var(--border-color)',
                fontSize: '0.75rem',
                color: 'var(--text-muted)'
              }}>
                <span>{note.date}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <button
                    onClick={() => handleCopy(note.id, note.text)}
                    aria-label="Copy note"
                    style={{
                      padding: '0.3rem',
                      borderRadius: '6px',
                      color: copiedId === note.id ? 'var(--success)' : 'var(--text-muted)'
                    }}
                  >
                    {copiedId === note.id ? <Check size={14} /> : <Copy size={14} />}
                  </button>

                  <button
                    onClick={() => handleDelete(note.id)}
                    aria-label="Delete note"
                    style={{
                      padding: '0.3rem',
                      borderRadius: '6px',
                      color: 'var(--text-muted)'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--danger)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
