export const latestBlock = (time, timeBlocks, defaultValue) =>
  timeBlocks.filter(block => block.time <= time).reverse()[0] || defaultValue
