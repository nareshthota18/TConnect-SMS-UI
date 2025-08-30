import type { ThemeConfig } from 'antd/es/config-provider/context'
import { theme } from 'antd' // Import the predefined algorithms

const { defaultAlgorithm, darkAlgorithm } = theme

export const lightTheme: ThemeConfig = {
  token: {
    colorPrimary: '#5b201a',
    borderRadius: 8
  },
  components: {
    Layout: {
      headerBg: '#878672',
      footerBg: '#878672',
      footerPadding: '16px 50px',
      headerPadding: '0 20px',
      },
    Menu: {
      // itemColor: '#ffffff',
    }
  },
  algorithm: defaultAlgorithm
}

export const darkTheme: ThemeConfig = {
  token: {
    colorPrimary: '#13c2c2',
    borderRadius: 8
  },
  algorithm: darkAlgorithm
}
