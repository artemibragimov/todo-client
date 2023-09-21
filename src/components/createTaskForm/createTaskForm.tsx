import s from './createTaskForm.module.css'
import { SaveIcon, CloseIcon } from '../../assets';
import { useForm, SubmitHandler } from "react-hook-form";

interface CreateTaskFormType {
    tasks: Array<{ id: Number, isDone: Boolean, name: String, date: String }>
    toggle: () => void;
}

type Inputs = {
    text: string,
};

const CreateTaskForm = ({ tasks, toggle }: CreateTaskFormType) => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm<Inputs>({
        defaultValues: {
            text: ''
        }
    });

    const onSubmit: SubmitHandler<Inputs> = data => {
        const newTask = {
            id: tasks.length + 1,
            isDone: false,
            name: data.text,
            date: ''
        };

        tasks.push(newTask);
        reset({
            text: ''
        });
        toggle();
    };

    const onClick = () => {
        toggle();
        errors.text = undefined;
    };

    return (
        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>

            <input
                className={s.text_input}
                placeholder='Enter text'
                {...register("text", { required: true })}
            />

            {errors.text ? <div className={s.form_error}>This field should not be empty</div> : <div><br /></div>}

            <div className={s.btn_container}>

                <button className={s.submit_button + ' ' + s.form_btn} type="submit">
                    <SaveIcon/>
                    <p>Save</p>
                </button>

                <button className={s.close_button + ' ' + s.form_btn} onClick={onClick}>
                    <CloseIcon />
                    <p>Close</p>
                </button>
                
            </div>
        </form>
    )
}

export { CreateTaskForm }