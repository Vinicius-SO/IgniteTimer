import { FormContainer,TaskInput, MinutesAmountInput } from "./styles";
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm } from 'react-hook-form'


const newCycleFormValidationSchema = z.object({
    task: z.string().min(1,'Informe a tarefa'),
    minutesAmount: z.number()
    .min(1, 'O valor minimo de um cilo é de 5 minutos')
    .max(60, 'O valor maximo de um cilo é de 60 minutos')
})

type newCycleFormData = z.infer<typeof newCycleFormValidationSchema>

interface newCycleFormProps{
    activeCycle: any;
}

export function NewCycleForm({activeCycle}:any){
    
    const {register, handleSubmit, watch, reset} = useForm<newCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0
        }
    })
    
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