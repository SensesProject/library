'use strict'
import { getUrlToResources } from './utils.js'

const DEFAULTS = {
  title: 'Senses Project',
  description: 'The Senses Project make climate change scenarios more understandable through visualisation',
  type: 'website',
  card: 'summary_large_image',
  width: 1200,
  height: 630,
  image: getUrlToResources('share/og-toolkit.jpg')
}

const required = [
  { charset: 'utf-8' },
  { name: 'viewport', content: 'width=device-width, initial-scale=1' }
]

const favicon = [
  { rel: 'icon', href: getUrlToResources('favicon-192.png'), sizes: '192x192' },
  { rel: 'apple-touch-icon', href: getUrlToResources('favicon-192.png') },
  { rel: 'mask-icon', href: getUrlToResources('favicon.svg'), color: '#5263ff' }
]

const tags = [
  // Array: [attribute, path in object, name || property]
  // General
  [ 'description', 'description', 'name' ],
  // OpenGraph
  [ 'og:type', 'type', 'property' ],
  [ 'og:title', 'title', 'property' ],
  [ 'og:description', 'description', 'property' ],
  [ 'og:site_name', 'title', 'property' ],
  [ 'og:image', 'image', 'property' ],
  [ 'og:image:width', 'width', 'property' ],
  [ 'og:image:height', 'height', 'property' ],
  // Twitter
  [ 'twitter:card', 'card', 'name' ],
  [ 'twitter:title', 'title', 'name' ],
  [ 'twitter:description', 'description', 'name' ]
]

function getTags (settings = {}) {
  const arr = []
  tags.forEach(tag => {
    const [attr, path, key] = tag
    const value = settings[path]
    if (value) {
      arr.push({ hid: attr, [key]: attr, content: value })
    }
  })
  return arr
}

export const getHead = (custom = {}) => {
  const settings = Object.assign(DEFAULTS, custom)
  return {
    title: settings['title'],
    meta: [
      ...required,
      ...getTags(settings)
    ],
    link: [
      ...favicon
    ]
  }
}
