import { useState, useCallback } from 'react'
import { FormData } from '@/lib/types'

const INITIAL_FORM_STATE: FormData = {
  name: "",
  email: "",
  phone: "",
  message: ""
}

export function useModalState() {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_STATE)

  const updateFormData = useCallback((field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }, [])

  const resetForm = useCallback(() => {
    setFormData(INITIAL_FORM_STATE)
  }, [])

  return {
    formData,
    updateFormData,
    resetForm
  }
} 