import { useEffect, useState } from 'react'

export function LcpBad() {
    const [showImage, setShowImage] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowImage(true)
        }, 5000)

        return () => clearTimeout(timer)
    }, [])

    return (
        <div style={{ padding: '24px' }}>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium, voluptatibus?</p>

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
                    Самый большой блок (появился через 5s)
                </div>
            )}
        </div>
    )
}