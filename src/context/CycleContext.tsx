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

interface CyclesState {
    cycles: Cycle[]
    activeCycleId: string | null
}

export function CycleContextProvider ({children}: CycleContextProviderProps){

    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

    const [ cyclesState, dispatch ] = useReducer((state:CyclesState, action:any)=>{
        
        switch(action.type){
            case 'ADD_NEW_CYCLE':
                return {
                    ...state,
                    cycles:[ ...state.cycles, action.payload.newCycle],
                    activeCycleId: action.payload.newCycle.id
                }
            case 'INTERRUPT_CURRENT_CYCLE':
                return{
                    ...state,
                    cycles: state.cycles.map((cycle) => {
                        if (cycle.id === state.activeCycleId) {
                        return { ...cycle, interruptedDate: new Date() }
                        } else {
                        return cycle
                        }
                    }),
                    activeCycleId: null
                }
            case 'MARK_CURRENT_CYCLE_AS_FINISHED':
                return{
                    ...state,
                    cycles: state.cycles.map((cycle) => {
                        if (cycle.id === state.activeCycleId) {
                        return { ...cycle, finishedDate: new Date() }
                        } else {
                        return cycle
                        }
                    }),
                    activeCycleId: null
                }
            default:
                return state
        }

    },{
        cycles: [],
        activeCycleId: null,
    })
    
    const {cycles, activeCycleId } = cyclesState


    
    const activeCycle = cycles.find( cycle => cycle.id === activeCycleId )

    

    function markCurrentCycleAsFinished(){
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
       
        dispatch({
            type: 'INTERRUPT_CURRENT_CYCLE',
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
            type: 'ADD_NEW_CYCLE',
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