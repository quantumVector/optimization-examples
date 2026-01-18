import { useEffect, useState } from 'react'

export function TbtGood() {
    const [count, setCount] = useState(0)

    useEffect(() => {
        // ✅ Разбиваем работу на маленькие части
        let iterations = 0
        const totalIterations = 100

        const processChunk = () => {
            const chunkSize = 10
            const end = Math.min(iterations + chunkSize, totalIterations)

            for (let i = iterations; i < end; i++) {
                // Лёгкая работа в каждой итерации
            }

            iterations = end

            if (iterations < totalIterations) {
                // Продолжаем асинхронно
                setTimeout(processChunk, 0)
            } else {
                setCount(1)
            }
        }

        processChunk()
    }, [])

    const handleClick = () => {
        // ✅ Сразу обновляем UI
        setCount(prev => prev + 1)

        // Тяжёлую работу откладываем
        setTimeout(() => {
            console.log('Тяжёлая работа выполнена асинхронно')
        }, 0)
    }

    return (
        <div style={{ padding: '24px' }}>
            <p>При загрузке работа разбита на маленькие задачи — поток не блокируется</p>

            <button
                onClick={handleClick}
                style={{
                    padding: '16px 32px',
                    fontSize: '18px',
                    cursor: 'pointer',
                    marginTop: '16px',
                }}
            >
                ✅ Кликни (быстро): {count}
            </button>

            <p style={{ marginTop: '24px', color: '#51cf66' }}>
                Нет long tasks → низкий TBT
            </p>

            <div style={{ marginTop: '16px', fontSize: '14px', color: '#888' }}>
                <p>TBT = Total Blocking Time</p>
                <p>Работа разбита на маленькие части (&lt;50ms каждая)</p>
                <p>Главный поток остаётся отзывчивым</p>
            </div>
        </div>
    )
}