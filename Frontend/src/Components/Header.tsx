import React from 'react'
import { Header } from 'antd/es/layout/layout'

const Header = () => {
  const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  height: 64,
  paddingInline: 48,
  lineHeight: '64px',
  backgroundColor: '#4096ff',
};
  return (
    <Header   >Header </Header>
  )
}

export default Header