import { ButtonPrimary } from 'components/ButtonPrimary/ButtonPrimary';
import s from './style.module.css'
import { PencilFill, TrashFill } from 'react-bootstrap-icons'
import { useState } from 'react';
import { validatorService } from 'services/form-validator';
import { FieldError } from 'components/FieldError/FieldError';

const VALIDATORS = {
    title: (value)=>{
      return validatorService.min(value,3)||validatorService.max(value,20);
    },
    content: (value)=>{
        return validatorService.min(value,3);
    }
}
export function NoteForm({
    isEditable=true,
    note,
    title, 
    onclickEdit, 
    onClickTrash, 
    onSubmit}){

    const [ formValues, setFormValues]=useState({title: note?.title || "", content: note?.content || ""});
    const [formErrors, setFormErrors]=useState({
        title: note?.title ? undefined: "", 
        content: note?.content ? undefined : "",})

    function hasError(){
       return Object.values(formErrors).some(error => error !== undefined)
    }
    function updateFormValues(e){
        setFormValues({...formValues, [e.target.name]: e.target.value});
        validate(e.target.name, e.target.value)
    }
    console.log("**", formValues);

    function validate(fieldName, fieldValue){
        setFormErrors({...formErrors, [fieldName]: VALIDATORS[fieldName](fieldValue)});
    }
    console.log("*+*", formErrors);
    const actionIcons = (<>
        <div className='col-1'>
            {onclickEdit && <PencilFill onClick={onclickEdit} className={s.icon} />}
        </div>
        <div className='col-1'>
            {onClickTrash && <TrashFill onClick={onClickTrash} className={s.icon} />}
        </div>
    </>)

    const titleInput = ( <div className='mb-5'>
        <label className='form-label'>Title</label>
        <input 
            onChange={updateFormValues} 
            type='text' 
            name='title' 
            className='form-control' 
            value={formValues.title}
        />
        <FieldError msg={formErrors.title} />
    </div>);

    const contentInput = (<div className='mb-5'>
        <label className='form-label'>Content</label>
        <textarea 
            onChange={updateFormValues} 
            type='text' 
            name='content' 
            className='form-control' 
            rows="5"
            value={formValues.content}
        >
        </textarea>
            <FieldError msg={formErrors.content} />
    </div>);

    const submitButton = (
        <div className={s.submit_btn}>
            <ButtonPrimary isDisabled={hasError()} onClick={()=> onSubmit(formValues)}>Submit</ButtonPrimary>
        </div>
    );

    return(
        <form className={s.container}>
            <div className='row justify-content-space-between'>
                <div className="col-10"><h2 className='mb-2'>{title}</h2></div>
                {actionIcons}
            </div>
            <div className={`mb-3 ${s.title_input_container}`}>{isEditable && titleInput}</div>
            <div className='mb-3'>{isEditable ? contentInput:<pre>{note.content}</pre>}</div>
            {onSubmit && submitButton}

        </form>
    )
}