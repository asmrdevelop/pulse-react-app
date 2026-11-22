import React, { useState, useEffect } from 'react'
import { Play, Pause, RotateCcw, Coffee, Zap, Award } from 'lucide-react'

export default function FocusTimer({ onSessionComplete }) {
  const [mode, setMode] = useState('focus') // 'focus' | 'short' | 'long'
  const [timeLeft, setTimeLeft] = useState(25 * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [completedSessions, setCompletedSessions] = useState(0)

  const modes = {
    focus: { label: 'Deep Focus', duration: 25 * 60, icon: Zap, color: '#6366f1' },
    short: { label: 'Short Break', duration: 5 * 60, icon: Coffee, color: '#10b981' },
    long: { label: 'Long Break', duration: 15 * 60, icon: Coffee, color: '#0284c7' },
  }

  useEffect(() => {
    let timer = null
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false)
      if (mode === 'focus') {
        setCompletedSessions((prev) => prev + 1)
        if (onSessionComplete) onSessionComplete(25)
      }
    }
    return () => clearInterval(timer)
  }, [isRunning, timeLeft, mode, onSessionComplete])

  const switchMode = (newMode) => {
    setMode(newMode)
    setTimeLeft(modes[newMode].duration)
    setIsRunning(false)
  }

  const resetTimer = () => {
    setIsRunning(false)
    setTimeLeft(modes[mode].duration)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const totalDuration = modes[mode].duration
  const progressPercent = ((totalDuration - timeLeft) / totalDuration) * 100

  return (
    <div style={{
      maxWidth: '480px',
      margin: '0 auto',
      backgroundColor: 'var(--bg-secondary)',
      border: '1px solid var(--border-color)',
      borderRadius: '24px',
      padding: '2rem',
      boxShadow: 'var(--card-shadow)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1.5rem',
      textAlign: 'center',
    }}>
      {/* Mode Switcher */}
      <div style={{
        display: 'flex',
        gap: '0.4rem',
        backgroundColor: 'var(--bg-tertiary)',
        padding: '0.35rem',
        borderRadius: '12px',
      }}>
        {Object.keys(modes).map((key) => {
          const m = modes[key]
          const isCurrent = mode === key
          return (
            <button
              key={key}
              onClick={() => switchMode(key)}
              style={{
                padding: '0.45rem 0.9rem',
                borderRadius: '8px',
                fontSize: '0.8125rem',
                fontWeight: isCurrent ? 600 : 500,
                backgroundColor: isCurrent ? 'var(--bg-secondary)' : 'transparent',
                color: isCurrent ? m.color : 'var(--text-secondary)',
                boxShadow: isCurrent ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
              }}
            >
              {m.label}
            </button>
          )
        })}
      </div>

      {/* Timer Circle View */}
      <div style={{
        position: 'relative',
        width: '220px',
        height: '220px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `conic-gradient(${modes[mode].color} ${progressPercent}%, var(--bg-tertiary) ${progressPercent}%)`,
        padding: '12px',
      }}>
        <div style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          backgroundColor: 'var(--bg-secondary)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.25rem',
        }}>
          <span style={{
            fontSize: '3rem',
            fontWeight: 800,
            fontFamily: 'var(--font-mono)',
            letterSpacing: '-0.05em',
          }}>
            {formatTime(timeLeft)}
          </span>
          <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', fontWeight: 500 }}>
            {isRunning ? 'Session active' : 'Paused'}
          </span>
        </div>
      </div>

      {/* Control Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button
          onClick={() => setIsRunning(!isRunning)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1.75rem',
            borderRadius: '12px',
            backgroundColor: modes[mode].color,
            color: '#ffffff',
            fontWeight: 700,
            fontSize: '1rem',
            boxShadow: `0 4px 14px ${modes[mode].color}40`,
          }}
        >
          {isRunning ? <Pause size={20} /> : <Play size={20} />}
          <span>{isRunning ? 'Pause' : 'Start Focus'}</span>
        </button>

        <button
          onClick={resetTimer}
          aria-label="Reset timer"
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            border: '1px solid var(--border-color)',
            backgroundColor: 'var(--bg-tertiary)',
            color: 'var(--text-secondary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <RotateCcw size={18} />
        </button>
      </div>

      {/* Session Progress Badges */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontSize: '0.8125rem',
        color: 'var(--text-muted)',
      }}>
        <Award size={16} color="#eab308" />
        <span>Completed today: <strong style={{ color: 'var(--text-primary)' }}>{completedSessions}</strong> intervals</span>
      </div>
    </div>
  )
}
