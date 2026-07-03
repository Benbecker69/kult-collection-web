import React from 'react'
import { NavbarLink } from './navbar-link'
import { NavbarIcon } from './navbar-icon'
import Image from 'next/image'

export const Menu = () => {
  return (
        <nav className="fixed top-0 left-0 w-full">
            <div className="flex flex-wrap px-4 py-2.5 bg-bleuPrincipal items-center justify-between mx-auto max-w-360">
                    <Image src="/icons/logo.png" className="" alt="Logo" width={100} height={100} />    
                <div className="hidden w-full md:block md:w-auto" id="mobile-menu">
                    <ul className="flex flex-col p-4 mt-4 font-medium  md:flex-row md:space-x-8 md:mt-0">
                       <NavbarLink href="#" name="HomePage" /> 
                       <NavbarLink href="#" name="Collections" /> 
                       <NavbarLink href="#" name="catalogue" /> 
                       <NavbarLink href="#" name="espace entreprises" /> 
                       <NavbarLink href="#" name="contact" /> 
                    </ul>
                </div>
                
                       
                <div className="hidden w-full md:block md:w-auto" id="mobile-menu">
                    <ul className="flex flex-col  font-medium md:flex-row gap-2">

                       <Image src="/icons/loupe.png" alt="Icon 1" width={24} height={24} />
                       <Image src="/icons/profil.png" alt="Icon 1" width={24} height={24} />
                       <Image src="/icons/panier.png" alt="Icon 1" width={24} height={24} />
                        
                    </ul>
                </div>

            </div>
        </nav>
  )
}
