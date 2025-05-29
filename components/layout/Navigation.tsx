import React, { memo } from 'react'
import { motion } from "framer-motion"

interface NavigationItem {
  label: string
  id: string
}

interface NavigationProps {
  items: NavigationItem[]
  onItemClick: (sectionId: string) => void
}

const Navigation = memo(({ items, onItemClick }: NavigationProps) => {
  return (
    <nav className="hidden md:flex items-center space-x-8">
      {items.map((item) => (
        <motion.button
          key={item.id}
          onClick={() => onItemClick(item.id)}
          className="text-gray-600 hover:text-gray-900 transition-colors text-base font-medium cursor-pointer border-none bg-transparent focus:outline-none"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, duration: 0.3 }}
        >
          {item.label}
        </motion.button>
      ))}
    </nav>
  )
})

Navigation.displayName = 'Navigation'

export default Navigation 