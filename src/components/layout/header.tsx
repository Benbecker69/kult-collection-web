import React from 'react'
import { ButtonPrincipal } from './boutton-principal'
import { ButtonSecondaire } from './bouton-secondaire'

export const Header = () => {
  return (
    <div className=" h-full p-10 flex items-center justify-between gap-4">
        <div className=''>
        <p className="flex flex-col font-kinetica font-[850] text-[48px] tracking-normal">
            <span>Votre quotidien</span>
            <span>transformé en art de</span>
            <span>vivre.</span>
        </p>
          <div className='flex gap-4'> 
           <ButtonPrincipal href='#' name='Découvrir les collections' />
            <ButtonSecondaire href='#' name='Propositions entreprise' />
        </div>
        </div>
        
    </div>
  )
}
