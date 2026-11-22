import React, { useState } from 'react'
import { Plus, Check, Trash2, Tag, Calendar, Search, Filter } from 'lucide-react'

export default function TaskManager({ tasks, setTasks }) {
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [isAdding, setIsAdding] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newCategory, setNewCategory] = useState('Engineering')
  const [newPriority, setNewPriority] = useState('Medium')
  const [newDueDate, setNewDueDate] = useState('')

  const handleToggle = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }

  const handleDelete = (id) => {
    setTasks(tasks.filter(t => t.id !== id))
  }

  const handleAddTask = (e) => {
    e.preventDefault()
    if (!newTitle.trim()) return

    const newTask = {
      id: Date.now(),
      title: newTitle.trim(),
      category: newCategory,
      priority: newPriority,
      dueDate: newDueDate || 'Today',
      completed: false,
      createdAt: new Date().toISOString()
    }

    setTasks([newTask, ...tasks])
    setNewTitle('')
    setNewDueDate('')
    setIsAdding(false)
  }

  const filteredTasks = tasks.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase()) ||
                          t.category.toLowerCase().includes(search.toLowerCase())
    if (!matchesSearch) return false

    if (filter === 'active') return !t.completed
    if (filter === 'completed') return t.completed
    if (filter === 'high') return t.priority === 'High' && !t.completed
    return true
  })

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return { text: '#ef4444', bg: 'var(--danger-light)' }
      case 'Medium': return { text: '#f59e0b', bg: 'var(--warning-light)' }
      default: return { text: '#10b981', bg: 'var(--success-light)' }
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Top Controls Bar */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.75rem',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'var(--bg-secondary)',
        padding: '1rem',
        borderRadius: '16px',
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--card-shadow)'
      }}>
        {/* Search */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          backgroundColor: 'var(--bg-tertiary)',
          padding: '0.5rem 0.85rem',
          borderRadius: '10px',
          flex: '1 1 200px',
          maxWidth: '360px'
        }}>
          <Search size={16} color="var(--text-muted)" />
          <input
            type="text"
            placeholder="Search tasks or tags..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              width: '100%',
              fontSize: '0.875rem'
            }}
          />
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
          {[
            { id: 'all', label: 'All' },
            { id: 'active', label: 'Active' },
            { id: 'completed', label: 'Completed' },
            { id: 'high', label: 'High Priority' },
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              style={{
                padding: '0.4rem 0.75rem',
                borderRadius: '8px',
                fontSize: '0.8125rem',
                fontWeight: filter === f.id ? 600 : 500,
                backgroundColor: filter === f.id ? 'var(--accent)' : 'var(--bg-tertiary)',
                color: filter === f.id ? '#ffffff' : 'var(--text-secondary)'
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* New Task Button */}
        <button
          onClick={() => setIsAdding(!isAdding)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.5rem 1rem',
            borderRadius: '10px',
            backgroundColor: 'var(--accent)',
            color: '#ffffff',
            fontWeight: 600,
            fontSize: '0.875rem'
          }}
        >
          <Plus size={18} />
          <span>New Task</span>
        </button>
      </div>

      {/* Add Task Modal / Form */}
      {isAdding && (
        <form
          onSubmit={handleAddTask}
          style={{
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            borderRadius: '16px',
            padding: '1.25rem',
            boxShadow: 'var(--card-shadow)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}
        >
          <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Create New Task</h3>
          <input
            type="text"
            placeholder="Task title (e.g. Build authentication flow)"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            autoFocus
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              borderRadius: '10px',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-tertiary)',
              outline: 'none',
              fontSize: '0.9375rem'
            }}
          />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.75rem' }}>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Category</label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                style={{
                  width: '100%',
                  marginTop: '0.25rem',
                  padding: '0.5rem',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-tertiary)',
                  fontSize: '0.875rem'
                }}
              >
                <option value="Engineering">Engineering</option>
                <option value="Design">Design</option>
                <option value="Marketing">Marketing</option>
                <option value="Personal">Personal</option>
                <option value="Operations">Operations</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Priority</label>
              <select
                value={newPriority}
                onChange={(e) => setNewPriority(e.target.value)}
                style={{
                  width: '100%',
                  marginTop: '0.25rem',
                  padding: '0.5rem',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-tertiary)',
                  fontSize: '0.875rem'
                }}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Due Date</label>
              <input
                type="text"
                placeholder="Tomorrow, Friday, etc."
                value={newDueDate}
                onChange={(e) => setNewDueDate(e.target.value)}
                style={{
                  width: '100%',
                  marginTop: '0.25rem',
                  padding: '0.5rem',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-tertiary)',
                  fontSize: '0.875rem',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                fontSize: '0.875rem',
                fontWeight: 600
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                padding: '0.5rem 1.25rem',
                borderRadius: '8px',
                backgroundColor: 'var(--accent)',
                color: '#ffffff',
                fontSize: '0.875rem',
                fontWeight: 600
              }}
            >
              Add Task
            </button>
          </div>
        </form>
      )}

      {/* Task List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        {filteredTasks.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '3rem 1rem',
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: '16px',
            border: '1px dashed var(--border-color)',
            color: 'var(--text-muted)'
          }}>
            <p style={{ fontSize: '1rem', fontWeight: 600 }}>No tasks found</p>
            <p style={{ fontSize: '0.8125rem', marginTop: '0.25rem' }}>Try clearing filters or add your first task above!</p>
          </div>
        ) : (
          filteredTasks.map((task) => {
            const pColor = getPriorityColor(task.priority)
            return (
              <div
                key={task.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1rem 1.25rem',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '14px',
                  boxShadow: 'var(--card-shadow)',
                  opacity: task.completed ? 0.7 : 1,
                  transition: 'all 0.2s ease',
                  gap: '1rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flex: 1 }}>
                  <button
                    onClick={() => handleToggle(task.id)}
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '6px',
                      border: task.completed ? 'none' : '2px solid var(--border-color)',
                      backgroundColor: task.completed ? 'var(--success)' : 'transparent',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    {task.completed && <Check size={16} strokeWidth={3} />}
                  </button>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <span style={{
                      fontSize: '0.9375rem',
                      fontWeight: 600,
                      textDecoration: task.completed ? 'line-through' : 'none',
                      color: task.completed ? 'var(--text-muted)' : 'var(--text-primary)'
                    }}>
                      {task.title}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                      <span style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        fontSize: '0.75rem',
                        padding: '0.15rem 0.5rem',
                        borderRadius: '6px',
                        backgroundColor: 'var(--bg-tertiary)',
                        color: 'var(--text-secondary)'
                      }}>
                        <Tag size={12} />
                        {task.category}
                      </span>

                      <span style={{
                        fontSize: '0.75rem',
                        padding: '0.15rem 0.5rem',
                        borderRadius: '6px',
                        backgroundColor: pColor.bg,
                        color: pColor.text,
                        fontWeight: 600
                      }}>
                        {task.priority}
                      </span>

                      <span style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        fontSize: '0.75rem',
                        color: 'var(--text-muted)'
                      }}>
                        <Calendar size={12} />
                        {task.dueDate}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(task.id)}
                  style={{
                    color: 'var(--text-muted)',
                    padding: '0.4rem',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--danger)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
