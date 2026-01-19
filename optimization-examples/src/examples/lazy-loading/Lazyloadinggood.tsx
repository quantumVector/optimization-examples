/**
 * ✅ Хороший пример - оптимизированная загрузка ресурсов
 * Демонстрирует правильное использование lazy loading
 */

import { useState, useEffect } from 'react'

export function LazyLoadingGood() {
    const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set())
    const [loadedIframes, setLoadedIframes] = useState<Set<string>>(new Set())

    // Отслеживаем когда элементы загружаются
    useEffect(() => {
        const handleImageLoad = (e: Event) => {
            const img = e.target as HTMLImageElement
            const id = img.dataset.id
            if (id) {
                setLoadedImages(prev => new Set([...prev, parseInt(id)]))
            }
        }

        const images = document.querySelectorAll('img[data-id]')
        images.forEach(img => img.addEventListener('load', handleImageLoad))

        return () => {
            images.forEach(img => img.removeEventListener('load', handleImageLoad))
        }
    }, [])

    return (
        <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ color: '#4caf50', marginBottom: '16px' }}>
                ✅ С Lazy Loading - Оптимизированная загрузка
            </h2>

            <div style={{
                padding: '16px',
                background: '#e8f5e9',
                borderLeft: '4px solid #4caf50',
                marginBottom: '32px'
            }}>
                <strong>Решение:</strong> Изображения и iframe загружаются только когда пользователь
                прокручивает к ним. Критичный контент приоритизируется с fetchpriority="high".
            </div>

            {/* Первое изображение - видно сразу, высокий приоритет */}
            <section style={{ marginBottom: '40px' }}>
                <h3>Hero изображение (Above the fold)</h3>
                <img
                    src="https://picsum.photos/1200/600?random=1"
                    alt="Hero"
                    loading="eager"
                    fetchPriority="high"
                    data-id="1"
                    style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                />
                <p style={{ fontSize: '14px', color: '#4caf50', marginTop: '8px' }}>
                    ✅ loading="eager" + fetchpriority="high" - загружается первым
                </p>
            </section>

            <div style={{ height: '400px', background: '#f5f5f5', marginBottom: '40px',
                display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p>Контент между изображениями</p>
            </div>

            {/* Галерея изображений внизу страницы */}
            <section style={{ marginBottom: '40px' }}>
                <h3>Галерея изображений (Below the fold)</h3>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '16px',
                    marginTop: '16px'
                }}>
                    {[2, 3, 4, 5, 6, 7].map(num => (
                        <div key={num}>
                            <img
                                src={`https://picsum.photos/400/300?random=${num}`}
                                alt={`Gallery ${num}`}
                                loading="lazy"
                                data-id={num.toString()}
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    borderRadius: '8px',
                                    backgroundColor: '#f0f0f0'
                                }}
                            />
                            <p style={{
                                fontSize: '12px',
                                color: loadedImages.has(num) ? '#4caf50' : '#999',
                                marginTop: '4px'
                            }}>
                                {loadedImages.has(num)
                                    ? '✅ Загружено!'
                                    : '⏳ Загрузится при прокрутке'}
                            </p>
                        </div>
                    ))}
                </div>
                <div style={{
                    marginTop: '16px',
                    padding: '12px',
                    background: '#e3f2fd',
                    borderRadius: '4px'
                }}>
                    <strong>💡 Совет:</strong> Прокрути страницу вниз и открой DevTools → Network.
                    Ты увидишь как изображения загружаются по мере прокрутки!
                </div>
            </section>

            <div style={{ height: '400px', background: '#f5f5f5', marginBottom: '40px',
                display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p>Ещё контент между секциями</p>
            </div>

            {/* YouTube видео внизу страницы */}
            <section style={{ marginBottom: '40px' }}>
                <h3>YouTube видео (Far below the fold)</h3>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                    gap: '24px',
                    marginTop: '16px'
                }}>
                    {/* Видео 1 */}
                    <div>
                        <iframe
                            width="100%"
                            height="315"
                            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                            title="YouTube video 1"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            loading="lazy"
                            style={{ borderRadius: '8px', backgroundColor: '#000' }}
                        />
                        <p style={{ fontSize: '12px', color: '#4caf50', marginTop: '8px' }}>
                            ✅ loading="lazy" - YouTube (~500KB) загрузится при прокрутке
                        </p>
                    </div>

                    {/* Видео 2 */}
                    <div>
                        <iframe
                            width="100%"
                            height="315"
                            src="https://www.youtube.com/embed/9bZkp7q19f0"
                            title="YouTube video 2"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            loading="lazy"
                            style={{ borderRadius: '8px', backgroundColor: '#000' }}
                        />
                        <p style={{ fontSize: '12px', color: '#4caf50', marginTop: '8px' }}>
                            ✅ Экономия ~500KB до момента просмотра
                        </p>
                    </div>
                </div>
                <div style={{
                    marginTop: '16px',
                    padding: '12px',
                    background: '#fff3e0',
                    borderRadius: '4px'
                }}>
                    <strong>⚡ Важно:</strong> YouTube iframe весит ~500KB (API, скрипты, превью).
                    Без lazy loading все видео загружаются сразу. С lazy loading - только при прокрутке!
                </div>
            </section>

            {/* Google Maps */}
            <section style={{ marginBottom: '40px' }}>
                <h3>Google Maps в футере</h3>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2244.2487419618374!2d37.61776961592425!3d55.75583998055595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54a50b315e573%3A0xa886bf5a3d9b2e68!2sThe%20Kremlin!5e0!3m2!1sen!2sru!4v1234567890123"
                    width="100%"
                    height="450"
                    style={{ border: 0, borderRadius: '8px', backgroundColor: '#e0e0e0' }}
                    allowFullScreen
                    loading="lazy"
                />
                <p style={{ fontSize: '12px', color: '#4caf50', marginTop: '8px' }}>
                    ✅ loading="lazy" - Google Maps (~1-2 MB) загрузится при достижении футера
                </p>
            </section>

            {/* Итоговая статистика */}
            <div style={{
                padding: '24px',
                background: '#e8f5e9',
                borderRadius: '8px',
                marginTop: '40px'
            }}>
                <h3 style={{ color: '#4caf50', marginTop: 0 }}>📊 Улучшение производительности</h3>
                <ul style={{ lineHeight: '2', color: '#333' }}>
                    <li>✅ <strong>Initial Load:</strong> ~600KB (только видимый контент)</li>
                    <li>✅ <strong>Экономия:</strong> ~3-4 MB не загружается до прокрутки</li>
                    <li>✅ <strong>LCP:</strong> Улучшается на 40-60% (нет конкуренции за bandwidth)</li>
                    <li>✅ <strong>Mobile:</strong> Трафик экономится драматически</li>
                    <li>✅ <strong>UX:</strong> Мгновенная загрузка видимого контента</li>
                </ul>

                <div style={{
                    marginTop: '20px',
                    padding: '16px',
                    background: 'white',
                    borderRadius: '4px'
                }}>
                    <h4 style={{ marginTop: 0 }}>🎯 Best Practices примененные здесь:</h4>
                    <ol style={{ marginBottom: 0, lineHeight: '1.8' }}>
                        <li><code>loading="eager"</code> + <code>fetchpriority="high"</code> для hero изображения</li>
                        <li><code>loading="lazy"</code> для всех изображений ниже сгиба</li>
                        <li><code>loading="lazy"</code> для всех iframe (YouTube, Maps)</li>
                        <li>Плейсхолдеры (backgroundColor) для плавного появления</li>
                        <li>alt текст для всех изображений (доступность + SEO)</li>
                    </ol>
                </div>
            </div>

            {/* Инструкция по тестированию */}
            <div style={{
                padding: '24px',
                background: '#e3f2fd',
                borderRadius: '8px',
                marginTop: '24px'
            }}>
                <h3 style={{ marginTop: 0 }}>🧪 Как протестировать:</h3>
                <ol style={{ lineHeight: '1.8', marginBottom: 0 }}>
                    <li><strong>Открой DevTools:</strong> F12 → Network tab</li>
                    <li><strong>Перезагрузи страницу:</strong> Ctrl+R</li>
                    <li><strong>Смотри:</strong> Загружаются только первые ресурсы (~600KB)</li>
                    <li><strong>Прокрути вниз:</strong> Видишь как появляются новые запросы?</li>
                    <li><strong>Сравни:</strong> С "Bad" версией (все загружается сразу)</li>
                </ol>
            </div>
        </div>
    )
}