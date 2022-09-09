import { HeaderContainer } from "./styles";

import { Timer, Scroll } from 'phosphor-react'
import LogoIgnite from '../../assets/Logo-ignite.svg'
import { NavLink } from "react-router-dom";

export function Header(){
 
    return (
        <HeaderContainer>
            <span><img src={LogoIgnite} alt="" /></span>
            <nav>
                <NavLink to="/" title="Timer">
                    <Timer size={24}/>
                </NavLink>

                <NavLink to="/history" title="Histórico">
                    <Scroll size={24}/>
                </NavLink>
            </nav>
        </HeaderContainer>
    )
}