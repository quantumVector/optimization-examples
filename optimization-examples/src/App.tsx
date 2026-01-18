import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { FcpBadPage } from './pages/fcp/FcpBadPage'
import { FcpGoodPage } from './pages/fcp/FcpGoodPage'
import { ClsBadPage } from './pages/cls/ClsBadPage'
import { ClsGoodPage } from './pages/cls/ClsGoodPage'
import {useCls, useInp, useLcp, useTbt, useWebVitals} from './vitals/useWebVitals'
import { MetricsPanel } from './ui/MetricsPanel'
import {InpBadPage} from "./pages/inp/Inpbadpage.tsx";
import {InpGoodPage} from "./pages/inp/Inpgoodpage.tsx";
import {LcpBadPage} from "./pages/lcp/Lcpbadpage.tsx";
import {LcpGoodPage} from "./pages/lcp/Lcpgoodpage.tsx";
import {TbtBadPage} from "./pages/tbt/Tbtbadpage.tsx";
import {TbtGoodPage} from "./pages/tbt/Tbtgoodpage.tsx";
import {TtfbBadPage} from "./pages/ttfb/Ttfbbadpage.tsx";
import {TtfbGoodPage} from "./pages/ttfb/Ttfbgoodpage.tsx";

export function App() {
    const cls = useCls()
    const inp = useInp()
    const lcp = useLcp()
    const tbt = useTbt()
    const metrics = useWebVitals(cls, inp, lcp, tbt)

    return (
        <div className="app">
            <nav>
                <a href="/fcp/bad">FCP Bad</a>
                <a href="/fcp/good">FCP Good</a>
                <a href="/lcp/bad">LCP Bad</a>
                <a href="/lcp/good">LCP Good</a>
                <a href="/tbt/bad">TBT Bad</a>
                <a href="/tbt/good">TBT Good</a>
                <a href="/ttfb/bad">TTFB Bad</a>
                <a href="/ttfb/good">TTFB Good</a>
                <a href="/cls/bad">CLS Bad</a>
                <a href="/cls/good">CLS Good</a>
                <a href="/inp/bad">INP Bad</a>
                <a href="/inp/good">INP Good</a>
            </nav>

            <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/fcp/bad" element={<FcpBadPage />} />
                <Route path="/fcp/good" element={<FcpGoodPage />} />
                <Route path="/lcp/bad" element={<LcpBadPage />} />
                <Route path="/lcp/good" element={<LcpGoodPage />} />
                <Route path="/tbt/bad" element={<TbtBadPage />} />
                <Route path="/tbt/good" element={<TbtGoodPage />} />
                <Route path="/ttfb/bad" element={<TtfbBadPage />} />
                <Route path="/ttfb/good" element={<TtfbGoodPage />} />
                <Route path="/cls/bad" element={<ClsBadPage />} />
                <Route path="/cls/good" element={<ClsGoodPage />} />
                <Route path="/inp/bad" element={<InpBadPage />} />
                <Route path="/inp/good" element={<InpGoodPage />} />
            </Routes>

            <MetricsPanel metrics={metrics} />
        </div>
    )
}
