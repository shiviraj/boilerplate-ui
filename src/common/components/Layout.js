import React from 'react'
import { useRouter } from 'next/router'
import Header from './Header'
import { ROUTES } from '../../config/routes'
import { styled } from '@mui/styles'
import Footer from './Footer'

const Container = styled('div')(({ theme }) => ({
  flexGrow: 1,
  minHeight: '100vh',
  width: '100vw',
  margin: 0,
  padding: 0,
  zIndex: -1,
  background: theme.palette.grey[100]
}))

const Layout = ({ children }) => {
  const router = useRouter()
  const { pathname } = router
  return <Container>
    {pathname !== ROUTES.LOGIN && <Header />}
    {children}
    <Footer />
  </Container>
}

export default Layout
