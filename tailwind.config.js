/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ['Pretendard', 'sans-serif'],
        iropke: ['Iropke', 'serif'],
      },
      colors: {
        'var-black-100': '#F9F9F9',
        'var-black-200': '#6B6B6B',
        'var-black-300': '#5E5E5E',
        'var-black-400': '#525252',
        'var-black-500': '#454545',
        'var-black-600': '#373737',
        'var-black-700': '#2B2B2B',
        'var-black-800': '#1F1F1F',
        'var-black-900': '#121212',
        'var-black-950': '#050505',
        'var-gray-100': '#DEDEDE',
        'var-gray-150': '#D7D7D7',
        'var-gray-200': '#C4C4C4',
        'var-gray-300': '#ABABAB',
        'var-gray-400': '#919191',
        'var-blue-100': '#FFFFFF',
        'var-blue-200': '#ECEFF4',
        'var-blue-300': '#CBD3E1',
        'var-blue-400': '#ABB8CE',
        'var-blue-500': '#8B9DBC',
        'var-blue-600': '#6A82A9',
        'var-blue-700': '#52698E',
        'var-blue-800': '#40516E',
        'var-blue-900': '#2D394E',
        'var-blue-950': '#1A212D',
        'var-illust-yellow': '#FBC85B',
        'var-illust-green': '#48BB98',
        'var-illust-purple': '#8E80E3',
        'var-illust-blue': '#5195EE',
        'var-illust-red': '#E46E80',
        'var-illust-brown': '#9A695E',
        'var-illust-sub-yellow': '#E8AA26',
        'var-illust-sub-blue-1': '#3E3E3E',
        'var-illust-sub-blue-2': '#3E414D',
        'var-illust-sub-blue-3': '#494D59',
        'var-illust-sub-gray-1': '#C7D1E0',
        'var-illust-sub-gray-2': '#E3E9F1',
        'var-illust-sub-gray-3': '#EFF3F8',
        'var-background': '#F5F7FA',
        'var-error': '#FF6577',
        'var-line-100': '#F2F2F2',
        'var-line-200': '#CFDBEA',
      },
      screens: {
        sm: '768px', // mobile
        md: '1024px', // tablet
      },
      keyframes: {
        progress: {
          '0%': { width: '100%' },
          '100%': { width: '0%' },
        },
        slideIn: {
          '0%': {
            transform: 'translateY(20px)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '1',
          },
        },
        slideOut: {
          '0%': {
            transform: 'translateY(0)',
            opacity: '1',
          },
          '100%': {
            transform: 'translateY(20px)',
            opacity: '0',
          },
        },
      },
      boxShadow: {
        custom: '0px 3px 12px 0px rgba(0, 0, 0, 0.04)',
        hover: '0px 3px 12px 0px rgba(0, 0, 0, 0.1)',
        big: '0px 0px 36px 0px rgba(0, 0, 0, 0.05)',
      },
      animation: {
        progress: 'progress 3s linear',
        slideIn: 'slideIn 0.3s ease-out',
        slideOut: 'slideOut 0.3s ease-in',
      },
    },
  },
};
