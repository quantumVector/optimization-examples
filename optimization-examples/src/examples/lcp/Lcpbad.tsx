import { useEffect, useState } from 'react'

export function LcpBad() {
    const [showImage, setShowImage] = useState(false)

    useEffect(() => {
        // ❌ Задержка перед загрузкой главного контента
        const timer = setTimeout(() => {
            setShowImage(true)
        }, 5000)

        return () => clearTimeout(timer)
    }, [])

    return (
        <div style={{ padding: '24px' }}>
            <p>Небольшой текст сверху</p>

            {/* ❌ Самый большой элемент загружается поздно */}
            {showImage && (
                <div
                    style={{
                        width: '100%',
                        height: '600px',
                        background: 'linear-gradient(45deg, #ff6b6b, #ee5a6f)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '32px',
                        color: 'white',
                        fontWeight: 'bold',
                        marginTop: '16px',
                    }}
                >
                    ❌ Largest Contentful Paint (появился через 5s)
                </div>
            )}

            <p style={{ marginTop: '24px', color: '#ff6b6b' }}>
                Самый большой элемент загружается поздно → высокий LCP
            </p>
        </div>
    )
}