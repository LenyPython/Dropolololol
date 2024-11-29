import DefaultView from '@/components/structures/DefaultView'
import Navigation from '@/components/components/Navigation'
import { useState } from 'react'

const Application = () => {
	const [isAddNewItemOpen, setIsAddNewItemOpen] = useState(false)
	const closeAddNewNavigationItemForm = () => setIsAddNewItemOpen(false)
	const openAddNewNavigationItemForm = () => setIsAddNewItemOpen(true)
	return (
		<div className='min-h-screen w-full bg-zinc-100 font-[family-name:var(--font-geist-sans)]'>
			<main className='flex flex-col items-center gap-8 pt-10'>
				{isAddNewItemOpen ? (
					<Navigation onCancel={closeAddNewNavigationItemForm} />
				) : (
					<DefaultView onClick={openAddNewNavigationItemForm} />
				)}
			</main>
		</div>
	)
}

export default Application
