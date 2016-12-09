export const latestBlock = (time, timeBlocks, defaultValue) =>
  timeBlocks.filter(block => block.time <= time).reverse()[0] || defaultValue

export const load = (name) => {
  try {
    return JSON.parse(localStorage.getItem(name))
  } catch (err) {
    console.error('Failed to load from localStorage')
  }
}

export const save = (name, value) => {
  try {
    localStorage.setItem(name, JSON.stringify(value))
  } catch (err) {
    // Ignore write errors
  }
}
