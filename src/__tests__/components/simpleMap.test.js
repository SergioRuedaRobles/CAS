import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import 'regenerator-runtime/runtime';
import { render} from '@testing-library/react'
import SimpleMap from '../../components/SimpleMap'


describe('Test for alerta zona', () => {
    test('renders appropriately', () => {
        const {getByTestId} = render(<SimpleMap/>)
        expect(getByTestId('div1')).toBeInTheDocument()
        expect(getByTestId('div2')).toBeInTheDocument()
        expect(getByTestId('div3')).toBeInTheDocument()
    })
})