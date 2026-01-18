import { useEffect, useState } from 'react'

export function TtfbBad() {
    const [swReady, setSwReady] = useState(false)

    useEffect(() => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.ready.then(() => {
                setSwReady(true)
            })
        }
    }, [])

    return (
        <div style={{ padding: '24px' }}>
            {!swReady ? (
                <div>
                    Service Worker регистрируется
                </div>
            ) : (
                <div>
                    <p style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '12px' }}>
                        Service Worker активен
                    </p>
                    <p style={{ fontSize: '14px' }}>
                        Страница загрузилась с задержкой 2 секунды
                    </p>
                </div>
            )}
        </div>
    )
}