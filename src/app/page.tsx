'use client'

import DefaultView from '@/components/structures/DefaultView'
import Navigation from '@/components/structures/Navigation'
import NavigationItem from '@/components/structures/Subnavigation'
import NavigationItemForm from '@/components/structures/NavigationItemForm'
import { useState } from 'react'

export default function Home() {
	const [isAddNewItemOpen, setIsAddNewItemOpen] = useState(false)
	const onClose = () => setIsAddNewItemOpen(false)
	return (
		<div className='min-h-screen w-full bg-zinc-100 font-[family-name:var(--font-geist-sans)]'>
			<main className='flex flex-col items-center gap-8 pt-10'>
				{isAddNewItemOpen ? (
					<Navigation onClose={onClose} />
				) : (
					<DefaultView onClick={() => setIsAddNewItemOpen(true)} />
				)}
			</main>
		</div>
	)
}
