"use client"

import { motion } from "framer-motion"
import { MaterialIcon } from "@/components/ui/material-icon"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <motion.div
        className="container mx-auto px-4 max-w-5xl"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="grid md:grid-cols-4 gap-6">
          <div>
            <motion.h3 className="text-xl font-bold mb-4" whileHover={{ scale: 1.05 }}>
              WebCrew
            </motion.h3>
            <p className="text-gray-400">비전문가도 이해할 수 있는 웹 제작 서비스</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">서비스</h4>
            <ul className="space-y-2 text-gray-400">
              {["웹사이트 제작", "유지보수", "컨설팅"].map((item, index) => (
                <motion.li key={index} whileHover={{ x: 5 }}>
                  <a href="#" className="hover:text-primary transition-colors text-sm">
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">지원</h4>
            <ul className="space-y-2 text-gray-400">
              {["FAQ", "개인정보처리방침", "이용약관"].map((item, index) => (
                <motion.li key={index} whileHover={{ x: 5 }}>
                  <a href="#" className="hover:text-primary transition-colors text-sm">
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">연락처</h4>
            <div className="space-y-2 text-gray-400">
              <motion.div className="flex items-center text-sm" whileHover={{ x: 5 }}>
                <MaterialIcon name="email" size="sm" className="mr-2" />
                <span>contact@webcrew.co.kr</span>
              </motion.div>
              <motion.div className="flex items-center text-sm" whileHover={{ x: 5 }}>
                <MaterialIcon name="chat" size="sm" className="mr-2" />
                <span>카카오톡 문의</span>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400">
          <p className="text-sm">&copy; 2024 WebCrew. All rights reserved.</p>
        </div>
      </motion.div>
    </footer>
  )
} 