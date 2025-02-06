import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        'ie-blue': {
          '50': '#6EF6FF',
          '100': '#59F5FF',
          '200': '#30F2FF',
          '300': '#08F0FF',
          '400': '#00D0DE',
          '500': '#00AAB5',
          '600': '#00757D',
          '700': '#004145',
          '800': '#000C0D',
          '900': '#000000',
          '950': '#000000'
        },
        'ie-pink': {
          '50': '#FBB9D4',
          '100': '#F9A6C8',
          '200': '#F77FB0',
          '300': '#F55998',
          '400': '#F23380',
          '500': '#ED0F69',
          '600': '#B80C52',
          '700': '#83083A',
          '800': '#4F0523',
          '900': '#1A020B',
          '950': '#000000'
        }
      }
    }
  }
}