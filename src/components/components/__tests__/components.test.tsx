import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import DefaultView from '../DefaultView'
import Navigation from '../Navigation'
import Subnavigation from '../Subnavigation'

describe('Component should consist of specific elements', () => {
	it('Default view should have proper elements', () => {
		render(<DefaultView onClick={() => {}} />)
		const header = screen.getByRole('heading', { level: 3 })
		expect(header).toBeInTheDocument()

		const para = screen.getByText('W tym menu nie ma jeszcze żadnych linków')
		expect(para).toBeInTheDocument()

		const button = screen.getByRole('button', { name: 'Dodaj pozycje menu' })
		expect(button).toBeInTheDocument()
	})
	it('Navigation should have proper elements', () => {
		render(<Navigation onCancel={() => {}} />)
		const nameInput = screen.getByPlaceholderText('np. Promocje')
		expect(nameInput).toBeInTheDocument()

		const linkInput = screen.getByPlaceholderText('Wklej lub wyszukaj')
		expect(linkInput).toBeInTheDocument()

		const buttonAdd = screen.getByRole('button', { name: 'Dodaj' })
		expect(buttonAdd).toBeInTheDocument()

		const buttonCancel = screen.getByRole('button', { name: 'Anuluj' })
		expect(buttonCancel).toBeInTheDocument()
	})
	it('Subnavigation should have proper elements', () => {
		const NAME = 'test-name'
		const LINK = 'http://test-link.com'
		render(
			<Subnavigation
				nazwa={NAME}
				link={LINK}
				id='test'
				setNavigation={() => {}}
			/>
		)
		const buttonEdit = screen.getByRole('menuitem', { name: 'Edytuj' })
		expect(buttonEdit).toBeInTheDocument()

		const buttonAdd = screen.getByRole('menuitem', {
			name: 'Dodaj Pozycje Menu'
		})
		expect(buttonAdd).toBeInTheDocument()

		const buttonDel = screen.getByRole('menuitem', { name: 'Usuń' })
		expect(buttonDel).toBeInTheDocument()

		const nameField = screen.getByText(NAME)
		expect(nameField).toBeInTheDocument()

		const linkField = screen.getByText(LINK)
		expect(linkField).toBeInTheDocument()
	})
})
