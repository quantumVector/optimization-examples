import { useEffect, useState } from 'react'

export function TtfbBad() {
    const [swReady, setSwReady] = useState(false)

    useEffect(() => {
        // Проверяем, зарегистрирован ли Service Worker
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.ready.then(() => {
                setSwReady(true)
            })
        }
    }, [])

    return (
        <div style={{ padding: '24px' }}>
            <h2>Демонстрация медленного TTFB</h2>

            {!swReady ? (
                <div style={{
                    padding: '32px',
                    background: '#ffd93d22',
                    borderRadius: '8px',
                    marginTop: '16px'
                }}>
                    ⏳ Service Worker регистрируется...
                    <p style={{ marginTop: '8px', fontSize: '14px' }}>
                        После регистрации обнови страницу (F5) чтобы увидеть задержку TTFB
                    </p>
                </div>
            ) : (
                <div style={{
                    padding: '32px',
                    background: '#ff6b6b22',
                    borderRadius: '8px',
                    marginTop: '16px'
                }}>
                    <p style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '12px' }}>
                        ❌ Service Worker активен
                    </p>
                    <p style={{ marginBottom: '8px' }}>
                        <strong>Обнови страницу (F5)</strong>, чтобы увидеть задержку TTFB ~2 секунды
                    </p>
                    <p style={{ fontSize: '14px', opacity: 0.8 }}>
                        Service Worker задерживает ответ сервера на 2000ms перед загрузкой HTML
                    </p>
                </div>
            )}

            <p style={{ marginTop: '24px', color: '#ff6b6b' }}>
                Медленный сервер → высокий TTFB (~2000ms)
            </p>

            <div style={{ marginTop: '16px', fontSize: '14px', color: '#888' }}>
                <p><strong>TTFB = Time to First Byte</strong></p>
                <p>Время от начала навигации до получения первого байта HTML от сервера</p>
                <p>Включает: DNS lookup, TCP connection, TLS negotiation, server processing</p>
                <hr style={{ margin: '12px 0', opacity: 0.3 }} />
                <p><strong>После обновления страницы:</strong></p>
                <ul style={{ marginLeft: '20px', marginTop: '8px' }}>
                    <li>Страница загрузится с задержкой ~2 секунды</li>
                    <li>TTFB в панели внизу покажет ~2.00s (красный)</li>
                    <li>Service Worker эмулирует медленный сервер</li>
                </ul>
            </div>
        </div>
    )
}