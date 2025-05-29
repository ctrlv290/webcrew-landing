import { motion } from "framer-motion"
import { MaterialIcon } from "@/components/ui/material-icon"
import { animations, transitions } from "@/lib/animations"
import { FeatureCard as FeatureCardType } from "@/lib/types"

interface FeatureCardProps extends FeatureCardType {
  index?: number
}

export default function FeatureCard({ 
  icon, 
  title, 
  description, 
  features,
  index = 0 
}: FeatureCardProps) {
  return (
    <motion.div
      className="custom-card group"
      variants={animations.staggerItem}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 200, damping: 15, duration: 0.4 }}
    >
      <motion.div
        className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4 shadow-md group-hover:shadow-lg transition-shadow"
      >
        <MaterialIcon name={icon} size="lg" className="text-black" />
      </motion.div>
      
      <h3 className="text-base font-bold text-gray-900 mb-2 text-center">{title}</h3>
      <p className="text-gray-600 text-center leading-relaxed text-sm mb-4">{description}</p>
      
      {features && (
        <ul className="space-y-1">
          {features.map((feature, featureIndex) => (
            <motion.li
              key={featureIndex}
              className="flex items-center text-gray-700 text-xs"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * featureIndex }}
            >
              <span className="material-icons text-primary mr-1 flex-shrink-0" style={{ fontSize: '12px', lineHeight: '12px' }}>
                download_done
              </span>
              {feature}
            </motion.li>
          ))}
        </ul>
      )}
    </motion.div>
  )
} 