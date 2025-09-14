import type { ThemeConfig } from 'antd/es/config-provider/context'
import { theme } from 'antd'

const { defaultAlgorithm, darkAlgorithm } = theme

// Colors
const lightPrimary = '#FF9145' // Orange for light mode
const darkPrimary = '#1F2937'  // Deep gray for dark mode

// Utility for rgba opacity
const withOpacity = (hex: string, opacity: number) => {
  const bigint = parseInt(hex.replace('#', ''), 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255
  return `rgba(${r}, ${g}, ${b}, ${opacity})`
}

export const lightTheme: ThemeConfig = {
  token: {
    colorPrimary: lightPrimary,
    borderRadius: 8,
    colorBgContainer: '#fff'
  },
  components: {
    Layout: {
      headerBg: lightPrimary,
      footerBg: lightPrimary,
      footerPadding: '16px 50px',
      headerPadding: '0 20px',
      headerColor: '#fff'
    },
    Card: {
      colorBgContainer: withOpacity(lightPrimary, 0.15),
      colorBorder: withOpacity(lightPrimary, 0.15)
    },
    Table: {
      headerBg: withOpacity(lightPrimary, 0.15),
      headerColor: '#1F2937',
      headerSplitColor: withOpacity(lightPrimary, 0.15),
      cellPaddingBlock: 10
    },
    Segmented: {
      itemSelectedBg: lightPrimary,
      itemSelectedColor: '#fff',
      trackPadding: -4,
      trackBg: '#fff'
    }
  },
  algorithm: defaultAlgorithm
}

export const darkTheme: ThemeConfig = {
  token: {
    colorPrimary: darkPrimary,
    borderRadius: 8,
    colorBgContainer: '#111827' // Slightly darker container bg
  },
  components: {
    Layout: {
      headerBg: darkPrimary,
      footerBg: darkPrimary,
      footerPadding: '16px 50px',
      headerPadding: '0 20px',
      headerColor: '#fff'
    },
    Card: {
      colorBgContainer: withOpacity(darkPrimary, 0.05),
      colorBorder: withOpacity(darkPrimary, 0.15)
    },
    Table: {
      headerBg: withOpacity(darkPrimary, 0.05),
      headerColor: '#fff',
      headerSplitColor: withOpacity(darkPrimary, 0.15),
      cellPaddingBlock: 10
    },
    Segmented: {
      itemSelectedBg: darkPrimary,
      itemSelectedColor: '#fff',
      trackPadding: -4,
      trackBg: '#1F2937'
    }
  },
  algorithm: darkAlgorithm
}
