import s from './TaskForm.module.css';
import {SaveIcon, CloseIcon} from '../../assets';
import {useForm, SubmitHandler} from "react-hook-form";

interface TaskFormType {
    id?: number;
    name?: string;
    handleSubmitForm: (newName: string, id?: number) => void;
    toggle: (boolean: boolean) => void;
    formTitle: string;
}

type Inputs = {
    name: string,
};

const TaskForm = ({id, name, handleSubmitForm, toggle, formTitle}: TaskFormType) => {

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm<Inputs>({
        defaultValues: {
            name: name || ''
        }
    });

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        handleSubmitForm(data.name, id);
        toggle(false);
        reset({
            name: ''
        });
    };

    const onClickClose = () => {
        toggle(false);
        errors.name = undefined;
    };

    return (
        <div>
            <div className={s.formTitle}>
                {formTitle}
            </div>

            <form className={s.form} onSubmit={handleSubmit(onSubmit)}>

                <input
                    className={s.text_input}
                    placeholder='Enter text'
                    {...register("name", {required: true})}
                />

                {errors.name ? <div className={s.form_error}>This field should not be empty</div> : <div><br/></div>}

                <div className={s.btn_container}>
                    <button className={s.submit_button + ' ' + s.form_btn} type="submit">
                        <SaveIcon/>
                        <p>Save</p>
                    </button>

                    <button className={s.close_button + ' ' + s.form_btn} onClick={onClickClose}>
                        <CloseIcon/>
                        <p>Close</p>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TaskForm;