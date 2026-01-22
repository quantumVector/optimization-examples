import { useEffect } from 'react'
import {type MetaTagsConfig, setMetaTags} from "./metaTags.ts";

export function useMetaTags(config: MetaTagsConfig) {
    useEffect(() => {
        const cleanup = setMetaTags(config);

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
