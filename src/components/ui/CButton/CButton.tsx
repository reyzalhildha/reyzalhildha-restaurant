import styles from './CButton.module.css';

interface Proptypes {
  type?: 'button' | 'submit' | 'reset';
  children: string;
  onClick?: () => void;
  className?: string;
  color?: 'primary' | 'secondary' | 'success' | 'danger';
}

const CButton = (props: Proptypes) => {
  const { type = 'button', children, color = 'primary' } = props;
  return (
    <button
      className={`${styles.button} ${styles[`button-${color}`]}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};

export default CButton;
