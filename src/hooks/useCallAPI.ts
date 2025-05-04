'use client';
import useSWR from 'swr';
const fetcher = (url: string) => fetch(url).then(res => res.json())
export function useCallAPI(url: string | null) {
    const response = useSWR(url, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    });
    return response
}