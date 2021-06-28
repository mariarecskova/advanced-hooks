// useReducer: simple Counter
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'

const countReducer = (state, action) => ({...state, ...action })
//we combine the existing state with the action

//change the count by the step. we changed the count in the reducer because this became the 
//in extra 4 is with the classic reducer

function Counter({initialCount = 0, step = 1}) {
  const [state, setState] = React.useReducer(countReducer, {
    count: initialCount,
  })

  const { count } = state
  const increment = () => setState({count: count + step})


  return <button onClick={increment}>{count}</button>
}



function App() {
  return <Counter />
}

export default App
