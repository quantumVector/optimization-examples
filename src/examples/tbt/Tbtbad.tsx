export function TbtBad() {
    const start = performance.now()
    while (performance.now() - start < 3000) {}
    return <p>Страница долго не становится интерактивной</p>
}