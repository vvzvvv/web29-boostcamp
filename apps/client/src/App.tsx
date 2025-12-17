import { Route, Routes } from 'react-router-dom';

import { Home, NotFound, Problem, Problems } from '@/pages';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/problems" element={<Problems />} />
      <Route path="/problem" element={<Problem />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
