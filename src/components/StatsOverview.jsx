import React from 'react'
import { CheckCircle2, Clock, AlertCircle, Flame, TrendingUp } from 'lucide-react'

export default function StatsOverview({ tasks, focusMinutes }) {
  const total = tasks.length
  const completed = tasks.filter((t) => t.completed).length
  const inProgress = tasks.filter((t) => !t.completed).length
  const highPriority = tasks.filter((t) => !t.completed && t.priority === 'High').length
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0

  const stats = [
    {
      title: 'Total Tasks',
      value: total,
      sub: `${completed} completed`,
      icon: CheckCircle2,
      color: '#6366f1',
      bg: 'rgba(99, 102, 241, 0.1)',
    },
    {
      title: 'In Progress',
      value: inProgress,
      sub: 'Active milestones',
      icon: Clock,
      color: '#0284c7',
      bg: 'rgba(2, 132, 199, 0.1)',
    },
    {
      title: 'High Priority',
      value: highPriority,
      sub: 'Needs attention',
      icon: AlertCircle,
      color: '#f59e0b',
      bg: 'rgba(245, 158, 11, 0.1)',
    },
    {
      title: 'Focus Time',
      value: `${focusMinutes}m`,
      sub: 'Pomodoro deep work',
      icon: Flame,
      color: '#10b981',
      bg: 'rgba(16, 185, 129, 0.1)',
    },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1rem',
      }}>
        {stats.map((stat, idx) => {
          const Icon = stat.icon
          return (
            <div
              key={idx}
              style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: '16px',
                padding: '1.25rem',
                boxShadow: 'var(--card-shadow)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                  {stat.title}
                </p>
                <h3 style={{ fontSize: '1.75rem', fontWeight: 700, margin: '0.25rem 0' }}>
                  {stat.value}
                </h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  {stat.sub}
                </p>
              </div>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                backgroundColor: stat.bg,
                color: stat.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Icon size={22} />
              </div>
            </div>
          )
        })}
      </div>

      <div style={{
        backgroundColor: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)',
        borderRadius: '16px',
        padding: '1.25rem',
        boxShadow: 'var(--card-shadow)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <TrendingUp size={18} color="var(--accent)" />
            <span style={{ fontWeight: 600, fontSize: '0.9375rem' }}>Weekly Progress Goal</span>
          </div>
          <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--accent)' }}>
            {completionRate}% Completed
          </span>
        </div>
        <div style={{
          width: '100%',
          height: '10px',
          backgroundColor: 'var(--bg-tertiary)',
          borderRadius: '9999px',
          overflow: 'hidden',
        }}>
          <div style={{
            width: `${completionRate}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #6366f1, #10b981)',
            borderRadius: '9999px',
            transition: 'width 0.4s ease',
          }} />
        </div>
      </div>
    </div>
  )
}
