import type { APP_ERROR_CODES } from '../constants/tmdb'

export type AppErrorCode = (typeof APP_ERROR_CODES)[keyof typeof APP_ERROR_CODES]
