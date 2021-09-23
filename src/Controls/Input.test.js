import React from 'react'
import {render,screen} from '@testing-library/react'
import Input from './Input.js'


describe('Input', () => {
    test('renders Input component,',() => {

        render(<Input />);
        
    })
});