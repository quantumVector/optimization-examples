import { useState } from 'react'

export function InpGood() {
    const [count, setCount] = useState(0)

    const handleClick = () => {
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
                Быстрая кнопка: {count}
            </button>
        </div>
    )
}