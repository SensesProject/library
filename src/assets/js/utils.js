// Function to make sentence from (author) array
export const chain = (a) => { return [a.slice(0, -1).join(', '), a.slice(-1)[0]].join(a.length < 2 ? '' : ' and ') }