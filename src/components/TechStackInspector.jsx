import React, { useState, useEffect } from 'react'
import { Server, Cpu, HardDrive, ShieldCheck, Activity, Terminal } from 'lucide-react'

export default function TechStackInspector() {
  const [storageUsed, setStorageUsed] = useState('0 KB')
  const [uptime, setUptime] = useState(0)

  useEffect(() => {
    // Calculate rough localStorage size
    let total = 0
    for (let x in localStorage) {
      if (localStorage.hasOwnProperty(x)) {
        total += (localStorage[x].length * 2)
      }
    }
    setStorageUsed((total / 1024).toFixed(2) + ' KB')

    const interval = setInterval(() => {
      setUptime((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const stackItems = [
    { title: 'Frontend Core', value: 'React 18.2 + Modern Hooks', tag: 'UI Library', color: '#61dafb' },
    { title: 'Bundler & Dev Server', value: 'Vite 5 (Lightning Fast ESM)', tag: 'Build Tool', color: '#a855f7' },
    { title: 'Design System', value: 'CSS Tokens & Dynamic Themes', tag: 'Styling', color: '#ec4899' },
    { title: 'Icon Suite', value: 'Lucide React (Vector Icons)', tag: 'Assets', color: '#3b82f6' },
    { title: 'State & Persistence', value: 'Reactive LocalStorage Hook', tag: 'Data Flow', color: '#10b981' },
    { title: 'Host Architecture', value: 'Debian Linux on aarch64', tag: 'Platform', color: '#f59e0b' },
  ]

  const formatUptime = (secs) => {
    const m = Math.floor(secs / 60)
    const s = secs % 60
    return `${m}m ${s}s`
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Top Telemetry Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem'
      }}>
        <div style={{
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: '16px',
          padding: '1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          boxShadow: 'var(--card-shadow)'
        }}>
          <div style={{
            backgroundColor: 'rgba(99, 102, 241, 0.12)',
            color: 'var(--accent)',
            padding: '0.75rem',
            borderRadius: '12px'
          }}>
            <Activity size={24} />
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Session Duration</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
              {formatUptime(uptime)}
            </div>
          </div>
        </div>

        <div style={{
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: '16px',
          padding: '1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          boxShadow: 'var(--card-shadow)'
        }}>
          <div style={{
            backgroundColor: 'rgba(16, 185, 129, 0.12)',
            color: 'var(--success)',
            padding: '0.75rem',
            borderRadius: '12px'
          }}>
            <HardDrive size={24} />
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Storage Consumed</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
              {storageUsed}
            </div>
          </div>
        </div>

        <div style={{
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: '16px',
          padding: '1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          boxShadow: 'var(--card-shadow)'
        }}>
          <div style={{
            backgroundColor: 'rgba(234, 179, 8, 0.12)',
            color: '#ca8a04',
            padding: '0.75rem',
            borderRadius: '12px'
          }}>
            <ShieldCheck size={24} />
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Security Mode</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>Client Sandboxed</div>
          </div>
        </div>
      </div>

      {/* Tech Specifications Grid */}
      <div style={{
        backgroundColor: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)',
        borderRadius: '16px',
        padding: '1.5rem',
        boxShadow: 'var(--card-shadow)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          marginBottom: '1.25rem',
          borderBottom: '1px solid var(--border-color)',
          paddingBottom: '0.75rem'
        }}>
          <Server size={20} color="var(--accent)" />
          <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Underlying Technologies & Stack Specs</h3>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1rem'
        }}>
          {stackItems.map((item, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'var(--bg-tertiary)',
                borderRadius: '12px',
                padding: '1rem 1.25rem',
                border: '1px solid var(--border-color)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.35rem'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                  {item.title}
                </span>
                <span style={{
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                  padding: '0.15rem 0.45rem',
                  borderRadius: '6px',
                  backgroundColor: 'var(--bg-secondary)',
                  color: item.color
                }}>
                  {item.tag}
                </span>
              </div>
              <span style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
