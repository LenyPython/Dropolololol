import { v4 as uuidv4 } from 'uuid'
import { Dispatch, SetStateAction, useState } from 'react'
import { CardContent } from '@/components/ui/card'
import NavigationItemForm, {
	formType
} from '@/components/structures/NavigationItemForm'
import NavigationItem from '@/components/structures/NavigationItem'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import Dndprovider from '@/providers/dndprovider'
import { INavigationItem } from '@/types'

type Props = INavigationItem & {
	setNavigation: Dispatch<SetStateAction<INavigationItem[]>>
	isFirst?: boolean
	isLast?: boolean
}

const Subnavigation = ({
	id,
	nazwa,
	link,
	setNavigation,
	isFirst,
	isLast
}: Props) => {
	const [subnavigation, setSubnavigation] = useState<INavigationItem[]>([])
	const [isEditView, setIsEditView] = useState(false)
	const [isAddNewItemOpen, setIsAddNewItemOpen] = useState(false)
	const openEditForm = () => setIsEditView(true)
	const closeEditView = () => setIsEditView(false)
	const openAddNewNavigationItem = () => setIsAddNewItemOpen(true)
	const closeAddNewNavigationItem = () => setIsAddNewItemOpen(false)
	const addNewNavigationItemToSubnavigation = (values: formType) => {
		setSubnavigation(prev => [...prev, { ...values, id: uuidv4() }])
		closeAddNewNavigationItem()
	}

	const deleteNavigationItem = () => {
		setNavigation(prev => prev.filter(item => item.id !== id))
		closeEditView()
	}
	const onSubmitEditForm = (values: formType) => {
		setNavigation(prev =>
			prev.map(item => (item.id === id ? { ...values, id: item.id } : item))
		)
		closeEditView()
	}
	const {
		attributes,
		listeners,
		setDraggableNodeRef,
		setDroppableNodeRef,
		transform,
		transition,
		isDragging
	} = useSortable({ id })
	const style = {
		transform: CSS.Transform.toString(transform),
		transition
	}
	return (
		<CardContent
			id={id}
			ref={setDraggableNodeRef}
			style={style}
			className='p-0'
		>
			{isEditView ? (
				<NavigationItemForm
					onCancel={closeEditView}
					onSubmit={onSubmitEditForm}
					onDelete={deleteNavigationItem}
					nazwa={nazwa}
					link={link}
				/>
			) : (
				<CardContent
					ref={setDroppableNodeRef}
					className={`flex items-center justify-between bg-white border ${
						isFirst ? 'rounded-t-xl ' : isLast ? 'rounded-bl-xl ' : ' '
					}w-full p-0 pr-6`}
				>
					<NavigationItem
						handlers={{
							attributes,
							listeners
						}}
						nazwa={nazwa}
						link={link}
						onDelete={deleteNavigationItem}
						openEditForm={openEditForm}
						openAddNewNavigationItem={openAddNewNavigationItem}
					/>
				</CardContent>
			)}
			<CardContent className={`bg-zinc-50 p-0 pl-16 ${isDragging && 'hidden'}`}>
				<Dndprovider setItems={setSubnavigation} items={subnavigation}>
					{subnavigation.map(item => (
						<Subnavigation
							key={item.id}
							{...item}
							setNavigation={setSubnavigation}
							isLast
						/>
					))}
				</Dndprovider>
			</CardContent>
			{isAddNewItemOpen && (
				<CardContent className='bg-zinc-50 py-6 pl-16'>
					<NavigationItemForm
						onSubmit={addNewNavigationItemToSubnavigation}
						onCancel={closeAddNewNavigationItem}
					/>
				</CardContent>
			)}
		</CardContent>
	)
}

export default Subnavigation
