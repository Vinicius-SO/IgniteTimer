import { createContext, useState } from 'react'

import { Play, HandPalm } from "phosphor-react";
import { HomeContainer, StartCountdownButton, StopCountdownButton } from "./styles";


import * as z from 'zod';
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';


import { NewCycleForm } from './components/NewCycleForm';
import { Countdown } from './components/Countdown';

interface Cycle {
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interruptedDate?: Date,
    finishedDate?: Date
}

type newCycleFormData = z.infer<typeof newCycleFormValidationSchema>

interface CycleContextType {
    activeCycle: Cycle | undefined;
    activeCycleId: string | null;
    amountSecondsPassed: number;
    markCurrentCycleAsFinished: () => void;
    setSecondsPassed: (seconds: number) => void;
}

const newCycleFormValidationSchema = z.object({
    task: z.string().min(1,'Informe a tarefa'),
    minutesAmount: z.number()
    .min(1, 'O valor minimo de um cilo é de 5 minutos')
    .max(60, 'O valor maximo de um cilo é de 60 minutos')
})

export const CycleContext = createContext({} as CycleContextType)

export function Home(){

    const [ cycles, setCycles ] = useState<Cycle[]>([])
    const [ activeCycleId, setActiveCycleId ] = useState<string | null>(null)

    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
    
    const activeCycle = cycles.find( cycle => cycle.id === activeCycleId )

    const newCycleForm = useForm<newCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0
        }
    })

    const { handleSubmit, watch, reset} = newCycleForm
    
    function handleInterruptCycle (){
        

        setActiveCycleId(null)
    }


    // console.log(activeCycle)


    const task = watch('task')
    const isSubmitDisabled = !task


    function setSecondsPassed(seconds: number){
        setAmountSecondsPassed(seconds)
    }

    function markCurrentCycleAsFinished(){
        setCycles(state => state.map(cycle=>{
            if (cycle.id === activeCycleId){
                return { ...cycle, interruptedDate: new Date()}
            }else{
                return cycle
            }
        }),
        )
    }

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

                <CycleContext.Provider value={{ activeCycle, activeCycleId, markCurrentCycleAsFinished, amountSecondsPassed, setSecondsPassed }}>
                    <FormProvider {...newCycleForm}>
                        <NewCycleForm />
                    </FormProvider>
                    <Countdown />
                </CycleContext.Provider>

                {activeCycle ? (
                    <StopCountdownButton onClick={handleInterruptCycle} type="button" >
                         <HandPalm size={24}/>
                          Interromper
                    </StopCountdownButton>

                ):(
                    <StartCountdownButton type="submit" disabled={isSubmitDisabled} > <Play size={24}/> Começar</StartCountdownButton>

                ) }
            </form>

        </HomeContainer>
    )
}