'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useState } from 'react'
import NavigationItemForm, {
	formType
} from '@/components/structures/NavigationItemForm'
import Subnavigation from './Subnavigation'
import { INavigationItem } from '@/types'

// TODO rethink strategy of deletion of multiple fields

// TODO check delete
// TODO allow edition through forms
type Props = {
	onClose: () => void
}
const Navigation: React.FC<Props> = ({ onClose }) => {
	const [navigation, setNavigation] = useState<INavigationItem[]>([])
	const [isAddNewItemOpen, setIsAddNewItemOpen] = useState(false)
	const onCancel = () => setIsAddNewItemOpen(false)
	const onSubmit = (values: formType) => {
		setNavigation(prev => [...prev, values])
		onCancel()
	}
	const onDelete = (toDelete: formType) => {
		setNavigation(prev =>
			prev.filter(
				item => item.nazwa !== toDelete.nazwa && item.link !== toDelete.link
			)
		)
		onCancel()
	}
	if (navigation.length === 0)
		return <NavigationItemForm onCancel={onClose} onSubmit={onSubmit} />
	return (
		<Card className='w-4/5'>
			{navigation.map(item => (
				<Subnavigation
					key={`subnav-${item.nazwa}-${item.link}`}
					{...item}
					setNavigation={setNavigation}
				/>
			))}
			<CardContent className='bg-zinc-50'>
				{isAddNewItemOpen && (
					<NavigationItemForm
						onSubmit={onSubmit}
						onDelete={onDelete}
						onCancel={onCancel}
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

export default Navigation
