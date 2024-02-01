import { Outlet } from 'react-router-dom'
import Header from '../components/Header/Header.tsx'

import { LayoutContainer } from './styles.ts'

export default function DefaultLayout() {
  return (
    <LayoutContainer>
      <Header />
      <Outlet />
    </LayoutContainer>
  )
}
