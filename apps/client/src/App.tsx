import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import NotFound from './pages/NotFound'
import Comparison from './pages/demo_canvas/Comparison'
import ReactFlowDemo from './pages/demo_canvas/ReactFlowDemo'
import CytoscapeDemo from './pages/demo_canvas/CytoscapeDemo'
import CanvasDemo from './pages/demo_canvas/CanvasDemo'
import KonvaDemo from './pages/demo_canvas/KonvaDemo'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/demo-canvas" element={<Comparison />} />
      <Route path="/demo-canvas/react-flow" element={<ReactFlowDemo />} />
      <Route path="/demo-canvas/cytoscape" element={<CytoscapeDemo />} />
      <Route path="/demo-canvas/canvas" element={<CanvasDemo />} />
      <Route path="/demo-canvas/konva" element={<KonvaDemo />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
