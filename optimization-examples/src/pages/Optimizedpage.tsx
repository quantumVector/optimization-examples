import { useEffect, useState } from 'react'
import {useMetaTags} from "../utils/useMetaTags.ts";

// ✅ Оптимизация 1: Критический CSS инлайн для FCP
const criticalStyles = `
  .hero { 
    min-height: 400px; 
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }
`

export function OptimizedPage() {
    const [cachedData, setCachedData] = useState<any>(null)
    const [isFromCache, setIsFromCache] = useState(false)

    // ✅ Настройка Open Graph и Twitter Cards через хук
    useMetaTags({
        title: '⚡ Оптимизированная страница | Web Vitals Demo',
        description: 'Демонстрация оптимизаций для улучшения TTFB, FCP и LCP. Кеширование, критический CSS, приоритизация ресурсов.',
        keywords: 'web vitals, performance, TTFB, FCP, LCP, оптимизация, кеширование',
        author: 'Web Performance Demo',
        image: 'https://picsum.photos/1200/630',
        imageAlt: 'Web Performance Optimization Demo',
        url: typeof window !== 'undefined' ? window.location.href : '',
        type: 'website',
        locale: 'ru_RU',
        siteName: 'Web Vitals Demo',
        twitterCard: 'summary_large_image',
    })

    useEffect(() => {
        // ✅ Проверяем кеш перед запросом (улучшает TTFB)
        const cached = localStorage.getItem('optimized-page-data')
        if (cached) {
            const data = JSON.parse(cached)
            setCachedData(data)
            setIsFromCache(true)
        }

        // Имитация загрузки данных
        fetch('https://jsonplaceholder.typicode.com/posts/1')
            .then(res => res.json())
            .then(data => {
                // Кешируем данные
                localStorage.setItem('optimized-page-data', JSON.stringify(data))
                if (!isFromCache) {
                    setCachedData(data)
                }
            })
    }, [])

    return (
        <div>
            {/* ✅ Критический CSS инлайн для мгновенного FCP */}
            <style dangerouslySetInnerHTML={{ __html: criticalStyles }} />

            {/* ✅ Hero секция сразу видна - улучшает FCP */}
            <div className="hero">
                <div style={{ textAlign: 'center', padding: '40px' }}>
                    <h1 style={{ fontSize: '48px', margin: '0 0 16px 0' }}>
                        ⚡ Оптимизированная страница
                    </h1>
                    <p style={{ fontSize: '20px', opacity: 0.9, margin: 0 }}>
                        Быстрая загрузка FCP, LCP, TTFB
                    </p>
                </div>
            </div>

            <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
                {/* ✅ LCP элемент - загружается сразу с preload */}
                <img
                    src="https://picsum.photos/800/400"
                    alt="Largest Contentful Paint"
                    loading="eager"
                    fetchPriority="high"
                    style={{
                        width: '100%',
                        minHeight: '600px',
                        borderRadius: '8px',
                        display: 'block'
                    }}
                />

                <div style={{ marginTop: '40px' }}>
                    <h2 style={{ fontSize: '32px', marginBottom: '16px' }}>
                        Применённые оптимизации:
                    </h2>

                    {/* Статус кеширования */}
                    {cachedData && (
                        <div style={{
                            padding: '16px',
                            background: isFromCache ? '#e8f5e9' : '#fff3e0',
                            borderRadius: '8px',
                            marginBottom: '20px',
                            border: `2px solid ${isFromCache ? '#4caf50' : '#ff9800'}`
                        }}>
                            <strong>{isFromCache ? '✅ Данные загружены из кеша' : '⏳ Данные загружаются с сервера'}</strong>
                            <p style={{ margin: '8px 0 0 0', fontSize: '14px' }}>
                                {isFromCache
                                    ? 'Мгновенная загрузка без запроса к серверу - TTFB ~0ms'
                                    : 'При следующей загрузке данные будут из кеша'}
                            </p>
                        </div>
                    )}

                    <div style={{
                        display: 'grid',
                        gap: '20px',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
                    }}>
                        <OptimizationCard
                            title="⚡ TTFB оптимизация"
                            description="Кеширование в localStorage - данные загружаются мгновенно при повторных визитах. В production: CDN, edge caching, HTTP/2, stale-while-revalidate"
                            metric="TTFB < 800ms"
                        />

                        <OptimizationCard
                            title="🎨 FCP оптимизация"
                            description="Критический CSS инлайн, минимальный JS, контент сразу виден без блокировки"
                            metric="FCP < 1.8s"
                        />

                        <OptimizationCard
                            title="🖼️ LCP оптимизация"
                            description="Главное изображение с fetchPriority='high' и loading='eager' для приоритетной загрузки"
                            metric="LCP < 2.5s"
                        />
                    </div>
                </div>

                <div style={{ marginTop: '40px', padding: '24px', background: '#f8f9fa', borderRadius: '8px' }}>
                    <h3 style={{ marginTop: 0 }}>📊 Кеширование для TTFB</h3>
                    <ul style={{ lineHeight: '1.8' }}>
                        <li><strong>localStorage кеш:</strong> Данные сохраняются в браузере, мгновенная загрузка при повторных визитах</li>
                        <li><strong>HTTP кеш заголовки:</strong> Cache-Control, ETag, Last-Modified</li>
                        <li><strong>Service Worker:</strong> Продвинутое кеширование и offline режим</li>
                        <li><strong>CDN:</strong> Контент раздаётся с ближайшего сервера к пользователю</li>
                    </ul>
                    <button
                        onClick={() => {
                            localStorage.removeItem('optimized-page-data')
                            window.location.reload()
                        }}
                        style={{
                            marginTop: '12px',
                            padding: '8px 16px',
                            background: '#ff9800',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Очистить кеш и перезагрузить
                    </button>
                </div>

                <div style={{ marginTop: '40px', padding: '24px', background: '#f8f9fa', borderRadius: '8px' }}>
                    <h3 style={{ marginTop: 0 }}>📊 Что измеряем</h3>
                    <ul style={{ lineHeight: '1.8' }}>
                        <li><strong>TTFB</strong> - Time to First Byte: время до получения первого байта HTML</li>
                        <li><strong>FCP</strong> - First Contentful Paint: время до первого видимого контента</li>
                        <li><strong>LCP</strong> - Largest Contentful Paint: время до отрисовки главного элемента</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

function OptimizationCard({ title, description, metric }: { title: string; description: string; metric: string }) {
    return (
        <div style={{
            padding: '24px',
            background: 'white',
            borderRadius: '8px',
            border: '1px solid #e0e0e0',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
        }}>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '18px' }}>{title}</h3>
            <p style={{ margin: '0 0 12px 0', color: '#666', fontSize: '14px', lineHeight: '1.6' }}>
                {description}
            </p>
            <div style={{
                display: 'inline-block',
                padding: '4px 12px',
                background: '#e8f5e9',
                color: '#2e7d32',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: 'bold'
            }}>
                {metric}
            </div>
        </div>
    )
}