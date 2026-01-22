import { useEffect } from 'react'
import {type MetaTagsConfig, setMetaTags} from "./metaTags.ts";

/**
 * React хук для управления мета-тегами страницы
 * Автоматически очищает теги при размонтировании компонента
 *
 * @example
 * useMetaTags({
 *   title: 'Моя страница',
 *   description: 'Описание страницы',
 *   image: 'https://example.com/image.jpg'
 * })
 */
export function useMetaTags(config: MetaTagsConfig) {
    useEffect(() => {
        const cleanup = setMetaTags(config)
        return cleanup
    }, [
        config.title,
        config.description,
        config.keywords,
        config.author,
        config.image,
        config.imageAlt,
        config.url,
        config.type,
        config.locale,
        config.siteName,
        config.twitterCard,
    ])
}