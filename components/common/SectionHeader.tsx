import { motion } from "framer-motion"
import { MaterialIcon } from "@/components/ui/material-icon"
import { animations } from "@/lib/animations"

interface SectionHeaderProps {
  badge?: {
    icon: string
    text: string
  }
  title: string | React.ReactNode
  subtitle: string
  className?: string
}

export default function SectionHeader({ badge, title, subtitle, className = "" }: SectionHeaderProps) {
  return (
    <motion.div
      className={`text-center mb-12 ${className}`}
      variants={animations.sectionTitle}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
    >
      {badge && (
        <motion.div 
          className="inline-flex items-center bg-primary/10 px-3 py-1 rounded-full mb-4"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <MaterialIcon name={badge.icon} size="sm" className="text-primary mr-2" />
          <span className="text-primary font-medium text-sm">{badge.text}</span>
        </motion.div>
      )}
      
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        {title}
      </h2>
      
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        {subtitle}
      </p>
    </motion.div>
  )
} 