// Function to make sentence from (author) array
export const chain = (a) => { return [a.slice(0, -1).join(', '), a.slice(-1)[0]].join(a.length < 2 ? '' : ' and ') }

// Function to create a env / env var dependent url to static resources
export const getUrlToResources = (path, full) => {
  if (process.env.VUE_APP_STATIC_RESOURCES != null) return `${process.env.VUE_APP_STATIC_RESOURCES}/${path}`
  if (process.env.NODE_ENV === 'development') return `https://dev.climatescenarios.org/${path}`
  if (full) return `${location.origin}/${path}`
  return `/${path}`
}
