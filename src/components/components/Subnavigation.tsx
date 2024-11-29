import { Card, CardContent } from '@/components/ui/card'
import { Dispatch, SetStateAction, useState } from 'react'
import NavigationItemForm, {
	formType
} from '@/components/structures/NavigationItemForm'
import { INavigationItem } from '@/types'
import NavigationItem from '../structures/NavigationItem'
import { createId } from '@/lib/utils'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import Dndprovider from '@/providers/dndprovider'

type Props = INavigationItem & {
	setNavigation: Dispatch<SetStateAction<INavigationItem[]>>
	depth?: number
}

const Subnavigation = ({
	id,
	nazwa,
	link,
	setNavigation,
	depth = 0
}: Props) => {
	const [subnavigation, setSubnavigation] = useState<INavigationItem[]>([])
	const [isEditView, setIsEditView] = useState(false)
	const [isAddNewItemOpen, setIsAddNewItemOpen] = useState(false)
	const openEditForm = () => setIsEditView(true)
	const closeEditView = () => setIsEditView(false)
	const openAddNewNavigationItem = () => setIsAddNewItemOpen(true)
	const closeAddNewNavigationItem = () => setIsAddNewItemOpen(false)
	const addNewNavigationItemToSubnavigation = (values: formType) => {
		setSubnavigation(prev => [
			...prev,
			{ ...values, id: createId(values, subnavigation.length, depth) }
		])
		closeAddNewNavigationItem()
	}

	const deleteNavigationItem = () => {
		setNavigation(prev =>
			prev.filter(item => item.nazwa !== nazwa && item.link !== link)
		)
		closeEditView()
	}
	const onSubmitEditForm = (values: formType) => {
		console.log('TODO')
		setNavigation(
			prev => prev
			/* 			prev.map(item =>
				item.id === nazwa && item.link === link ?
				 {...values,createId(values,)} : item
			) */
		)
		closeEditView()
	}
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id })
	const style = {
		transform: CSS.Transform.toString(transform),
		transition
	}
	return (
		<CardContent ref={setNodeRef} style={style} className='p-0'>
			<Card className='flex items-center justify-between w-full pr-6'>
				{isEditView ? (
					<NavigationItemForm
						onCancel={closeEditView}
						onSubmit={onSubmitEditForm}
						onDelete={deleteNavigationItem}
						nazwa={nazwa}
						link={link}
					/>
				) : (
					<NavigationItem
						handlers={{ attributes, listeners }}
						nazwa={nazwa}
						link={link}
						onDelete={deleteNavigationItem}
						openEditForm={openEditForm}
						openAddNewNavigationItem={openAddNewNavigationItem}
					/>
				)}
			</Card>
			<CardContent className='p-0 pl-16'>
				<Dndprovider setItems={setSubnavigation} items={subnavigation}>
					{subnavigation.map(item => (
						<Subnavigation
							key={item.id}
							{...item}
							setNavigation={setSubnavigation}
							depth={depth + 1}
						/>
					))}
				</Dndprovider>
			</CardContent>
			{isAddNewItemOpen && (
				<CardContent className='bg-zinc-50 pt-6 pl-16'>
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
