import React from 'react'
import {render,screen} from '@testing-library/react'
import Button from './Button.js'


describe('Button', () => {
    test('renders Button component,',() => {
        render(<Button/>); 
    })
});