import { toast } from 'react-toast';
import { FaSearch } from 'react-icons/fa';
import { useState } from 'react';
import styles from "./searchbar.module.scss"
import PropTypes from 'prop-types';

export const Searchbar = ({onSubmit}) => {

    const [search, setSearch] = useState('')

    const handleSearchChange = (e) => {
        setSearch(e.currentTarget.value.toLowerCase() )
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (search.trim() === '') {
            toast.error('Please input something');
        }
        onSubmit(search)
        setSearch('')
    }

    return (
        <header className={styles.header}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <button className={styles.btn} type="submit">
                    <FaSearch className={styles.btnLabel} />
                </button>

                <input className={styles.input}
                name="search"
                value={search}
                onChange={handleSearchChange}
                type="text"
                placeholder="Search images and photos"
                />
            </form>
        </header>
    )
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired
}