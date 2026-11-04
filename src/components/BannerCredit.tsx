import config from '@/config'

import ImageCredit from './ImageCredit'

const hasBannerCredit = config.banner.enable && config.banner.credit.enable

/**
 * Banner image credit component.
 *
 * No hydration needed.
 */
export default () => {
  return (
    hasBannerCredit && (
      <ImageCredit
        url={config.banner.credit.url}
        text={config.banner.credit.text}
      />
    )
  )
}
