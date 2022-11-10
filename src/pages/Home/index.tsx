import { createContext, startTransition, useEffect, useState } from 'react'

import { Play, HandPalm } from "phosphor-react";
import { HomeContainer, StartCountdownButton, StopCountdownButton } from "./styles";




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

interface CycleContextType {
    activeCycle: Cycle | undefined;
    activeCycleId: string | null;
    markCurrentCycleAsFinished: () => void
}

export const CycleContext = createContext({} as CycleContextType)

export function Home(){

    const [ cycles, setCycles ] = useState<Cycle[]>([])
    const [ activeCycleId, setActiveCycleId ] = useState<string | null>(null)


    
    const activeCycle = cycles.find( cycle => cycle.id === activeCycleId )

    

    
    function handleInterruptCycle (){
        

        setActiveCycleId(null)
    }


    // console.log(activeCycle)


    const task = watch('task')
    const isSubmitDisabled = !task

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

                <CycleContext.Provider value={{ activeCycle, activeCycleId, markCurrentCycleAsFinished }}>
                    <NewCycleForm />
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