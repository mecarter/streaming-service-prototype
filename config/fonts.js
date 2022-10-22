import { Global } from '@emotion/react'

const Fonts = () => (
  <Global
    styles={`
      @font-face {
        font-family: 'Helvetica Neue';
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: url('/fonts/HelveticaNeueLTStd-Bd.otf') format('opentype');
      }
      @font-face {
        font-family: 'Helvetica Neue';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url('/fonts/HelveticaNeueLTStd-Roman.otf') format('opentype');
      }
      `}
  />
)

export default Fonts
