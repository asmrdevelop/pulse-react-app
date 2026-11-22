import React, { useState } from 'react'
import { Plus, CheckCircle2, Circle, Trash2, Calendar, Tag, AlertCircle } from 'lucide-react'

export default function TaskTracker({ tasks, setTasks }) {
  const [filter, setFilter] = useState('all') // all | active | completed
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState('medium')
  const [category, setCategory] = useState('Development')

  const handleAddTask = (e) => {
    e.preventDefault()
    if (!title.trim()) return

    const newTask = {
      id: Date.now(),
      title: title.trim(),
      priority,
      category,
      completed: false,
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }

    setTasks([newTask, ...tasks])
    setTitle('')
  }

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id))
  }

  const filteredTasks = tasks.filter(t => {
    if (filter === 'active') return !t.completed
    if (filter === 'completed') return t.completed
    return true
  })

  const priorityColors = {
    high: { bg: '#fee2e2', text: '#dc2626', border: '#fca5a5' },
    medium: { bg: '#fef3c7', text: '#d97706', border: '#fcd34d' },
    low: { bg: '#dcfce7', text: '#16a34a', border: '#86efac' },
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Create Task Card */}
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
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Add a new task or milestone..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              flex: '1 1 280px',
              padding: '0.75rem 1rem',
              borderRadius: '10px',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-tertiary)',
              outline: 'none',
              fontSize: '0.875rem'
            }}
          />
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              style={{
                padding: '0.75rem',
                borderRadius: '10px',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-tertiary)',
                color: 'var(--text-primary)',
                fontSize: '0.8125rem'
              }}
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{
                padding: '0.75rem',
                borderRadius: '10px',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-tertiary)',
                color: 'var(--text-primary)',
                fontSize: '0.8125rem'
              }}
            >
              <option value="Development">Code</option>
              <option value="Design">Design</option>
              <option value="Bugfix">Bugfix</option>
              <option value="General">General</option>
            </select>

            <button
              type="submit"
              disabled={!title.trim()}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.75rem 1.25rem',
                borderRadius: '10px',
                backgroundColor: title.trim() ? 'var(--accent)' : 'var(--text-muted)',
                color: '#ffffff',
                fontWeight: 600,
                fontSize: '0.875rem',
                cursor: title.trim() ? 'pointer' : 'not-allowed',
                whiteSpace: 'nowrap'
              }}
            >
              <Plus size={18} />
              <span>Add</span>
            </button>
          </div>
        </div>
      </form>

      {/* Filter Tabs */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '0.75rem'
      }}>
        <div style={{
          display: 'flex',
          gap: '0.25rem',
          backgroundColor: 'var(--bg-tertiary)',
          padding: '0.3rem',
          borderRadius: '10px'
        }}>
          {['all', 'active', 'completed'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              style={{
                padding: '0.4rem 0.85rem',
                borderRadius: '7px',
                fontSize: '0.8125rem',
                fontWeight: filter === tab ? 600 : 500,
                backgroundColor: filter === tab ? 'var(--bg-secondary)' : 'transparent',
                color: filter === tab ? 'var(--text-primary)' : 'var(--text-muted)',
                textTransform: 'capitalize',
                boxShadow: filter === tab ? '0 1px 3px rgba(0,0,0,0.06)' : 'none'
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
          Showing {filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'}
        </span>
      </div>

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
            <p style={{ fontWeight: 600 }}>No tasks found</p>
            <p style={{ fontSize: '0.8125rem', marginTop: '0.25rem' }}>Stay productive and add what you're working on!</p>
          </div>
        ) : (
          filteredTasks.map((task) => {
            const pColor = priorityColors[task.priority] || priorityColors.medium
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
                  borderRadius: '12px',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
                  transition: 'transform 0.15s ease',
                  opacity: task.completed ? 0.65 : 1
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flex: 1 }}>
                  <button
                    onClick={() => toggleTask(task.id)}
                    aria-label="Toggle completed"
                    style={{
                      color: task.completed ? 'var(--success)' : 'var(--text-muted)',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    {task.completed ? <CheckCircle2 size={20} /> : <Circle size={20} />}
                  </button>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                    <span style={{
                      fontSize: '0.9375rem',
                      fontWeight: 500,
                      textDecoration: task.completed ? 'line-through' : 'none',
                      color: task.completed ? 'var(--text-muted)' : 'var(--text-primary)'
                    }}>
                      {task.title}
                    </span>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <span style={{
                        fontSize: '0.6875rem',
                        fontWeight: 600,
                        padding: '0.15rem 0.5rem',
                        borderRadius: '999px',
                        backgroundColor: pColor.bg,
                        color: pColor.text,
                        border: `1px solid ${pColor.border}`,
                        textTransform: 'uppercase'
                      }}>
                        {task.priority}
                      </span>
                      <span style={{
                        fontSize: '0.75rem',
                        color: 'var(--text-muted)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem'
                      }}>
                        <Tag size={12} />
                        {task.category}
                      </span>
                      <span style={{
                        fontSize: '0.75rem',
                        color: 'var(--text-muted)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem'
                      }}>
                        <Calendar size={12} />
                        {task.createdAt}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => deleteTask(task.id)}
                  aria-label="Delete task"
                  style={{
                    padding: '0.5rem',
                    borderRadius: '8px',
                    color: 'var(--text-muted)'
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
