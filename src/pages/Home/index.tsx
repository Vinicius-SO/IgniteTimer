import { useContext } from 'react'

import { Play, HandPalm } from "phosphor-react";
import { HomeContainer, StartCountdownButton, StopCountdownButton } from "./styles";


import * as z from 'zod';
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';


import { NewCycleForm } from './components/NewCycleForm';
import { Countdown } from './components/Countdown';
import { CycleContext } from '../../context/CycleContext';

export interface Cycle {
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interruptedDate?: Date,
    finishedDate?: Date
}

type newCycleFormData = z.infer<typeof newCycleFormValidationSchema>



const newCycleFormValidationSchema = z.object({
    task: z.string().min(1,'Informe a tarefa'),
    minutesAmount: z.number()
    .min(1, 'O valor minimo de um cilo é de 5 minutos')
    .max(60, 'O valor maximo de um cilo é de 60 minutos')
})


export function Home(){

    const {createNewCycle, interruptCurrentCycle, activeCycle} = useContext(CycleContext)

    const newCycleForm = useForm<newCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0
        }
    })

    const handleCreateNewcycle = (data: newCycleFormData)=>{
        createNewCycle(data);
        reset();
    }

    const { handleSubmit, watch , reset } = newCycleForm;
    
    
    const task = watch('task')
    const isSubmitDisabled = !task

    
    
    return(
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewcycle)}>

                    <FormProvider {...newCycleForm}>
                        <NewCycleForm />
                    </FormProvider>
                    <Countdown />
                {/* </CycleContext.Provider> */}

                {activeCycle ? (
                    <StopCountdownButton onClick={interruptCurrentCycle} type="button" >
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