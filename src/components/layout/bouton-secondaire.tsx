import React from 'react'
type ButtonSecondaireProps = {
  href: string;
  name: string;
};

export const ButtonSecondaire = ({ href, name }: ButtonSecondaireProps) => {
  return (

    
    <span className="rounded-full font-Manrope bg-rosePastel text-bleuPrincipal px-4 py-1">
        <a href={href} className='font-bold leading-none tracking-normal'>
            {name}
        </a>
    </span>
  )
}