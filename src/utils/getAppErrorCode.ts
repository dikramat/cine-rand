import { APP_ERROR_CODES } from '../constants/tmdb'
import type { AppErrorCode } from '../types/appError'

export function getAppErrorCode(error: unknown): AppErrorCode {
  const codes = Object.values(APP_ERROR_CODES)
  if (error instanceof Error) {
    const matchingCode = codes.find((code) => code === error.message)
    if (matchingCode) return matchingCode
  }
  return APP_ERROR_CODES.requestFailed
}
