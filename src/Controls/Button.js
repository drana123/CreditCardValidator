import React from 'react'
import { Button as MuiButton } from "@material-ui/core";
import { getByTestId } from '@testing-library/dom';

export default function Button(props) {

    const { id, text, color, variant, onClick } = props

    return (
        <MuiButton
            variant={variant || "contained"}
            color={color || "primary"}
            onClick={onClick}
            data-testid = {id}>
            {text}
        </MuiButton>
    )
}