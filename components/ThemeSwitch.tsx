'use client'
import { Fragment, useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

export default function ThemeSwitch() {
  const preThemes = ['light', 'dark', 'system']
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), [])
  return (
    <div className="dropdown dropdown-hover">
      <div className="btn m-1">{resolvedTheme === 'dark' ? 'Dark' : 'Light'}</div>
      <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
        {preThemes.map((t) => (
          <li key={t}>
            <button
              onClick={() => setTheme(t)}
              onKeyDown={(e) => e.key === 'Enter' && setTheme(t)}
              className={theme === t ? 'font-bold' : ''}
            >
              {t.substring(0, 1).toUpperCase() + t.substring(1)}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
