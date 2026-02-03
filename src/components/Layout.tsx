import { NavLink, Outlet } from 'react-router-dom'

const navItems = [
  { path: '/', label: '我的' },
  { path: '/gold', label: '黄金走势' },
]

export function Layout() {
  return (
    <div className="app-layout">
      <aside className="sidebar">
        <nav className="sidebar-nav" aria-label="主导航">
          {navItems.map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
              end={path === '/'}
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <div className="layout-main">
        <Outlet />
      </div>
    </div>
  )
}
