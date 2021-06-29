// useDebugValue: useMedia
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'

const formatCountDebugValue = ({query, state}) =>
  `\`${query}\` => ${state}` //we do not want to use it, only if it is for some optimisation, because only the devs will see it in the devtools...

function useMedia(query, initialState = false) {
  const [state, setState] = React.useState(initialState)
  React.useDebugValue({query, state}, formatCountDebugValue) //here is enough if we leave it like this, it will show the relevant info in the custom hook. it ONLY works in the custom hook, cannot put it anywhere else

  React.useEffect(() => {
    let mounted = true
    const mql = window.matchMedia(query)
    function onChange() {
      if (!mounted) {
        return
      }
      setState(Boolean(mql.matches))
    }

    mql.addListener(onChange)
    setState(mql.matches)

    return () => {
      mounted = false
      mql.removeListener(onChange)
    }
  }, [query])

  return state
}

function Box() {
  const isBig = useMedia('(min-width: 1000px)')
  const isMedium = useMedia('(max-width: 999px) and (min-width: 700px)')
  const isSmall = useMedia('(max-width: 699px)')
  const color = isBig ? 'green' : isMedium ? 'yellow' : isSmall ? 'red' : null

  return <div style={{width: 200, height: 200, backgroundColor: color}} />
}

function App() {
  return <Box />
}

export default App
