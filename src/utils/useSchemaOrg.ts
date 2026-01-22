import { useEffect } from 'react'

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

        return () => {
            scriptElements.forEach((script) => {
                if (script.parentNode) {
                    script.parentNode.removeChild(script)
                }
            })
        }
    }, [schemas])
}
