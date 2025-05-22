"use client"

import { useEffect } from "react"

export function ZoomPrevention() {
  useEffect(() => {
    // Function to prevent zoom
    const preventZoom = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault()
      }
    }

    // Function to prevent double-tap zoom
    const preventDoubleTapZoom = (() => {
      let lastTouchEnd = 0
      return (e: TouchEvent) => {
        const now = Date.now()
        if (now - lastTouchEnd < 300) {
          e.preventDefault()
        }
        lastTouchEnd = now
      }
    })()

    // Add event listeners
    document.addEventListener("touchmove", preventZoom, { passive: false })
    document.addEventListener("touchend", preventDoubleTapZoom, { passive: false })

    // Clean up event listeners
    return () => {
      document.removeEventListener("touchmove", preventZoom)
      document.removeEventListener("touchend", preventDoubleTapZoom)
    }
  }, [])

  return null
}
