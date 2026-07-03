import React from 'react'

export const NavbarLink = ({ href, name }: any) => {
  return (
    <li>
        <a 
        href={href} 
        className="text-white capitalize"
        aria-current="page">
            {name}
        </a>
    </li>
  )
}
