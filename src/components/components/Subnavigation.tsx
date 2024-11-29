import { Card, CardContent } from '@/components/ui/card'
import { Dispatch, SetStateAction, useState } from 'react'
import NavigationItemForm, {
	formType
} from '@/components/structures/NavigationItemForm'
import NavigationItem from '@/components/structures/NavigationItem'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { createId } from '@/lib/utils'

type Props = {
	setNavigation: Dispatch<SetStateAction<string[]>>
	id: string
	nazwa: string
	link: string
	depth: number
}

const Subnavigation = ({ nazwa, link, setNavigation, id, depth }: Props) => {
	const [subnavigation, setSubnavigation] = useState<string[]>([])
	const [isEditView, setIsEditView] = useState(false)
	const [isAddNewItemOpen, setIsAddNewItemOpen] = useState(false)
	const closeAddNewItemForm = () => setIsAddNewItemOpen(false)
	const addNewItemToSubnavigation = (values: formType) => {
		setSubnavigation(prev => [...prev, createId(values, depth)])
		closeAddNewItemForm()
	}

	const closeEditForm = () => setIsEditView(false)
	const openEditForm = () => setIsEditView(true)

	const deleteItemFromNavigation = () => {
		setNavigation(prev => {
			console.log(id)
			const arr = prev.filter(item => item !== id)
			console.log(arr)
			return arr
		})
		closeEditForm()
	}
	const submitEdit = (values: formType) => {
		setNavigation(prev => {
			const idx = prev.indexOf(id)
			prev[idx] = createId(values, depth)
			return [...prev]
		})
		closeEditForm()
	}
	const openAddNewNavigationItem = () => setIsAddNewItemOpen(true)

	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id })

	const style = {
		transform: CSS.Transform.toString(transform),
		transition
	}
	return (
		<CardContent
			className='p-0'
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
		>
			<Card className='flex items-center justify-between w-full pr-6'>
				{isEditView ? (
					<NavigationItemForm
						onCancel={closeEditForm}
						onSubmit={submitEdit}
						onDelete={deleteItemFromNavigation}
						nazwa={nazwa}
						link={link}
					/>
				) : (
					<NavigationItem
						nazwa={nazwa}
						link={link}
						onDelete={deleteItemFromNavigation}
						openEditForm={openEditForm}
						openAddNewNavigationItem={openAddNewNavigationItem}
					/>
				)}
			</Card>
			<CardContent className='p-0 pl-16'>
				{subnavigation.map(item => {
					const [depth, nazwa, link] = item.split('-')
					return (
						<Subnavigation
							key={item}
							id={item}
							depth={Number(depth) + 1}
							nazwa={nazwa}
							link={link}
							setNavigation={setNavigation}
						/>
					)
				})}
			</CardContent>
			{isAddNewItemOpen && (
				<CardContent className='bg-zinc-50 pt-6 pl-16'>
					<NavigationItemForm
						onSubmit={addNewItemToSubnavigation}
						onCancel={closeAddNewItemForm}
					/>
				</CardContent>
			)}
		</CardContent>
	)
}

export default Subnavigation
