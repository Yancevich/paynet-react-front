import { useEffect, useRef, useState } from 'react'
import { useAtom } from 'jotai'
import { useMantineColorScheme } from '@mantine/core'
import { localeAtom, themeAtom, type LocaleCode } from '@/shared/state/uiAtoms'
import './DevPanel.css'

const DEV_ONLY =
  import.meta.env.DEV || import.meta.env.VITE_DEV_PANEL === 'true'

const DevPanel = () => {
  const { colorScheme, setColorScheme } = useMantineColorScheme()
  const [, setThemeAtom] = useAtom(themeAtom)
  const [locale, setLocale] = useAtom(localeAtom)
  const [open, setOpen] = useState(false)
  const [position, setPosition] = useState({ x: 12, y: 12 })
  const [isDragging, setIsDragging] = useState(false)
  const panelRef = useRef<HTMLDivElement | null>(null)
  const dragRef = useRef({
    startX: 0,
    startY: 0,
    originX: 0,
    originY: 0,
  })
  const draggedRef = useRef(false)

  useEffect(() => {
    const storedLocale = localStorage.getItem('locale') as LocaleCode | null
    if (
      storedLocale === 'ru' ||
      storedLocale === 'uz' ||
      storedLocale === 'en'
    ) {
      setLocale(storedLocale)
    }
  }, [setLocale])

  useEffect(() => {
    const nextScheme = colorScheme === 'auto' ? 'dark' : colorScheme
    setThemeAtom(nextScheme)
    document.documentElement.dataset.theme = nextScheme
  }, [colorScheme, setThemeAtom])

  useEffect(() => {
    localStorage.setItem('locale', locale)
  }, [locale])

  useEffect(() => {
    const clampPosition = (pos: { x: number; y: number }) => {
      const safeMargin = 12
      const rect = panelRef.current?.getBoundingClientRect()
      const width = rect?.width ?? 120
      const height = rect?.height ?? 120
      const maxX = Math.max(safeMargin, window.innerWidth - width - safeMargin)
      const maxY = Math.max(safeMargin, window.innerHeight - height - safeMargin)
      return {
        x: Math.min(Math.max(pos.x, safeMargin), maxX),
        y: Math.min(Math.max(pos.y, safeMargin), maxY),
      }
    }

    const handleResize = () => {
      setPosition((prev) => clampPosition(prev))
    }

    setPosition((prev) => clampPosition(prev))
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  if (!DEV_ONLY) return null

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return
    const target = e.target as HTMLElement
    const isToggle = Boolean(target.closest('.dev-panel__toggle'))
    const isInteractive = Boolean(target.closest('button, select, option'))
    if (isInteractive && !isToggle) return

    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      originX: position.x,
      originY: position.y,
    }
    draggedRef.current = false
    setIsDragging(true)

    const handleMove = (event: PointerEvent) => {
      const deltaX = event.clientX - dragRef.current.startX
      const deltaY = event.clientY - dragRef.current.startY
      if (Math.abs(deltaX) > 2 || Math.abs(deltaY) > 2) {
        draggedRef.current = true
      }
      setPosition(() => {
        const safeMargin = 12
        const rect = panelRef.current?.getBoundingClientRect()
        const width = rect?.width ?? 120
        const height = rect?.height ?? 120
        const nextX = dragRef.current.originX + deltaX
        const nextY = dragRef.current.originY + deltaY
        const maxX = Math.max(
          safeMargin,
          window.innerWidth - width - safeMargin
        )
        const maxY = Math.max(
          safeMargin,
          window.innerHeight - height - safeMargin
        )
        return {
          x: Math.min(Math.max(nextX, safeMargin), maxX),
          y: Math.min(Math.max(nextY, safeMargin), maxY),
        }
      })
    }

    const handleUp = () => {
      setIsDragging(false)
      window.removeEventListener('pointermove', handleMove)
      window.removeEventListener('pointerup', handleUp)
    }

    window.addEventListener('pointermove', handleMove)
    window.addEventListener('pointerup', handleUp)
  }

  return (
    <div
      className={`dev-panel ${open ? 'dev-panel--open' : 'dev-panel--closed'} ${
        isDragging ? 'dev-panel--dragging' : ''
      }`}
      style={{ left: position.x, top: position.y }}
      ref={panelRef}
      onPointerDown={handlePointerDown}
    >
      <button
        type="button"
        className="dev-panel__toggle"
        onClick={() => {
          if (draggedRef.current) {
            draggedRef.current = false
            return
          }
          setOpen((prev) => !prev)
        }}
        aria-label={open ? 'Hide dev panel' : 'Show dev panel'}
      >
        {open ? 'X' : 'DEV'}
      </button>
      {open && (
        <div className="dev-panel__content">
          <button
            type="button"
            className="dev-panel__close"
            onClick={() => setOpen(false)}
            aria-label="Close dev panel"
          >
            ×
          </button>
          <div className="dev-panel__row">
            <span className="dev-panel__label">Theme</span>
            <div className="dev-panel__controls">
              <button
                type="button"
                className={`dev-panel__btn ${
                  colorScheme === 'dark' ? 'dev-panel__btn--active' : ''
                }`}
                onClick={() => setColorScheme('dark')}
              >
                Dark
              </button>
              <button
                type="button"
                className={`dev-panel__btn ${
                  colorScheme === 'light' ? 'dev-panel__btn--active' : ''
                }`}
                onClick={() => setColorScheme('light')}
              >
                Light
              </button>
            </div>
          </div>
          <div className="dev-panel__row">
            <span className="dev-panel__label">Language</span>
            <select
              className="dev-panel__select"
              value={locale}
              onChange={(e) => setLocale(e.target.value as LocaleCode)}
            >
              <option value="ru">RU</option>
              <option value="uz">UZ</option>
              <option value="en">EN</option>
            </select>
          </div>
        </div>
      )}
    </div>
  )
}

export default DevPanel
