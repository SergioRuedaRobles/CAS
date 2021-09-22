import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render} from '@testing-library/react'
import AlertTomas from '../../components/AlertTomas';
import regeneratorRuntime from "regenerator-runtime";


describe('Test for alerta toma', () => {
    test('renders appropriately', () => {
    const {getByTestId} = render(<AlertTomas/>)
    expect(getByTestId('div1')).toBeInTheDocument()
    })
})