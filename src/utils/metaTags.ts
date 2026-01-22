export interface MetaTagsConfig {
    title?: string
    description?: string
    keywords?: string
    author?: string
    image?: string
    imageAlt?: string
    url?: string
    type?: string
    locale?: string
    siteName?: string
    twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player'
    canonical?: string
    alternateLanguages?: Array<{
        hreflang: string
        href: string
    }>
}

export function setMetaTags(config: MetaTagsConfig) {
    const addedTags: HTMLMetaElement[] = []
    const addedLinks: HTMLLinkElement[] = []
    let originalTitle = ''

    if (config.title) {
        originalTitle = document.title
        document.title = config.title
    }

    const metaTags: Array<{ property?: string; name?: string; content: string }> = []

    // Open Graph
    if (config.title) {
        metaTags.push({ property: 'og:title', content: config.title })
    }
    if (config.description) {
        metaTags.push({ property: 'og:description', content: config.description })
    }
    if (config.type) {
        metaTags.push({ property: 'og:type', content: config.type })
    }
    if (config.url) {
        metaTags.push({ property: 'og:url', content: config.url })
    }
    if (config.image) {
        metaTags.push({ property: 'og:image', content: config.image })
        metaTags.push({ property: 'og:image:width', content: '1200' })
        metaTags.push({ property: 'og:image:height', content: '630' })
    }
    if (config.imageAlt) {
        metaTags.push({ property: 'og:image:alt', content: config.imageAlt })
    }
    if (config.locale) {
        metaTags.push({ property: 'og:locale', content: config.locale })
    }
    if (config.siteName) {
        metaTags.push({ property: 'og:site_name', content: config.siteName })
    }

    // Twitter Cards
    if (config.twitterCard) {
        metaTags.push({ name: 'twitter:card', content: config.twitterCard })
    }
    if (config.title) {
        metaTags.push({ name: 'twitter:title', content: config.title })
    }
    if (config.description) {
        metaTags.push({ name: 'twitter:description', content: config.description })
    }
    if (config.image) {
        metaTags.push({ name: 'twitter:image', content: config.image })
    }
    if (config.imageAlt) {
        metaTags.push({ name: 'twitter:image:alt', content: config.imageAlt })
    }

    // SEO теги
    if (config.description) {
        metaTags.push({ name: 'description', content: config.description })
    }
    if (config.keywords) {
        metaTags.push({ name: 'keywords', content: config.keywords })
    }
    if (config.author) {
        metaTags.push({ name: 'author', content: config.author })
    }

    metaTags.forEach(tag => {
        let existingTag: HTMLMetaElement | null = null

        if (tag.property) {
            existingTag = document.querySelector(`meta[property="${tag.property}"]`)
        } else if (tag.name) {
            existingTag = document.querySelector(`meta[name="${tag.name}"]`)
        }

        if (existingTag) {
            existingTag.content = tag.content
        } else {
            const meta = document.createElement('meta')
            if (tag.property) {
                meta.setAttribute('property', tag.property)
            } else if (tag.name) {
                meta.setAttribute('name', tag.name)
            }
            meta.content = tag.content
            document.head.appendChild(meta)
            addedTags.push(meta)
        }
    })

    // Canonical
    if (config.canonical) {
        let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement

        if (canonicalLink) {
            canonicalLink.href = config.canonical
        } else {
            canonicalLink = document.createElement('link')
            canonicalLink.rel = 'canonical'
            canonicalLink.href = config.canonical
            document.head.appendChild(canonicalLink)
            addedLinks.push(canonicalLink)
        }
    }

    // Hreflang
    if (config.alternateLanguages && config.alternateLanguages.length > 0) {
        config.alternateLanguages.forEach(lang => {
            let hreflangLink = document.querySelector(
                `link[rel="alternate"][hreflang="${lang.hreflang}"]`
            ) as HTMLLinkElement

            if (hreflangLink) {
                hreflangLink.href = lang.href
            } else {
                hreflangLink = document.createElement('link')
                hreflangLink.rel = 'alternate'
                hreflangLink.hreflang = lang.hreflang
                hreflangLink.href = lang.href
                document.head.appendChild(hreflangLink)
                addedLinks.push(hreflangLink)
            }
        })
    }

    return () => {
        addedTags.forEach(tag => {
            if (tag.parentNode) {
                tag.parentNode.removeChild(tag)
            }
        })
        addedLinks.forEach(link => {
            if (link.parentNode) {
                link.parentNode.removeChild(link)
            }
        })
        if (originalTitle) {
            document.title = originalTitle
        }
    }
}
