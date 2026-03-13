export type UserRole = 'user' | 'admin'

export type ISODateString = string & { readonly __brand: 'ISODateString' }

export interface PaginatedResponse<T> {
    items: T[]
    total: number
    page: number
    page_size: number
    total_pages: number
}

export interface PaginationParams {
    page?: number
    page_size?: number
    sort_by?: string
    sort_order?: 'asc' | 'desc'
}
