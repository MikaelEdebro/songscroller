export const getMinutesFromSeconds = seconds => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes < 10 ? '0' + minutes : minutes}:${
    remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds
  }`
}

export const getFontSize = song => {
  const defaultFontSize = 15
  if (!song) {
    return defaultFontSize
  }

  const fontSizeMatchingViewport = song.fontSizes.find(f => f.viewportWidth === window.innerWidth)
  return fontSizeMatchingViewport ? fontSizeMatchingViewport.fontSize : defaultFontSize
}
