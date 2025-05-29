'use server'

import { Client } from '@notionhq/client'
import { FormData } from '@/lib/types'

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
})

interface NotionResponse {
  success: boolean
  data?: any
  error?: string
}

export async function saveToNotion(data: FormData): Promise<NotionResponse> {
  if (!process.env.NOTION_API_KEY || !process.env.NOTION_DATABASE_ID) {
    return {
      success: false,
      error: '환경 변수가 설정되지 않았습니다.'
    }
  }

  try {
    const response = await notion.pages.create({
      parent: {
        database_id: process.env.NOTION_DATABASE_ID,
      },
      properties: {
        이름: {
          title: [
            {
              text: {
                content: data.name,
              },
            },
          ],
        },
        이메일: {
          email: data.email,
        },
        전화번호: {
          phone_number: data.phone,
        },
        상담내용: {
          rich_text: [
            {
              text: {
                content: data.message,
              },
            },
          ],
        },
      },
    })

    return { 
      success: true, 
      data: response 
    }
  } catch (error) {
    console.error('노션 API 에러:', error)
    const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.'
    return { 
      success: false, 
      error: `데이터 저장 중 오류가 발생했습니다: ${errorMessage}` 
    }
  }
} 