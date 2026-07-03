import React from 'react'

export const NavbarIcon = ({ href, name }: any) => {
  return (
    <li>
        <a 
        href={href} 
        className=""
        aria-current="page">
            {name}
        </a>
    </li>
  )
}