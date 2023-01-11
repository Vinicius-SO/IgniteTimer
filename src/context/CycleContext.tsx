import startOfMinute from "date-fns/startOfMinute";
import { createContext, ReactNode, useReducer, useState } from "react";
import { ActionTypes, Cycle, cyclesReducer } from "../reducers/cycles";


interface CreateCycleData {
    task:string
    minutesAmount: number
}

interface CycleContextType {
    cycles: Cycle[];
    activeCycle: Cycle | undefined;
    activeCycleId: string | null;
    amountSecondsPassed: number;
    markCurrentCycleAsFinished: () => void;
    setSecondsPassed: (seconds: number) => void;
    createNewCycle: (data: CreateCycleData) => void;
    interruptCurrentCycle : () => void;
}


export const CycleContext = createContext({} as CycleContextType)

export interface CycleContextProviderProps{
    children: ReactNode;
}

export function CycleContextProvider ({children}: CycleContextProviderProps){

    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

    const [ cyclesState, dispatch ] = useReducer(cyclesReducer,{
        cycles: [],
        activeCycleId: null,
    })
    
    const {cycles, activeCycleId } = cyclesState


    
    const activeCycle = cycles.find( cycle => cycle.id === activeCycleId )

    

    function markCurrentCycleAsFinished(){
        dispatch({
            type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED,
            payload:{
                activeCycleId,
            }
        })
    }

    
    function setSecondsPassed(seconds: number){
        setAmountSecondsPassed(seconds)
    }
    function interruptCurrentCycle() {
       
        dispatch({
            type: ActionTypes.INTERRUPT_NEW_CYCLE,
            payload: {
                activeCycleId
            }
        })
    }

    function createNewCycle(data:CreateCycleData){
        const id = String (new Date().getTime())

        const newCycle: Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date(),
        }

        dispatch({
            type: ActionTypes.ADD_NEW_CYCLE,
            payload: {
                newCycle
            }
        })

        // setCycles(state => [...state, newCycle])
        // setActiveCycleId(id)
        setAmountSecondsPassed(0)

    }
    return(
        <CycleContext.Provider value={{ cycles,activeCycle, activeCycleId, markCurrentCycleAsFinished, amountSecondsPassed, setSecondsPassed, interruptCurrentCycle, createNewCycle }}>
            {children}
        </CycleContext.Provider>
    )
}