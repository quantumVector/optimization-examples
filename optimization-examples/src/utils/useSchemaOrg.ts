import { useEffect } from 'react'

/**
 * Добавляет Schema.org разметку в <head> страницы
 * Автоматически удаляет при размонтировании компонента
 */
export function useSchemaOrg(schemas: object | object[]) {
    useEffect(() => {
        const schemasArray = Array.isArray(schemas) ? schemas : [schemas]
        const scriptElements: HTMLScriptElement[] = []

        schemasArray.forEach((schema) => {
            const script = document.createElement('script')
            script.type = 'application/ld+json'
            script.text = JSON.stringify(schema)
            document.head.appendChild(script)
            scriptElements.push(script)
        })

        // Cleanup при размонтировании
        return () => {
            scriptElements.forEach((script) => {
                if (script.parentNode) {
                    script.parentNode.removeChild(script)
                }
            })
        }
    }, [schemas])
}