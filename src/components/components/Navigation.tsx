'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useState } from 'react'
import NavigationItemForm, {
	formType
} from '@/components/structures/NavigationItemForm'
import Subnavigation from './Subnavigation'
import { INavigationItem } from '@/types'
import { createId } from '@/lib/utils'
import Dndprovider from '@/providers/dndprovider'
type Props = {
	onCancel: () => void
}

const Navigation: React.FC<Props> = ({ onCancel }) => {
	const [navigation, setNavigation] = useState<INavigationItem[]>([])
	const [isAddNewItemOpen, setIsAddNewItemOpen] = useState(false)
	const closeAddNavigationItemForm = () => setIsAddNewItemOpen(false)
	const openAddNavigationItemForm = () => setIsAddNewItemOpen(true)
	const addNavigationItem = (values: formType) => {
		setNavigation(prev => [
			...prev,
			{ ...values, id: createId(values, navigation.length, 0) }
		])
		closeAddNavigationItemForm()
	}
	if (navigation.length === 0)
		return (
			<NavigationItemForm onSubmit={addNavigationItem} onCancel={onCancel} />
		)
	return (
		<Card className='w-4/5'>
			<Dndprovider setItems={setNavigation} items={navigation}>
				{navigation.map(item => (
					<Subnavigation
						key={item.id}
						{...item}
						setNavigation={setNavigation}
					/>
				))}
			</Dndprovider>
			<CardContent className='bg-zinc-50'>
				{isAddNewItemOpen && (
					<NavigationItemForm
						onSubmit={addNavigationItem}
						onCancel={closeAddNavigationItemForm}
					/>
				)}
			</CardContent>
			<CardContent className='bg-zinc-100'>
				<Button
					variant='outline'
					className='mt-6'
					onClick={openAddNavigationItemForm}
				>
					Dodaj pozycje menu
				</Button>
			</CardContent>
		</Card>
	)
}

export default Navigation
