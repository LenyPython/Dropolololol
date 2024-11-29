import DefaultView from '@/components/structures/DefaultView'
import Navigation from '@/components/components/Navigation'
import { useState } from 'react'

const Application = () => {
	const [isAddNewItemOpen, setIsAddNewItemOpen] = useState(false)
	const closeAddNewNavigationItemForm = () => setIsAddNewItemOpen(false)
	const openAddNewNavigationItemForm = () => setIsAddNewItemOpen(true)
	return (
		<div className='min-h-screen  bg-zinc-100 font-[family-name:var(--font-geist-sans)]'>
			<main className='flex flex-col w-[1200px] items-center gap-8 py-8 px-6 mx-auto'>
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
