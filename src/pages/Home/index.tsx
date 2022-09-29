import { startTransition, useEffect, useState } from 'react'

import { Play } from "phosphor-react";
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountdownButton, TaskInput } from "./styles";
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { differenceInSeconds } from 'date-fns'


import { useForm } from 'react-hook-form'

const newCycleFormValidationSchema = z.object({
    task: z.string().min(1,'Informe a tarefa'),
    minutesAmount: z.number()
    .min(5, 'O valor minimo de um cilo é de 5 minutos')
    .max(60, 'O valor maximo de um cilo é de 60 minutos')
})

type newCycleFormData = z.infer<typeof newCycleFormValidationSchema>

interface Cycle {
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
}

export function Home(){

    const [ cycles, setCycles ] = useState<Cycle[]>([])
    const [ activeCycleId, setActiveCycleId ] = useState<string | null>(null)
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

    const {register, handleSubmit, watch, reset} = useForm<newCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0
        }
    })
    
    const activeCycle = cycles.find( cycle => cycle.id === activeCycleId )

    useEffect(()=>{

        let interval: number
        if(activeCycle){
            interval = setInterval(() => {
                setAmountSecondsPassed(differenceInSeconds(new Date(), activeCycle.startDate))
            }, 1000)
        }

        return () => {
            clearInterval(interval)
        }
    },[activeCycle])

    
    
    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 8 
    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

    const minutesAmount = Math.floor(currentSeconds / 60) 
    const secondsAmount = currentSeconds % 60
   
    const minutes = String(minutesAmount).padStart(2, '0')
    const seconds = String(secondsAmount).padStart(2, '0')

    // console.log(activeCycle)

    useEffect(()=>{
        if(activeCycle){
            document.title = `${minutes}:${seconds}` 
        }

    }, [minutes, seconds, activeCycle])

    const task = watch('task')
    const isSubmitDisabled = !task

    function handleCreateNewCicle(data:newCycleFormData){
        const id = String (new Date().getTime())

        const newCycle: Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date(),
        }

        setCycles(state => [...state, newCycle])
        setActiveCycleId(id)
        setAmountSecondsPassed(0)
        reset()
    }
   
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
                    <span>{minutes[0]}</span>
                    <span>{minutes[1]}</span>
                    <Separator>:</Separator>
                    <span>{seconds[0]}</span>
                    <span>{seconds[1]}</span>
                </CountdownContainer>

                <StartCountdownButton type="submit" disabled={isSubmitDisabled} > <Play size={24}/> Começar</StartCountdownButton>
            </form>

        </HomeContainer>
    )
}