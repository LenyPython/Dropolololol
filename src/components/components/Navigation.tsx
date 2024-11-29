'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useState } from 'react'
import NavigationItemForm, {
	formType
} from '@/components/structures/NavigationItemForm'
import Subnavigation from '@/components/components/Subnavigation'
import {
	arrayMove,
	SortableContext,
	verticalListSortingStrategy
} from '@dnd-kit/sortable'
import {
	DndContext,
	useSensors,
	useSensor,
	PointerSensor,
	KeyboardSensor,
	MouseSensor,
	TouchSensor,
	DragEndEvent
} from '@dnd-kit/core'
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { createId } from '@/lib/utils'

type Props = {
	onClose: () => void
}

const Navigation: React.FC<Props> = ({ onClose }) => {
	const [navigation, setNavigation] = useState<string[]>([])
	const [isAddNewItemOpen, setIsAddNewItemOpen] = useState(false)
	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates
		}),
		useSensor(MouseSensor),
		useSensor(TouchSensor)
	)
	const onCancel = () => setIsAddNewItemOpen(false)
	const onSubmit = (values: formType) => {
		setNavigation(prev => [...prev, createId(values, 0)])
		onCancel()
	}
	const switchNavigationItemsPositions = (ev: DragEndEvent) => {
		const { active, over } = ev
		if (over === null) return
		if (active.id !== over.id) {
			setNavigation(prev => {
				const activeIdx = prev.findIndex(item => item === active.id)
				const newIdx = prev.findIndex(item => item === over.id)
				return arrayMove(prev, activeIdx, newIdx)
			})
		}
	}
	console.log(navigation)
	if (navigation.length === 0)
		return <NavigationItemForm onCancel={onClose} onSubmit={onSubmit} />
	return (
		<Card className='w-4/5'>
			<DndContext sensors={sensors} onDragEnd={switchNavigationItemsPositions}>
				<SortableContext
					items={navigation}
					strategy={verticalListSortingStrategy}
				>
					{navigation.map(item => {
						const [depth, nazwa, link] = item.split('-')
						return (
							<Subnavigation
								key={item}
								id={item}
								depth={Number(depth)}
								nazwa={nazwa}
								link={link}
								setNavigation={setNavigation}
							/>
						)
					})}
				</SortableContext>
			</DndContext>
			{isAddNewItemOpen && (
				<CardContent className='bg-zinc-50'>
					<NavigationItemForm onSubmit={onSubmit} onCancel={onCancel} />
				</CardContent>
			)}
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
