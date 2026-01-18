import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { FcpBadPage } from './pages/fcp/FcpBadPage'
import { FcpGoodPage } from './pages/fcp/FcpGoodPage'
import { ClsBadPage } from './pages/cls/ClsBadPage'
import { ClsGoodPage } from './pages/cls/ClsGoodPage'
import {useCls, useWebVitals} from './vitals/useWebVitals'
import { MetricsPanel } from './ui/MetricsPanel'

export function App() {
    const cls = useCls()
    const metrics = useWebVitals(cls) // CLS передаём сюда

    return (
        <div className="app">
            <nav>
                <a href="/fcp/bad">FCP Bad</a>
                <a href="/fcp/good">FCP Good</a>
                <a href="/cls/bad">CLS Bad</a>
                <a href="/cls/good">CLS Good</a>
            </nav>

            <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/fcp/bad" element={<FcpBadPage />} />
                <Route path="/fcp/good" element={<FcpGoodPage />} />
                <Route path="/cls/bad" element={<ClsBadPage />} />
                <Route path="/cls/good" element={<ClsGoodPage />} />
            </Routes>

            <MetricsPanel metrics={metrics} />
        </div>
    )
}
