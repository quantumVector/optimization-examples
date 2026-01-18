import { useEffect, useState } from 'react'

export function ClsGood() {
    const [showBanner, setShowBanner] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => setShowBanner(true), 1500)
        return () => clearTimeout(timer)
    }, [])

    return (
        <div style={{ padding: '24px' }}>
            <p>Контент сверху</p>

            {/* ✅ Резервируем место заранее */}
            <div
                style={{
                    background: 'green',
                    fontWeight: 'bold',
                    padding: '16px',
                    minHeight: 48, // зарезервированное место
                }}
            >
                {showBanner ? 'Контент появился' : 'Загрузка...'}
            </div>

            <p>Ещё контент снизу</p>
        </div>
    )
}
