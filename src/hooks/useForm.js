// import React from 'react'
import { useState } from 'react'
// import { makeStyles } from "@material-ui/core";

export function useForm(modelObject) {

    const [values, setValues] = useState(modelObject);

    const handleInputChange = e => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
    }

    const resetForm = () => {
        setValues(modelObject);
    }

    return {
        values,
        setValues,
        handleInputChange,
        resetForm
    }
}
