export const isElementVisibleByDisplay = element => {
  let style = window.getComputedStyle(element)
  if (style.display == 'none') {
    return false
  } else {
    return true
  }
}

export const isElementVisibleByClientRects = element => {
  if (element.offsetWidth || element.offsetHeight || element.getClientRects().length) {
    return true
  } else {
    return false
  }
}

export const arrayToMap = (arr, keyName) => {
  let map = new Map()

  arr.forEach(obj => {
    let key = obj[keyName]
    if (map.has(key)) {
      let value = map.get(key)
      value instanceof Array ? value.push(obj) : map.set(key, [value, obj])
    } else {
      map.set(key, obj)
    }
  })

  return map
}
