import styles from './Input.module.css';

interface Proptypes {
  label: string;
  name: string;
  id: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}

const Input = (props: Proptypes) => {
  const {
    label,
    name,
    id,
    type = 'text',
    placeholder,
    required = false,
  } = props;
  return (
    <label htmlFor={id} className={styles.label}>
      {label}
      <input
        type={type}
        id={id}
        className={styles.input}
        name={name}
        placeholder={placeholder}
        required={required}
      />
    </label>
  );
};

export default Input;
