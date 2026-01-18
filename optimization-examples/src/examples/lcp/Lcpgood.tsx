export function LcpGood() {
    return (
        <div style={{ padding: '24px' }}>
            <p>Небольшой текст сверху</p>

            {/* ✅ Самый большой элемент доступен сразу */}
            <div
                style={{
                    width: '100%',
                    height: '600px',
                    background: 'linear-gradient(45deg, #51cf66, #37b24d)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '32px',
                    color: 'white',
                    fontWeight: 'bold',
                    marginTop: '16px',
                }}
            >
                ✅ Largest Contentful Paint (доступен сразу)
            </div>

            <p style={{ marginTop: '24px', color: '#51cf66' }}>
                Самый большой элемент загружен сразу → низкий LCP
            </p>
        </div>
    )
}