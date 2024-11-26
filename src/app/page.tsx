'use client'

import DefaultView from '@/components/structures/DefaultView'
import GlobalNavigation from '@/components/structures/GlobalNavigation'
import NavigationItem from '@/components/structures/NavigationItem'
import NavigationItemForm from '@/components/structures/NavigationItemForm'
import { useState } from 'react'

export default function Home() {
	const [navigation, setNavigation] = useState<INavigationItem[]>([])
	const [isAddNewItemOpen, setIsAddNewItemOpen] = useState(false)
	return (
		<div className='min-h-screen w-full bg-zinc-100 font-[family-name:var(--font-geist-sans)]'>
			<main className='flex flex-col items-center gap-8 pt-10'>
				{navigation.length === 0 && !isAddNewItemOpen && (
					<DefaultView onClick={() => setIsAddNewItemOpen(true)} />
				)}
				{isAddNewItemOpen && (
					<NavigationItemForm
						setNavigation={setNavigation}
						onCancel={() => setIsAddNewItemOpen(false)}
					/>
				)}
				{navigation.length > 0 && (
					<GlobalNavigation>
						{navigation.map((item, idx) => (
							<NavigationItem
								key={`navitem-${item.nazwa}-${idx}`}
								{...item}
								setNavigation={setNavigation}
							/>
						))}
					</GlobalNavigation>
				)}
			</main>
		</div>
	)
}
