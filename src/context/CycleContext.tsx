import startOfMinute from "date-fns/startOfMinute";
import { createContext, ReactNode, useReducer, useState } from "react";
import { Cycle } from "../pages/Home";


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

    const [ cycles, dispatch ] = useReducer((state:Cycle[], action:any)=>{
        
        if(action.type === 'ADD_NEW_CYCLE'){
            return [...state, action.payload.newCycle]
        }

        return state
    },[])
    const [ activeCycleId, setActiveCycleId ] = useState<string | null>(null)

    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
    
    const activeCycle = cycles.find( cycle => cycle.id === activeCycleId )

    

    function markCurrentCycleAsFinished(){
        // setCycles(state => state.map(cycle=>{
        //     if (cycle.id === activeCycleId){
        //         setActiveCycleId(null)
        //         return { ...cycle, finishedDate: new Date()}
        //     }else{
        //         return cycle
        //     }
        // }),
        // )
        dispatch({
            type:'MARK_CURRENT_CYCLE_AS_FINISHED',
            payload:{
                activeCycleId,
            }
        })
    }

    
    function setSecondsPassed(seconds: number){
        setAmountSecondsPassed(seconds)
    }
    function interruptCurrentCycle() {
        // setCycles((state) =>
        // state.map((cycle) => {
        //     if (cycle.id === activeCycleId) {
        //     return { ...cycle, interruptedDate: new Date() }
        //     } else {
        //     return cycle
        //     }
        // }),
        // )

        dispatch({
            type: 'INTERRUPT_CURRENT_CYCLE',
            payload: {
                activeCycleId
            }
        })
        setActiveCycleId(null)
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
            type: 'ADD_NEW_CYCLE',
            payload: {
                newCycle
            }
        })

        // setCycles(state => [...state, newCycle])
        setActiveCycleId(id)
        setAmountSecondsPassed(0)

    }
    return(
        <CycleContext.Provider value={{ cycles,activeCycle, activeCycleId, markCurrentCycleAsFinished, amountSecondsPassed, setSecondsPassed, interruptCurrentCycle, createNewCycle }}>
            {children}
        </CycleContext.Provider>
    )
}