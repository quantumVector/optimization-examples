export function FcpBad() {
    const start = performance.now()
    while (performance.now() - start < 1200) {}

    return <p>FCP заблокирован синхронным кодом</p>
}