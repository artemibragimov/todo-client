import s from './createTaskForm.module.css'
import { SaveIcon } from '../../assets';
import Image from 'next/image'

interface CreateTaskFormType {
    activeFilter: string;
    setActiveFilter: (arg0: string) => void;
    name: string;
    ActiveIcon: React.FC<React.SVGProps<SVGAElement>>;
    Icon: React.FC<React.SVGProps<SVGAElement>>;
}

const CreateTaskForm = ({handleSubmit, onSubmit, register, errors, onClose}) => {

    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <input
                className={s.text_input}
                placeholder='Enter text'
                {...register("text", { required: true })}
            />

            {errors.text ? <div className={s.form_error}>This field should not be empty</div> : <div><br /></div>}

            <div className={s.form_btns}>
                <button className={s.submit_button + ' ' + s.form_buttons} type="submit">
                    <Image src='Check_ring.svg' alt='Save' width={30} height={30} />
                    <p>Save</p>

                </button>
                <button className={s.close_button + ' ' + s.form_buttons} onClick={onClose}>
                    <Image src='close.svg' alt='Close' width={30} height={30} />
                    <p>Close</p>
                </button>

            </div>
        </form>
    )
}

export { CreateTaskForm }