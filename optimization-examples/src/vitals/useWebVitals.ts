import { onFCP, onTTFB } from 'web-vitals'
import { useEffect, useState } from 'react'

export function useWebVitals(cls?: number, inp?: number, lcp?: number) {
    const [metrics, setMetrics] = useState<Record<string, number>>({})

    useEffect(() => {
        const update = (metric: any) => {
            setMetrics(prev => ({
                ...prev,
                [metric.name]: Math.round(metric.value),
            }))
        }

        onFCP(update)
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

    // Добавляем INP, если передан
    useEffect(() => {
        if (inp !== undefined && inp > 0) {
            setMetrics(prev => ({
                ...prev,
                INP: Math.round(inp),
            }))
        }
    }, [inp])

    // Добавляем LCP, если передан
    useEffect(() => {
        if (lcp !== undefined && lcp > 0) {
            setMetrics(prev => ({
                ...prev,
                LCP: Math.round(lcp),
            }))
        }
    }, [lcp])

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

export function useInp() {
    const [inp, setInp] = useState(0)

    useEffect(() => {
        let maxInp = 0

        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                // @ts-ignore
                const eventEntry = entry as PerformanceEventTiming
                const duration = eventEntry.duration

                if (duration > maxInp) {
                    maxInp = duration
                    setInp(duration)
                }
            }
        })

        observer.observe({ type: 'event', buffered: true, durationThreshold: 0 })

        return () => observer.disconnect()
    }, [])

    return inp
}

export function useLcp() {
    const [lcp, setLcp] = useState(0)

    useEffect(() => {
        const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries()
            const lastEntry = entries[entries.length - 1] as any

            if (lastEntry) {
                // renderTime если доступен, иначе loadTime
                const lcpTime = lastEntry.renderTime || lastEntry.loadTime
                setLcp(lcpTime)
            }
        })

        observer.observe({ type: 'largest-contentful-paint', buffered: true })

        return () => observer.disconnect()
    }, [])

    return lcp
}