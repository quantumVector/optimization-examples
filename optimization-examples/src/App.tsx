import {Routes, Route, Link} from 'react-router-dom'
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
import {OptimizedPage} from "./pages/Optimizedpage.tsx";
import {LazyLoadingGoodPage} from "./pages/lazy-loading/Lazyloadinggoodpage.tsx";

export function App() {
    const cls = useCls()
    const inp = useInp()
    const lcp = useLcp()
    const tbt = useTbt()
    const metrics = useWebVitals(cls, inp, lcp, tbt)

    return (
        <div className="app">
            <nav>
                <Link to="/optimized">Optimized</Link>
                <hr style={{ margin: '8px 0', opacity: 0.3 }} />
                <Link to="/fcp/bad">FCP Bad</Link>
                <Link to="/fcp/good">FCP Good</Link>
                <Link to="/lcp/bad">LCP Bad</Link>
                <Link to="/lcp/good">LCP Good</Link>
                <Link to="/tbt/bad">TBT Bad</Link>
                <Link to="/tbt/good">TBT Good</Link>
                <Link to="/ttfb/bad">TTFB Bad</Link>
                <Link to="/ttfb/good">TTFB Good</Link>
                <Link to="/cls/bad">CLS Bad</Link>
                <Link to="/cls/good">CLS Good</Link>
                <Link to="/inp/bad">INP Bad</Link>
                <Link to="/inp/good">INP Good</Link>
                <Link to="/lazy-loading/good">Lazy Loading Good</Link>
            </nav>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/optimized" element={<OptimizedPage />} />

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

                <Route path="/lazy-loading/good" element={<LazyLoadingGoodPage />} />
            </Routes>

            <MetricsPanel metrics={metrics} />
        </div>
    )
}
