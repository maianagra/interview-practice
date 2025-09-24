import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Counter from './Counter'

describe('Counter Component', () => {
  it('renders default count', () => {
    render(<Counter step={1}/>)
    expect(screen.getByTestId('count')).toHaveTextContent('0') // ✅ works now
  })

  it('increments count by the specified step prop', () => {
    render(<Counter step={3}/>)
    fireEvent.click(screen.getByText('Increment'))
    expect(screen.getByTestId('count')).toHaveTextContent('3')
  })

  it('decrements count by the specified step prop', () => {
    render(<Counter step={5}/>)
    fireEvent.click(screen.getByText('Decrement'))
    expect(screen.getByTestId('count')).toHaveTextContent('-5')
  })
})
