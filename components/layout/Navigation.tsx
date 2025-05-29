import React, { memo, useState } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import { MaterialIcon } from "@/components/ui/material-icon"

interface NavigationItem {
  label: string
  id: string
}

interface NavigationProps {
  items: NavigationItem[]
  onItemClick: (sectionId: string) => void
}

const Navigation = memo(({ items, onItemClick }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleItemClick = (id: string) => {
    onItemClick(id)
    setIsMenuOpen(false)
  }

  return (
    <>
      {/* 데스크톱 네비게이션 */}
      <nav className="hidden lg:flex items-center space-x-8">
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

      {/* 모바일 햄버거 버튼 */}
      <button
        className="lg:hidden p-2 focus:outline-none"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <MaterialIcon 
          name={isMenuOpen ? "close" : "menu"} 
          size="lg"
          className="text-gray-600"
        />
      </button>

      {/* 모바일 메뉴 */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed top-[72px] left-0 right-0 bg-white shadow-lg border-t border-gray-100"
          >
            <nav className="container mx-auto py-4 px-4">
              <div className="flex flex-col space-y-4">
                {items.map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => handleItemClick(item.id)}
                    className="text-gray-600 hover:text-gray-900 transition-colors text-base font-medium text-left py-2 border-none bg-transparent focus:outline-none"
                    whileHover={{ x: 10 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
})

Navigation.displayName = 'Navigation'

export default Navigation 