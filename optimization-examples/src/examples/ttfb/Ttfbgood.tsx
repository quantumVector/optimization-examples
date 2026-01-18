export function TtfbGood() {
    return (
        <div style={{ padding: '24px' }}>
            <h2>Демонстрация быстрого TTFB</h2>

            <div style={{
                padding: '32px',
                background: '#51cf6622',
                borderRadius: '8px',
                marginTop: '16px'
            }}>
                <p style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '12px' }}>
                    ✅ Быстрая загрузка
                </p>
                <p style={{ marginBottom: '8px' }}>
                    На этой странице нет искусственной задержки
                </p>
                <p style={{ fontSize: '14px', opacity: 0.8 }}>
                    TTFB на localhost обычно ~10-50ms (очень быстро)
                </p>
            </div>

            <p style={{ marginTop: '24px', color: '#51cf66' }}>
                Быстрый сервер → низкий TTFB (~0.01-0.05s)
            </p>

            <div style={{ marginTop: '16px', fontSize: '14px', color: '#888' }}>
                <p><strong>TTFB = Time to First Byte</strong></p>
                <p>Время от начала навигации до получения первого байта HTML от сервера</p>
                <hr style={{ margin: '12px 0', opacity: 0.3 }} />
                <p><strong>На localhost TTFB всегда низкий</strong> (~10-50ms), потому что:</p>
                <ul style={{ marginLeft: '20px', marginTop: '8px' }}>
                    <li>Нет сетевых задержек (DNS, TCP, TLS)</li>
                    <li>Сервер локально на твоём компьютере</li>
                    <li>Минимальное время обработки</li>
                </ul>
                <p style={{ marginTop: '12px' }}>
                    <strong>В production</strong> TTFB зависит от: расстояния до сервера, CDN, кеширования, скорости обработки запроса
                </p>
            </div>
        </div>
    )
}