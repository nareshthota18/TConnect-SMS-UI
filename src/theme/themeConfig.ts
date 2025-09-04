import type { ThemeConfig } from 'antd/es/config-provider/context'
import { theme } from 'antd' // Import the predefined algorithms

const { defaultAlgorithm, darkAlgorithm } = theme

export const lightTheme: ThemeConfig = {
  token: {
    colorPrimary: '#1F2937',
    borderRadius: 8
  },
  components: {
    Layout: {
      headerBg: '#1F2937',
      footerBg: '#1F2937',
      footerPadding: '16px 50px',
      headerPadding: '0 20px',
      },
      Segmented: {
        itemSelectedBg: '#1F2937',
        itemSelectedColor: '#fff',
        trackPadding: -4,
        trackBg: '#fff'
      },
  },
  algorithm: defaultAlgorithm
}

export const darkTheme: ThemeConfig = {
  token: {
    colorPrimary: '#111827',
    borderRadius: 8
  },
  components: {
    Layout: {
      headerBg: '#111827',
      footerBg: '#111827',
      footerPadding: '16px 50px',
      headerPadding: '0 20px',
      },
  },
  algorithm: darkAlgorithm
}
