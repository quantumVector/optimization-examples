import { useEffect, useState } from 'react'
import { useMetaTags } from "../utils/useMetaTags.ts"
import { useSchemaOrg } from "../utils/useSchemaOrg.ts"

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

    useMetaTags({
        // ✅ Настройка Open Graph и Twitter Cards через хук
        title: 'SEO-аудит',
        description: 'Страница для оптимизации',
        keywords: 'web vitals, performance, TTFB, LCP, FCP, оптимизация, кеширование',
        author: 'Performance',
        image: 'https://picsum.photos/1200/630',
        imageAlt: 'optimization',
        url: typeof window !== 'undefined' ? window.location.href : '',
        type: 'website',
        locale: 'ru_RU',
        siteName: 'Optimization demo',
        twitterCard: 'summary_large_image',

        // ✅ Canonical URL - избегаем дубликаты контента
        canonical: 'https://optimization-demo.com/optimized',

        // ✅ Hreflang - мультиязычные версии страницы
        alternateLanguages: [
            { hreflang: 'en', href: 'https://optimization-demo.com/en/optimized' },
            { hreflang: 'ru', href: 'https://optimization-demo.com/ru/optimized' },
            { hreflang: 'de', href: 'https://optimization-demo.com/de/optimized' },
            { hreflang: 'x-default', href: 'https://optimization-demo.com/en/optimized' },
        ],
    })

    // ✅ Schema.org разметка для статьи (JSON-LD) - добавляется в <head>
    const articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'SEO-аудит',
        description: 'Страница для оптимизации',
        image: 'https://picsum.photos/1200/630',
        author: {
            '@type': 'Organization',
            name: 'Performance'
        },
        publisher: {
            '@type': 'Organization',
            name: 'SEO Optimization',
            logo: {
                '@type': 'ImageObject',
                url: 'https://picsum.photos/200/200'
            }
        },
        datePublished: '2025-01-18',
        dateModified: '2025-01-18',
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': typeof window !== 'undefined' ? window.location.href : ''
        },
        articleSection: 'Web Performance',
        keywords: ['web vitals', 'performance', 'TTFB', 'FCP', 'LCP', 'оптимизация'],
        inLanguage: 'ru-RU'
    }

    // ✅ Breadcrumb Schema для навигации - добавляется в <head>
    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Главная',
                item: typeof window !== 'undefined' ? window.location.origin : ''
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'Оптимизированная страница',
                item: typeof window !== 'undefined' ? window.location.href : ''
            }
        ]
    }

    // ✅ Добавляем Schema.org разметку в <head>
    useSchemaOrg([articleSchema, breadcrumbSchema])

    useEffect(() => {
        // ✅ Оптимизация:
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
                <div className="hero-content">
                    <h1 className="hero-title">
                        Оптимизированная страница
                    </h1>
                    <p className="hero-subtitle">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum, quisquam.
                    </p>
                </div>
            </div>

            <div className="content-wrapper">
                {/* ✅ LCP элемент - загружается сразу с preload */}
                <img
                    src="https://picsum.photos/800/400"
                    alt="Largest Contentful Paint"
                    loading="eager"
                    fetchPriority="high"
                    className="lcp-image"
                />

                <div className="section-spacing">
                    <h2 className="section-title">
                        Применённые оптимизации:
                    </h2>

                    {/* Статус кеширования (для TTFB)*/}
                    {cachedData && (
                        <div className={`cache-status ${isFromCache ? 'from-cache' : 'from-server'}`}>
                            <strong>{isFromCache ? 'Данные загружены из кеша' : 'Данные загружаются с сервера'}</strong>
                            <p className="cache-status-text">
                                {isFromCache
                                    ? 'Мгновенная загрузка без запроса к серверу'
                                    : 'При следующей загрузке данные будут из кеша'}
                            </p>
                        </div>
                    )}
                </div>

                <div className="info-section">
                    <button
                        onClick={() => {
                            localStorage.removeItem('optimized-page-data')
                            window.location.reload()
                        }}
                        className="clear-cache-button"
                    >
                        Очистить кеш и перезагрузить
                    </button>
                </div>
            </div>
        </div>
    )
}
