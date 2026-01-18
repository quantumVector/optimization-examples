export function FcpBad() {
    const start = performance.now()

    // Блокируем главный поток ДО первого paint
    while (performance.now() - start < 1200) {}

    return <p>FCP заблокирован синхронным кодом</p>
}