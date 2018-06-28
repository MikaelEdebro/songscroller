export const updateObject = (oldObject, updatedValues) => {
  return {
    ...oldObject,
    ...updatedValues,
  }
}

export const getMinutesFromSeconds = seconds => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes < 10 ? '0' + minutes : minutes}:${
    remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds
  }`
}
