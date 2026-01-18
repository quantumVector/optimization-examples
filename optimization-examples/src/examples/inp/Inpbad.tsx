import { useState } from 'react'

export function InpBad() {
    const [count, setCount] = useState(0)

    const handleClick = () => {
        // ❌ Блокируем главный поток на 500ms
        const start = performance.now()
        while (performance.now() - start < 500) {
            // Тяжёлые вычисления
        }
        setCount(prev => prev + 1)
    }

    return (
        <div style={{ padding: '24px' }}>
            <p>Кликни на кнопку и обрати внимание на задержку перед обновлением</p>

            <button
                onClick={handleClick}
                style={{
                    padding: '16px 32px',
                    fontSize: '18px',
                    cursor: 'pointer',
                    marginTop: '16px',
                }}
            >
                ❌ Медленная кнопка: {count}
            </button>

            <p style={{ marginTop: '24px', color: '#ff6b6b' }}>
                Обработчик блокирует главный поток на 500ms → высокий INP
            </p>
        </div>
    )
}