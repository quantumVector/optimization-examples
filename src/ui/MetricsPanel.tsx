type MetricName = 'FCP' | 'LCP' | 'CLS' | 'INP' | 'TTFB' | 'TBT'

const thresholds: Record<MetricName, { good: number; warn: number }> = {
    FCP: { good: 1800, warn: 3000 },
    LCP: { good: 2500, warn: 4000 },
    INP: { good: 200, warn: 500 },
    TTFB: { good: 800, warn: 1800 },
    CLS: { good: 0.1, warn: 0.25 },
    TBT: { good: 200, warn: 600 },
}

function getColor(name: MetricName, value: number) {
    const { good, warn } = thresholds[name]

    if (value <= good) return 'lime'
    if (value <= warn) return 'yellow'
    return 'red'
}

export function MetricsPanel({ metrics }: {
    metrics: Partial<Record<MetricName, number>>
}) {
    return (
        <div
            style={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                background: '#111',
                padding: '12px',
                fontFamily: 'monospace',
                display: 'flex',
                gap: '16px',
                zIndex: 9999,
            }}
        >
            {Object.entries(metrics).map(([name, value]) => {
                const metricName = name as MetricName
                const isCls = metricName === 'CLS'

                const displayValue = isCls
                    ? value!.toFixed(3)
                    : `${(value! / 1000).toFixed(2)}s`

                return (
                    <div key={name} style={{ color: getColor(metricName, value!) }}>
                        {metricName}: {displayValue}
                    </div>
                )
            })}
        </div>
    )
}