import styled from 'styled-components'

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
    height: 100px;

    ${props => `background-color: ${buttonVariants[props.variant]}`}

`