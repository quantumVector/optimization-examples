import { useEffect, useState } from 'react'

export function TbtBad() {
    const [count, setCount] = useState(0)

    useEffect(() => {
        // ❌ Тяжёлая синхронная задача блокирует главный поток
        const start = performance.now()
        while (performance.now() - start < 300) {
            // Блокируем поток на 300ms
        }

        // Ещё одна задача
        const start2 = performance.now()
        while (performance.now() - start2 < 400) {
            // Блокируем поток на 400ms
        }

        setCount(1)
    }, [])

    const handleClick = () => {
        // ❌ Блокируем поток при клике
        const start = performance.now()
        while (performance.now() - start < 600) {
            // Блокируем поток на 600ms
        }
        setCount(prev => prev + 1)
    }

    return (
        <div style={{ padding: '24px' }}>
            <p>При загрузке страницы главный поток блокируется несколькими длинными задачами</p>

            <button
                onClick={handleClick}
                style={{
                    padding: '16px 32px',
                    fontSize: '18px',
                    cursor: 'pointer',
                    marginTop: '16px',
                }}
            >
                ❌ Кликни (медленно): {count}
            </button>

            <p style={{ marginTop: '24px', color: '#ff6b6b' }}>
                Множество long tasks (&gt;50ms) блокируют поток → высокий TBT
            </p>

            <div style={{ marginTop: '16px', fontSize: '14px', color: '#888' }}>
                <p>TBT = Total Blocking Time</p>
                <p>Сумма времени блокировки всех long tasks между FCP и TTI</p>
                <p>Long task = задача &gt;50ms. Учитывается время сверх 50ms</p>
            </div>
        </div>
    )
}