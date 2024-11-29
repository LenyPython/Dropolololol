import { INavigationItem } from '@/types'
import {
	DndContext,
	closestCenter,
	PointerSensor,
	useSensor,
	useSensors,
	DragEndEvent
} from '@dnd-kit/core'
import { arrayMove, SortableContext } from '@dnd-kit/sortable'
import { Dispatch, PropsWithChildren, SetStateAction } from 'react'

type Props = {
	setItems: Dispatch<SetStateAction<INavigationItem[]>>
	items: INavigationItem[]
}

const Dndprovider: React.FC<PropsWithChildren<Props>> = ({
	children,
	setItems,
	items
}) => {
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
	}
	return (
		<DndContext sensors={sensors} onDragEnd={handleDragEnd}>
			<SortableContext items={items}>{children}</SortableContext>
		</DndContext>
	)
}

export default Dndprovider
