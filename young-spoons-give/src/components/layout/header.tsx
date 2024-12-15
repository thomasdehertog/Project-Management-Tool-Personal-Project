import React from 'react'
import CurrentUser from './current-user'

export const Header = () => {
  return (
    <div>
      <CurrentUser />
    </div>
  )
}

// Remove the default export and use named export instead