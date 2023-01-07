import { FormContainer,TaskInput, MinutesAmountInput } from "./styles";
import {useContext} from 'react'
import { CycleContext } from '../../../../context/CycleContext';


import { useFormContext } from 'react-hook-form'

export function NewCycleForm(){
    
    const { activeCycle } = useContext(CycleContext)

    const { register } = useFormContext()
    
    return(
        <FormContainer>
            <label htmlFor="task">Vou trabalhar em</label>
            <TaskInput
                placeholder="Dê um nome para o seu projeto"
                id='task'
                type="text" 
                list="task-suggestions"
                disabled={!!activeCycle}
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
                step={1}             
                disabled={!!activeCycle}
            //  min={5}
            //  max={60}
                {...register('minutesAmount', { valueAsNumber: true})}
                />
            <span>minutos</span>
        </FormContainer>
    )
}