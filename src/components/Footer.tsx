// src/components/Footer.tsx
import { Layout } from 'antd'

const { Footer: AntFooter } = Layout

const Footer = () => {
  return (
    <AntFooter
      style={{
        textAlign: 'center',
      }}
    >
      © {new Date().getFullYear()} Your Company Name. All Rights Reserved.
    </AntFooter>
  )
}

export default Footer
