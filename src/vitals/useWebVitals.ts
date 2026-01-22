import { onFCP, onTTFB } from 'web-vitals'
import { useEffect, useState } from 'react'

export function useWebVitals(cls?: number, inp?: number, lcp?: number, tbt?: number) {
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

    useEffect(() => {
        if (cls !== undefined) {
            setMetrics(prev => ({
                ...prev,
                CLS: parseFloat(cls.toFixed(3)), // CLS — float, не ms
            }))
        }
    }, [cls])

    useEffect(() => {
        if (inp !== undefined && inp > 0) {
            setMetrics(prev => ({
                ...prev,
                INP: Math.round(inp),
            }))
        }
    }, [inp])

    useEffect(() => {
        if (lcp !== undefined && lcp > 0) {
            setMetrics(prev => ({
                ...prev,
                LCP: Math.round(lcp),
            }))
        }
    }, [lcp])

    useEffect(() => {
        if (tbt !== undefined) {
            setMetrics(prev => ({
                ...prev,
                TBT: Math.round(tbt),
            }))
        }
    }, [tbt])

    return metrics
}

export function useCls() {
    const [cls, setCls] = useState(0)

    useEffect(() => {
        let cumulativeCLS = 0

        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries() as PerformanceEntry[]) {
                const shift = entry as LayoutShift
                if (!shift.hadRecentInput) {
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
                const lcpTime = lastEntry.renderTime || lastEntry.loadTime
                setLcp(lcpTime)
            }
        })

        observer.observe({ type: 'largest-contentful-paint', buffered: true })

        return () => observer.disconnect()
    }, [])

    return lcp
}

export function useTbt() {
    const [tbt, setTbt] = useState(0)

    useEffect(() => {
        let totalBlockingTime = 0

        // Устанавливаем начальное значение через небольшую задержку
        const initTimer = setTimeout(() => {
            setTbt(0)
        }, 100)

        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                const longTask = entry as PerformanceEntry
                const duration = longTask.duration

                if (duration > 50) {
                    totalBlockingTime += duration - 50
                    setTbt(totalBlockingTime)
                }
            }
        })

        observer.observe({ type: 'longtask', buffered: true })

        return () => {
            clearTimeout(initTimer)
            observer.disconnect()
        }
    }, [])

    return tbt
}