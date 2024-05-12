export type ApiResponse<T> = {
    data: T[];
    success: boolean;
    message: string;
}

export type LoadState = 'loading' | 'loaded' | 'error' | 'idle';

