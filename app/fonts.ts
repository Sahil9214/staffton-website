import localFont from 'next/font/local'

export const plusJakartaSans = localFont({
  src: [
    {
      path: '../public/fonts/plus-jakarta-sans/PlusJakartaSans-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/plus-jakarta-sans/PlusJakartaSans-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/plus-jakarta-sans/PlusJakartaSans-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-plus-jakarta',
})

export const inter = localFont({
  src: [
    {
      path: '../public/fonts/inter/Inter_18pt-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/inter/Inter_18pt-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/inter/Inter_18pt-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-inter',
})

export const manrope = localFont({
  src: [
    {
      path: '../public/fonts/manrope/Manrope-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/manrope/Manrope-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/manrope/Manrope-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-manrope',
})