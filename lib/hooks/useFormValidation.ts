import { useState, useCallback } from 'react'
import { FormData } from '@/lib/types'

interface ValidationRules {
  name: {
    required: boolean
    minLength?: number
  }
  email: {
    required: boolean
    pattern?: RegExp
  }
}

interface ValidationErrors {
  name?: string
  email?: string
}

const defaultRules: ValidationRules = {
  name: {
    required: true,
    minLength: 2
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  }
}

export function useFormValidation(rules: ValidationRules = defaultRules) {
  const [errors, setErrors] = useState<ValidationErrors>({})

  const validateField = useCallback((field: keyof FormData, value: string): string | undefined => {
    const rule = rules[field]
    
    if (rule.required && !value.trim()) {
      return `${field === 'name' ? '이름' : '이메일'}을 입력해주세요`
    }

    if (field === 'name' && rule.minLength && value.length < rule.minLength) {
      return `이름은 최소 ${rule.minLength}자 이상이어야 합니다`
    }

    if (field === 'email' && rule.pattern && !rule.pattern.test(value)) {
      return '올바른 이메일 형식을 입력해주세요'
    }

    return undefined
  }, [rules])

  const validateForm = useCallback((formData: FormData): boolean => {
    const newErrors: ValidationErrors = {}
    let isValid = true

    Object.keys(formData).forEach(key => {
      const fieldKey = key as keyof FormData
      const error = validateField(fieldKey, formData[fieldKey])
      if (error) {
        newErrors[fieldKey] = error
        isValid = false
      }
    })

    setErrors(newErrors)
    return isValid
  }, [validateField])

  const clearErrors = useCallback(() => {
    setErrors({})
  }, [])

  const clearFieldError = useCallback((field: keyof FormData) => {
    setErrors(prev => ({
      ...prev,
      [field]: undefined
    }))
  }, [])

  return {
    errors,
    validateForm,
    validateField,
    clearErrors,
    clearFieldError
  }
} 