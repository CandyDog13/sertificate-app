import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
import styles from './ContactForm.module.css'; // Import the CSS Module

// Define the form data type
export interface IFormInput {
  name: string;
  phone: string;
  email: string;
  message: string;
}

interface IContactForm {
  escapeButton():void;
  submitClientData(data:IFormInput):void;
}

const ContactForm: React.FC<IContactForm> = ({escapeButton, submitClientData}) => {
  const [formData, setFormData] = useState<IFormInput>({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();

  // Handle form submission
  const onSubmit = (data: IFormInput) => {
    submitClientData(data);
    setFormData({
      name: '',
      phone: '',
      email: '',
      message: ''
    });

  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form_container}>
      <div className={styles.form_group}>
        <label htmlFor="name" className={styles.form_label}>ФИО *</label>
        <div className={styles.input_container}>
          <input
            id="name"
            placeholder='Иванов Иван Иванович'
            type="text"
            value={formData.name}
            className={`${styles.form_input} ${errors.name ? styles.input_error : ''}`}
            {...register('name', { required: 'Пожалуйста, заполните ФИО', onChange: handleChange})}
          />
          {errors.name && <p className={styles.error_message}>{errors.name.message}</p>}
        </div>
      </div>

      <div className={styles.form_group}>
        <label htmlFor="phone" className={styles.form_label}>Телефон *</label>
        <div className={styles.input_container}>
          <InputMask
            mask="+7 (999) 999-99-99"
            placeholder='+7 (___) ___-__-__'
            className={`${styles.form_input} ${errors.phone ? styles.input_error : ''}`}
            {...register('phone', { required: 'Пожалуйста, введите номер телефона', onChange: handleChange})}
          >
            {(inputProps: any) => (
              <input
                id="phone"
                type="text"
                {...inputProps}
                className={`${styles.form_input} ${errors.phone ? styles.input_error : ''}`}
              />
            )}
          </InputMask>
          {errors.phone && <p className={styles.error_message}>{errors.phone.message}</p>}
        </div>
      </div>

      <div className={styles.form_group}>
        <label htmlFor="email" className={styles.form_label}>Email *</label>
        <div className={styles.input_container}>
          <input
            id="email"
            type="email"
            placeholder='Введите email'
            className={`${styles.form_input} ${errors.email ? styles.input_error : ''}`}
            {...register('email', { required: 'Пожалуйста, введите email', onChange: handleChange })}
          />
          {errors.email && <p className={styles.error_message}>{errors.email.message}</p>}
        </div>
      </div>

      <div className={styles.form_group}>
        <label htmlFor="message" className={styles.form_label}>Message</label>
        <textarea
          id="message"
          placeholder='Введите комментарий к заказу, если он необходим'
          value={formData.message}
          className={styles.form_input}
          {...register('message', {onChange: handleChange})}
        ></textarea>
      </div>
      <div className={styles.buttons_box}>
      <button type="submit" className={styles.submit_button}>Оплатить</button>
      </div>
    </form>
    <button className={styles.submit_button} onClick={()=>escapeButton()}>Назад</button>
    </>
  );
};

export default ContactForm;
