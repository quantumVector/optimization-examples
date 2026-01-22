import { useState } from 'react'

export function InpBad() {
    const [count, setCount] = useState(0)

    const handleClick = () => {
        const start = performance.now()
        while (performance.now() - start < 500) {}
        setCount(prev => prev + 1)
    }

    return (
        <div style={{ padding: '24px' }}>
            <button
                onClick={handleClick}
                style={{
                    padding: '16px 32px',
                    fontSize: '18px',
                    cursor: 'pointer',
                    marginTop: '16px',
                }}
            >
                Медленная кнопка: {count}
            </button>
        </div>
    )
}