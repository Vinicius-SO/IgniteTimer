import { createContext, ReactNode, useState } from "react";
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

    const [ cycles, setCycles ] = useState<Cycle[]>([])
    const [ activeCycleId, setActiveCycleId ] = useState<string | null>(null)

    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
    
    const activeCycle = cycles.find( cycle => cycle.id === activeCycleId )

    

    function markCurrentCycleAsFinished(){
        setCycles(state => state.map(cycle=>{
            if (cycle.id === activeCycleId){
                setActiveCycleId(null)
                return { ...cycle, finishedDate: new Date()}
            }else{
                return cycle
            }
        }),
        )
    }

    
    function setSecondsPassed(seconds: number){
        setAmountSecondsPassed(seconds)
    }
    function interruptCurrentCycle() {
        setCycles((state) =>
        state.map((cycle) => {
            if (cycle.id === activeCycleId) {
            return { ...cycle, interruptedDate: new Date() }
            } else {
            return cycle
            }
        }),
        )
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

        setCycles(state => [...state, newCycle])
        setActiveCycleId(id)
        setAmountSecondsPassed(0)

    }
    return(
        <CycleContext.Provider value={{ cycles,activeCycle, activeCycleId, markCurrentCycleAsFinished, amountSecondsPassed, setSecondsPassed, interruptCurrentCycle, createNewCycle }}>
            {children}
        </CycleContext.Provider>
    )
}