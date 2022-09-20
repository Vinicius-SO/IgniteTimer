
import { Play } from "phosphor-react";
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountdownButton, TaskInput } from "./styles";
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { useForm } from 'react-hook-form'

const newCycleFormValidationSchema = z.object({
    task: z.string().min(1,'Informe a tarefa'),
    minutesAmount: z.number().min(5, 'O valor minimo de um cilo é de 5 minutos').max(60, 'O valor maximo de um cilo é de 60 minutos')
})

export function Home(){

    const {register, handleSubmit, watch, formState} = useForm({
        resolver: zodResolver(newCycleFormValidationSchema),
    })

    const task = watch('task')
    const isSubmitDisabled = !task

    function handleCreateNewCicle(data:any){
        console.log(data)
    }

    console.log(formState.errors)
   
    return(
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCicle)}>
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
                    //  min={5}
                    //  max={60}
                     {...register('minutesAmount', { valueAsNumber: true})}
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

                <StartCountdownButton type="submit" disabled={isSubmitDisabled} > <Play size={24}/> Começar</StartCountdownButton>
            </form>

        </HomeContainer>
    )
}