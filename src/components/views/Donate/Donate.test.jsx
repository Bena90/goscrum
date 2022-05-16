import { Donate } from './Donate';
import { render, screen } from '@testing-library/react'

describe('renderizado en Donate', ()=>{

    it ('renderiza un h1', ()=>{
        render (<Donate/>)
    
        expect (screen.getByRole('heading', { level: 1, name: 'Colaborá con el proyecto' })).toBeInTheDocument()
    })
    
    it ('renderiza un a', ()=>{
        render (<Donate/>)
    
        expect (screen.getByRole('link')).toHaveAttribute(
            'href',
            'https://mpago.la/26Mp9gP'
        )
    })
})
