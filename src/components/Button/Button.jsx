import styles from './button.module.scss';
import PropTypes from 'prop-types';

export const Button = ({onClick}) => {
    return (
        <button className={styles.btn} type="button" onClick={onClick}>Load more</button>
    ) 
}

Button.propTypes = {
    onClick: PropTypes.func.isRequired
}