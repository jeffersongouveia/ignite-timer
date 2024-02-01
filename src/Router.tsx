import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home/Home.tsx'
import History from './pages/History/History.tsx'
import DefaultLayout from './layouts/DefaultLayout.tsx'

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
      </Route>
    </Routes>
  )
}
