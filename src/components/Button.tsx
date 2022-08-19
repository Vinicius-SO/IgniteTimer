import React from "react";
import { ButtonContainer, buttonVariant } from "./Button.styles";

interface ButtonProps {
     variant?: buttonVariant
}

export function Button({ variant = "primary" }:ButtonProps){
    return (
        <ButtonContainer variant={variant}>Enviar</ButtonContainer>
    )
}