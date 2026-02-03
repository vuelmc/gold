import { useTheme } from '../contexts/ThemeContext'

function LogoIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <defs>
        <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--accent-from)" />
          <stop offset="100%" stopColor="var(--accent-to)" />
        </linearGradient>
      </defs>
      <path
        d="M18 4L30 20H6L18 4ZM18 32L6 16H30L18 32Z"
        fill="url(#logoGrad)"
        stroke="url(#logoGrad)"
        strokeWidth="1"
      />
    </svg>
  )
}

export function Header({
  onManagePositions,
  onRefresh,
  refreshCount,
  loading,
}: {
  onManagePositions?: () => void
  onRefresh?: () => void
  refreshCount?: number
  loading?: boolean
}) {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="dashboard-header">
      <div className="header-left">
        <div className="logo-wrap">
          <LogoIcon />
        </div>
        <div className="header-titles">
          <h1 className="header-title">资产指挥舱</h1>
          <p className="header-subtitle">实时基金估值监控系统</p>
        </div>
      </div>
      <div className="header-actions">
        <button
          type="button"
          className="theme-toggle"
          onClick={toggleTheme}
          title={theme === 'dark' ? '切换到浅色' : '切换到深色'}
          aria-label="切换主题"
        >
          {theme === 'dark' ? (
            <span className="icon">☀️</span>
          ) : (
            <span className="icon">🌙</span>
          )}
        </button>
        <button type="button" className="btn btn-secondary" onClick={onManagePositions}>
          <span className="btn-icon">⚙</span>
          管理持仓
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onRefresh}
          disabled={loading}
          aria-busy={loading}
        >
          <span className="btn-icon">{loading ? '⋯' : '↻'}</span>
          刷新{refreshCount != null ? ` (${refreshCount})` : ''}
        </button>
      </div>
    </header>
  )
}
