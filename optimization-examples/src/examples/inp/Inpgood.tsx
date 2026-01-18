import { useState } from 'react'

export function InpGood() {
    const [count, setCount] = useState(0)

    const handleClick = () => {
        // ✅ Не блокируем поток — сразу обновляем UI
        setCount(prev => prev + 1)

        // Если нужны тяжёлые вычисления — делаем их асинхронно
        setTimeout(() => {
            // Тяжёлая работа после paint
            console.log('Тяжёлые вычисления выполнены')
        }, 0)
    }

    return (
        <div style={{ padding: '24px' }}>
            <p>Кликни на кнопку — она отреагирует мгновенно</p>

            <button
                onClick={handleClick}
                style={{
                    padding: '16px 32px',
                    fontSize: '18px',
                    cursor: 'pointer',
                    marginTop: '16px',
                }}
            >
                ✅ Быстрая кнопка: {count}
            </button>

            <p style={{ marginTop: '24px', color: '#51cf66' }}>
                Обработчик не блокирует поток → низкий INP
            </p>
        </div>
    )
}