import { useState } from 'react'

import { Play } from "phosphor-react";
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountdownButton, TaskInput } from "./styles";

import { useForm } from 'react-hook-form'


export function Home(){

    const {register, handleSubmit, watch} = useForm()

    const task = watch('task')

    const isSubmitDisabled = !task

    const handleCreateNewClicle = (data:any)=>{
        console.log(data)
    }
    return(
        <HomeContainer>
            <form action="" onSubmit={(handleSubmit(handleCreateNewClicle))}>
                <FormContainer>
                    <label htmlFor="task">Vou trabalhar em</label>
                    <TaskInput
                      placeholder="Dê um nome para o seu projeto"
                      id='task'
                      type="text" 
                      list="task-suggestions"
                      {...register('task')}
                    />

                    <datalist id="task-suggestions">
                        <option value="Projeto 1"></option>
                        <option value="Projeto 2"></option>
                        <option value="Projeto 3"></option>
                        <option value="Fazer doideras"></option>
                    </datalist>

                    <label htmlFor="minutesAmount">durante</label>
                    <MinutesAmountInput
                     placeholder="00"
                     type="number"
                     id="minutesAmount"
                     step={5}
                     min={5}
                     max={60}
                     {...register('minutesAmount', {valueAsNumber : true})}

                     />
                    <span>minutos</span>
                </FormContainer>
                <CountdownContainer>
                    <span>0</span>
                    <span>0</span>
                    <Separator>:</Separator>
                    <span>0</span>
                    <span>0</span>
                </CountdownContainer>

                <StartCountdownButton type="submit" disabled={isSubmitDisabled}> <Play size={24}/> Começar</StartCountdownButton>
            </form>

        </HomeContainer>
    )
}