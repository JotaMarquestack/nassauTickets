import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AtendenteApp from './features/atendente/AtendenteApp';
// import TotemApp from './features/totem/TotemApp';      // Integrante 5
// import PainelApp from './features/painel/PainelApp';   // Integrante 6

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/atendente/*" element={<AtendenteApp />} />
        {/* <Route path="/totem/*" element={<TotemApp />} /> */}
        {/* <Route path="/painel/*" element={<PainelApp />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
