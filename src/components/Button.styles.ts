import styled, {css} from 'styled-components'

export type buttonVariant = 'primary' | 'secondary' | 'danger' | 'success'


interface ButtonContainerProps {
    variant: buttonVariant
}

const buttonVariants = {
    primary: 'purple',
    secondary: 'orange',
    danger: 'purredple',
    success: 'green'
}


export const ButtonContainer = styled.button<ButtonContainerProps>`
    width: 100px;
    height: 40px;
    border-radius: 4px;
    border: 0;
    margin: 8px;

    background: ${props=> props.theme.primary};
    color: ${props => props.theme.secondary}
`