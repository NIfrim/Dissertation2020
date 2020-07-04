function shutdown() {
  process.exit(0)
}

function getWords(array) {
  const pattern = /([A-Z])\w+/gi
  const altered = array.map(elem => {
    const wordsArr = elem.match(pattern).map(elem => elem.toLowerCase())
    return wordsArr
  })
  return altered.flat(1)
}

function getFirstLetters(string) {
  const wordsArr = getWords([string])
  const letters = wordsArr.map(elem => elem[0])

  return letters.join('')
}

function concatWords(array) {
  const together = array
    .map(elem => {
      elem += ''
      return elem.toLowerCase().replace(/\s/g, '')
    })
    .reduce((acc, current) => acc + current)

  return together
}

function isEmail(string) {
  const pattern = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
  if (!string.match(pattern)) {
    throw ValidationError('Email should match standard email patter.')
  } else {
    return true
  }
}

module.exports = {shutdown, getWords, getFirstLetters, concatWords, isEmail}
