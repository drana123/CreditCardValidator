import React from "react";
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import {Form} from './Form'
describe("Form component tests", () => {
    test("Form rendering", () => {
        const handleSubmit = jest.fn();
        render(<Form onSubmit={handleSubmit} />)

    });
});