import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App'
import { BrowserRouter } from 'react-router-dom'

// для TTFB
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch((error) => {
        console.error(error)
    })
}

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </StrictMode>
)

// setTimeout(() => {
//     createRoot(document.getElementById('root')!).render(
//         <StrictMode>
//             <BrowserRouter>
//                 <App />
//             </BrowserRouter>
//         </StrictMode>
//     )
// }, 3000)