import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import Application from '@/components/Application'

beforeEach(() => {
	render(<Application />)
})

describe('Application', () => {
	describe('test initial app state', () => {
		it('renders default view at start', () => {
			const header = screen.getByRole('heading', { level: 3 })
			expect(header).toBeInTheDocument()

			const para = screen.getByText('W tym menu nie ma jeszcze żadnych linków')
			expect(para).toBeInTheDocument()

			const button = screen.getByRole('button', { name: 'Dodaj pozycje menu' })
			expect(button).toBeInTheDocument()
		})
		it('button click open add new navigation item form', () => {
			const button = screen.getByRole('button', { name: 'Dodaj pozycje menu' })
			fireEvent.click(button)

			const cancelBtn = screen.getByRole('button', { name: 'Anuluj' })
			expect(cancelBtn).toBeInTheDocument()
			const addBtn = screen.getByRole('button', { name: 'Dodaj' })
			expect(addBtn).toBeInTheDocument()
		})
	})
	describe('test form sumbits', () => {
		const NAME = 'TestName'
		const LINK = 'http://link.com'
		beforeEach(() => {
			const button = screen.getByRole('button', { name: 'Dodaj pozycje menu' })
			fireEvent.click(button)
			const addBtn = screen.getByRole('button', { name: 'Dodaj' })
			const nameInput = screen.getByPlaceholderText('np. Promocje')
			fireEvent.change(nameInput, { target: { value: NAME } })
			const linkInput = screen.getByPlaceholderText('Wklej lub wyszukaj')
			fireEvent.change(linkInput, { target: { value: LINK } })
			fireEvent.click(addBtn)
		})
		it('adding items work', async () => {
			await waitFor(() => {
				const nameField = screen.getByText(NAME)
				expect(nameField).toBeInTheDocument()

				const linkField = screen.getByText(LINK)
				expect(linkField).toBeInTheDocument()

				const cancelBtn = screen.queryByRole('button', { name: 'Anuluj' })
				expect(cancelBtn).not.toBeInTheDocument()
			})
		})
		it('removing items work', async () => {
			await waitFor(() => {
				const removeBtn = screen.getByRole('menuitem', { name: 'Usuń' })
				fireEvent.click(removeBtn)

				const nameField = screen.queryByText(NAME)
				expect(nameField).not.toBeInTheDocument()

				const linkField = screen.queryByText(LINK)
				expect(linkField).not.toBeInTheDocument()
			})
		})
	})
})
