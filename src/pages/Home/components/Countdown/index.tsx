import { CountdownContainer, Separator} from "./styles"
import { useEffect, useState } from 'react'

interface CountdownProps {
    activeCycle: any
    setCycles: any
    activeCycleId: any 
}


export function Countdown({activeCycle}:CountdownProps){
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
    
    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 8 

    useEffect(()=>{

        let interval: any
        if(activeCycle){
            interval = setInterval(() => {

                const secondsDifference = differenceInSeconds(
      
              new Date(), 
                    activeCycle.startDate
                )

                if(secondsDifference >= totalSeconds){
                    setCycles(state => state.map(cycle=>{
                        if (cycle.id === activeCycleId){
                            return { ...cycle, finishedDate: new Date()}
                        }else{
                            return cycle
                        }
                    }),
                    )

                    setAmountSecondsPassed(totalSeconds)

                    clearInterval(interval)
                }
                else{
                    setAmountSecondsPassed(secondsDifference)
                }
            }, 1000)
        }

        return () => {
            clearInterval(interval)
        }
    },[activeCycle, activeCycleId])


    return(
        <CountdownContainer>
            <span>{minutes[0]}</span>
            <span>{minutes[1]}</span>
            <Separator>:</Separator>
            <span>{seconds[0]}</span>
            <span>{seconds[1]}</span>
        </CountdownContainer>
    )
}