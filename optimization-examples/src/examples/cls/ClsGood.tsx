import { useEffect, useState } from 'react'

export function ClsGood() {
    const [showBanner, setShowBanner] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => setShowBanner(true), 1500)
        return () => clearTimeout(timer)
    }, [])

    return (
        <div style={{ padding: '24px' }}>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam cum dicta eaque excepturi in maiores nihil praesentium quam? At, mollitia.</p>

            <div
                style={{
                    background: 'green',
                    fontWeight: 'bold',
                    padding: '16px',
                    minHeight: 48,
                }}
            >
                {showBanner ? 'Контент появился' : 'Загрузка...'}
            </div>

            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae in magni necessitatibus non quia quibusdam reprehenderit sequi sit, totam ut?</p>
        </div>
    )
}
