import { startTransition, useEffect, useState } from 'react'

import { Play, HandPalm } from "phosphor-react";
import { HomeContainer, StartCountdownButton, StopCountdownButton } from "./styles";


import { differenceInSeconds } from 'date-fns'


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

export function Home(){

    const [ cycles, setCycles ] = useState<Cycle[]>([])
    const [ activeCycleId, setActiveCycleId ] = useState<string | null>(null)

  

    
    const activeCycle = cycles.find( cycle => cycle.id === activeCycleId )

    

    
    function handleInterruptCycle (){
        setCycles(state => state.map(cycle=>{
            if (cycle.id === activeCycleId){
                return { ...cycle, interruptedDate: new Date()}
            }else{
                return cycle
            }
        }),
        )

        setActiveCycleId(null)
    }

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
                <NewCycleForm activeCycle={activeCycle}/>

                <Countdown activeCycle={activeCycle} setCycles={setCycles} activeCycleId={activeCycleId}/>

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