import React, { useState, useEffect } from 'react'
import {
  CheckSquare,
  Clock,
  FileText,
  Cpu,
  Moon,
  Sun,
  Sparkles,
  LayoutDashboard,
  CheckCircle,
  TrendingUp,
  FolderKanban
} from 'lucide-react'
import TaskTracker from './components/TaskTracker'
import FocusTimer from './components/FocusTimer'
import QuickNotes from './components/QuickNotes'
import TechStackInspector from './components/TechStackInspector'

export default function App() {
  // Theme state
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark'
  })

  // Tab state
  const [activeTab, setActiveTab] = useState('tasks')

  // Tasks state with LocalStorage fallback
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('app_tasks')
    if (saved) {
      try { return JSON.parse(saved) } catch (e) {}
    }
    return [
      { id: 1, title: 'Bootstrap React app with modern Vite build system', priority: 'high', category: 'Development', completed: true, createdAt: 'May 10' },
      { id: 2, title: 'Implement dark/light responsive layout design tokens', priority: 'medium', category: 'Design', completed: true, createdAt: 'May 10' },
      { id: 3, title: 'Build Focus Pomodoro productivity module', priority: 'medium', category: 'Development', completed: false, createdAt: 'May 10' },
      { id: 4, title: 'Configure auto-reloading HMR development server', priority: 'low', category: 'DevOps', completed: true, createdAt: 'May 10' },
    ]
  })

  // Quick notes state with LocalStorage fallback
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('app_notes')
    if (saved) {
      try { return JSON.parse(saved) } catch (e) {}
    }
    return [
      {
        id: 1,
        text: '🚀 Pro Tip: Run `npm run build` to verify production bundle output.',
        date: 'May 10, 10:30 AM',
        color: '#dcfce7'
      },
      {
        id: 2,
        text: 'Vite dev server is bound to port 5173 with full HMR (Hot Module Replacement) enabled.',
        date: 'May 10, 10:35 AM',
        color: '#e0e7ff'
      }
    ]
  })

  // Synchronize theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  // Save tasks and notes
  useEffect(() => {
    localStorage.setItem('app_tasks', JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    localStorage.setItem('app_notes', JSON.stringify(notes))
  }, [notes])

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'))
  }

  const completedCount = tasks.filter(t => t.completed).length
  const completionRate = tasks.length ? Math.round((completedCount / tasks.length) * 100) : 0

  const navItems = [
    { id: 'tasks', label: 'Tasks & Projects', icon: CheckSquare },
    { id: 'focus', label: 'Focus Pomodoro', icon: Clock },
    { id: 'notes', label: 'Scratchpad', icon: FileText },
    { id: 'stack', label: 'Stack Inspector', icon: Cpu },
  ]

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Navigation Bar */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border-color)',
        backdropFilter: 'blur(8px)',
        padding: '0.75rem 1.5rem',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          {/* Logo & Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              boxShadow: '0 4px 12px rgba(99, 102, 241, 0.35)'
            }}>
              <Sparkles size={20} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <h1 style={{ fontSize: '1.05rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
                  Pulse
                </h1>
                <span style={{
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  padding: '0.1rem 0.45rem',
                  borderRadius: '999px',
                  backgroundColor: 'rgba(99, 102, 241, 0.15)',
                  color: 'var(--accent)'
                }}>
                  React 18
                </span>
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Personal Workspace & Dev Dashboard
              </p>
            </div>
          </div>

          {/* Right Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-tertiary)',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main style={{
        maxWidth: '1200px',
        width: '100%',
        margin: '0 auto',
        padding: '1.5rem',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
      }}>
        {/* Metric Cards Banner */}
        <section style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1rem',
        }}>
          <div style={{
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            borderRadius: '16px',
            padding: '1.25rem',
            boxShadow: 'var(--card-shadow)',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}>
            <div style={{
              padding: '0.75rem',
              borderRadius: '12px',
              backgroundColor: 'rgba(99, 102, 241, 0.1)',
              color: 'var(--accent)',
            }}>
              <FolderKanban size={24} />
            </div>
            <div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Total Tasks</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>{tasks.length}</div>
            </div>
          </div>

          <div style={{
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            borderRadius: '16px',
            padding: '1.25rem',
            boxShadow: 'var(--card-shadow)',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}>
            <div style={{
              padding: '0.75rem',
              borderRadius: '12px',
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              color: 'var(--success)',
            }}>
              <CheckCircle size={24} />
            </div>
            <div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Completed</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>{completedCount}</div>
            </div>
          </div>

          <div style={{
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            borderRadius: '16px',
            padding: '1.25rem',
            boxShadow: 'var(--card-shadow)',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}>
            <div style={{
              padding: '0.75rem',
              borderRadius: '12px',
              backgroundColor: 'rgba(236, 72, 153, 0.1)',
              color: '#ec4899',
            }}>
              <TrendingUp size={24} />
            </div>
            <div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Progress</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>{completionRate}%</div>
            </div>
          </div>

          <div style={{
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            borderRadius: '16px',
            padding: '1.25rem',
            boxShadow: 'var(--card-shadow)',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}>
            <div style={{
              padding: '0.75rem',
              borderRadius: '12px',
              backgroundColor: 'rgba(234, 179, 8, 0.1)',
              color: '#eab308',
            }}>
              <FileText size={24} />
            </div>
            <div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Saved Notes</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>{notes.length}</div>
            </div>
          </div>
        </section>

        {/* Tab Navigation */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          borderBottom: '1px solid var(--border-color)',
          paddingBottom: '0.5rem',
          overflowX: 'auto',
        }}>
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.65rem 1rem',
                  borderRadius: '10px',
                  fontWeight: isActive ? 600 : 500,
                  fontSize: '0.875rem',
                  backgroundColor: isActive ? 'var(--bg-secondary)' : 'transparent',
                  color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                  border: isActive ? '1px solid var(--border-color)' : '1px solid transparent',
                  whiteSpace: 'nowrap',
                }}
              >
                <Icon size={17} />
                <span>{item.label}</span>
              </button>
            )
          })}
        </div>

        {/* Dynamic Content Views */}
        <section style={{ flex: 1 }}>
          {activeTab === 'tasks' && (
            <TaskTracker tasks={tasks} setTasks={setTasks} />
          )}

          {activeTab === 'focus' && (
            <FocusTimer onSessionComplete={(mins) => {
              // Add a note automatically when a focus session ends
              const newNote = {
                id: Date.now(),
                text: `🎯 Completed a ${mins}-minute focused work block! Keep the momentum.`,
                date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
                color: '#dcfce7'
              }
              setNotes(prev => [newNote, ...prev])
            }} />
          )}

          {activeTab === 'notes' && (
            <QuickNotes notes={notes} setNotes={setNotes} />
          )}

          {activeTab === 'stack' && (
            <TechStackInspector />
          )}
        </section>
      </main>

      {/* Footer */}
      <footer style={{
        backgroundColor: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-color)',
        padding: '1.25rem 1.5rem',
        textAlign: 'center',
        fontSize: '0.8125rem',
        color: 'var(--text-muted)',
      }}>
        <span>Built with React + Vite • Workspace running live on Debian aarch64</span>
      </footer>
    </div>
  )
}
