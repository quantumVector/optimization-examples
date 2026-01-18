import { onFCP, onINP, onLCP, onTTFB } from 'web-vitals'
import { useEffect, useState } from 'react'

export function useWebVitals(cls?: number) {
    const [metrics, setMetrics] = useState<Record<string, number>>({})

    useEffect(() => {
        const update = (metric: any) => {
            setMetrics(prev => ({
                ...prev,
                [metric.name]: Math.round(metric.value),
            }))
        }

        onFCP(update)
        onLCP(update)
        onINP(update)
        onTTFB(update)
    }, [])

    // Добавляем CLS, если передан
    useEffect(() => {
        if (cls !== undefined) {
            setMetrics(prev => ({
                ...prev,
                CLS: parseFloat(cls.toFixed(3)), // CLS — float, не ms
            }))
        }
    }, [cls])

    return metrics
}

export function useCls() {
    const [cls, setCls] = useState(0)

    useEffect(() => {
        let cumulativeCLS = 0

        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries() as PerformanceEntry[]) {
                // @ts-ignore
                const shift = entry as LayoutShift
                if (!shift.hadRecentInput) {
                    // @ts-ignore
                    cumulativeCLS += shift.value
                }
            }
            setCls(cumulativeCLS)
        })

        observer.observe({ type: 'layout-shift', buffered: true })

        return () => observer.disconnect()
    }, [])

    return cls
}