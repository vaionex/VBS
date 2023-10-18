import { useState, useEffect, useRef } from 'react'
import { motion, animate } from 'framer-motion'

function NumberCount({ targetNumber }) {
  const [val] = useState(targetNumber)
  const scope = useRef()

  useEffect(() => {
    if (scope.current.textContent != targetNumber) {
      animate(Number(scope.current.textContent), targetNumber, {
        duration: 0.3,
        onUpdate: (value) => {
          scope.current.textContent = value.toFixed(0)
        },
      })
    }
  }, [targetNumber])

  return <motion.span ref={scope}>{val}</motion.span>
}

export default NumberCount
