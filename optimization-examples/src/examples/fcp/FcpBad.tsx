import { useEffect, useState } from 'react'

export function FcpBad() {
    const [ready, setReady] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setReady(true)
        }, 3000)
    }, [])

    if (!ready) return null

    return <p>FCP задержан логикой загрузки</p>
}