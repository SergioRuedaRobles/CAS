import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import 'regenerator-runtime/runtime';
import { render} from '@testing-library/react'
import Historial from '../../components/Historial'


describe('Test for alerta zona', () => {
    test('renders appropriately', () => {
        const {getByTestId} = render(<Historial/>)
        expect(getByTestId('div1')).toBeInTheDocument()
        expect(getByTestId('div2')).toBeInTheDocument()
        expect(getByTestId('div3')).toBeInTheDocument()
    })
})