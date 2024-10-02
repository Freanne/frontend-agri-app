import React, { useState, useEffect } from "react"

const useScrollStart = () => {
  const [isVisible, setIsVisible] = useState(false)

  const handleScroll: EventListener = () => {
    if (globalThis && globalThis.window.scrollY > 100) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return { isVisible }
}

export default useScrollStart
