import NavigationItem from '@/components/structures/NavigationItem'
import { CardContent } from '@/components/ui/card'
import { INavigationItem } from '@/types'
import {
	DndContext,
	closestCenter,
	PointerSensor,
	useSensor,
	useSensors,
	DragEndEvent,
	DragOverlay,
	DragStartEvent
} from '@dnd-kit/core'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import {
	arrayMove,
	SortableContext,
	verticalListSortingStrategy
} from '@dnd-kit/sortable'
import { Dispatch, PropsWithChildren, SetStateAction, useState } from 'react'

type Props = {
	setItems: Dispatch<SetStateAction<INavigationItem[]>>
	items: INavigationItem[]
}

const Dndprovider: React.FC<PropsWithChildren<Props>> = ({
	children,
	setItems,
	items
}) => {
	const [isDragging, setIsDragging] = useState<string | null>(null)
	const sensors = useSensors(useSensor(PointerSensor))

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event
		if (over === null) return
		if (active.id !== over.id) {
			setItems(items => {
				const oldIndex = items.findIndex(item => item.id === active.id)
				const newIndex = items.findIndex(item => item.id === over.id)

				return arrayMove(items, oldIndex, newIndex)
			})
		}
		setIsDragging(null)
	}
	const handleDragStart = (event: DragStartEvent) => {
		setIsDragging(event.active.id as string)
	}
	return (
		<DndContext
			sensors={sensors}
			onDragStart={handleDragStart}
			onDragEnd={handleDragEnd}
			collisionDetection={closestCenter}
			modifiers={[restrictToVerticalAxis]}
		>
			<SortableContext items={items} strategy={verticalListSortingStrategy}>
				{children}
			</SortableContext>
			<DragOverlay className='z-50'>
				{isDragging && (
					<CardContent className='flex items-center justify-between bg-white border w-full p-0 pr-6'>
						<NavigationItem
							{...(items.find(
								item => item.id === isDragging
							) as INavigationItem)}
							handlers={{}}
						/>
					</CardContent>
				)}
			</DragOverlay>
		</DndContext>
	)
}

export default Dndprovider
