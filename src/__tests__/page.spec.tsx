import {
  render,
  fireEvent,
  waitFor,
  getByLabelText,
} from '@testing-library/react'
import FormConsult from '../screens/home/components/formConsult'
import { consultStore } from '~/store/consult'
import { act } from 'react-dom/test-utils'

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      prefetch: () => null,
      push: jest.fn(),
    }
  },
}))

jest.mock('~/hooks/useSnackbarContext', () => ({
  useSnackbar: jest.fn(() => ({ showSnackbar: jest.fn() })),
}))

describe('FormConsult component', () => {
  it('renders without crashing', () => {
    render(<FormConsult brands={[]} />)
  })
})
