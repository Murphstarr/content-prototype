import React from 'react'

/* takes a url and attempts to store it in the cache, returns true if the cache operation was
successful, false otherwise. */
export function CacheDocument (url) {
  return caches.open('favorites').then(function (cache) {
    const updateCache = fetch(url, { redirect: 'error' }).then(function (response) {
      if (!response.ok) {
        throw new TypeError('bad response status')
      }
      return cache.put(url, response)
    })
    return updateCache.then(function () {
      console.log('article was cached in favorites')
      caches.open('documents').then(function (cache) {
        cache.delete(url)
      })
      return true
    }).catch(function (error) {
      console.log('article was not cached in favorites. Reason: ', error)
      return false
    })
  })
}

// deletes a document from the cache if it exists
export function UncacheDocument (url) {
  caches.open('favorites').then(cache => {
    cache.delete(url)
  })
}

/* React hook used to store and retrieve values from localStorage.
used to maintain state variables across sessions */
export function UseStickyState (defaultValue, key) {
  const [value, setValue] = React.useState(() => {
    const stickyValue = window.localStorage.getItem(key)
    return stickyValue !== null
      ? JSON.parse(stickyValue)
      : defaultValue
  })
  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])
  return [value, setValue]
}

/* updates the graphQL query stored in the Cache */
export function UpdateQuery (timestampValue) {
  console.log('I am performing the update operation now')
  window.localStorage.setItem('Timestamp', timestampValue)
}

export async function GetTimestamp () {
  const cachedResponse = window.localStorage.getItem('Timestamp')
  console.log('calling GetTimestamp function')
  const response = await fetch('https://xiklt43x4fd7nmrzo5w4ox4xym.appsync-api.us-west-1.amazonaws.com/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/graphql', 'x-api-key': 'da2-aeaufq6rxzdfjmt7f73jn33glu' },
    body: JSON.stringify({
      query: 'query MyQuery{listTimestamps{items{id time}}}',
      variables: {}
    })
  }).then(res => res.json())
  const serverTimestamp = response.data.listTimestamps.items[0].time
  if (serverTimestamp > cachedResponse) {
    console.log('we need to perform an update')
    UpdateQuery(serverTimestamp)
  }
}
