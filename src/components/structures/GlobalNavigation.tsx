'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { PropsWithChildren, useState } from 'react'
import NavigationItemForm from '@/components/structures/NavigationItemForm'

// TODO needs to receive parent Navigation to be able to manipulate it
// and add navigation items

// TODO need to create a state provider that can render specific children
// to allow recursivnes
const GlobalNavigation = ({ children }: PropsWithChildren) => {
	const [navigation, setNavigation] = useState<INavigationItem[]>([])
	const [isAddNewItemOpen, setIsAddNewItemOpen] = useState(false)
	return (
		<Card className='w-4/5'>
			{children}
			<CardContent>
				{isAddNewItemOpen && (
					<NavigationItemForm
						setNavigation={setNavigation}
						onCancel={() => setIsAddNewItemOpen(false)}
					/>
				)}
			</CardContent>
			<CardContent className='bg-zinc-100'>
				<Button
					variant='outline'
					className='mt-6'
					onClick={() => setIsAddNewItemOpen(true)}
				>
					Dodaj pozycje menu
				</Button>
			</CardContent>
		</Card>
	)
}

export default GlobalNavigation
