import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render} from '@testing-library/react'
import NotFound from '../../components/NotFound'


describe('Test for NotFound', () => {
 test('renders appropriately', () => {
   const {getByTestId} = render(<NotFound />)
   expect(getByTestId('404')).toBeInTheDocument()
 })
})
