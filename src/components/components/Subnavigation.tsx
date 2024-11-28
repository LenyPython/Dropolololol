import { Card, CardContent } from '@/components/ui/card'
import { Dispatch, SetStateAction, useState } from 'react'
import NavigationItemForm, {
	formType
} from '@/components/structures/NavigationItemForm'
import { INavigationItem } from '@/types'
import NavigationItem from '../structures/NavigationItem'

type Props = INavigationItem & {
	setNavigation: Dispatch<SetStateAction<INavigationItem[]>>
}

const Subnavigation = ({ nazwa, link, setNavigation }: Props) => {
	const [subnavigation, setSubnavigation] = useState<INavigationItem[]>([])
	const [isEditView, setIsEditView] = useState(false)
	const [isAddNewItemOpen, setIsAddNewItemOpen] = useState(false)
	const onSubCancel = () => setIsAddNewItemOpen(false)
	const onSubSubmit = (values: formType) => {
		setSubnavigation(prev => [...prev, values])
		onSubCancel()
	}

	const onDelete = () => {
		setNavigation(prev =>
			prev.filter(item => item.nazwa !== nazwa && item.link !== link)
		)
		setIsEditView(false)
	}
	const onCancel = () => setIsEditView(false)
	const onSubmit = (values: formType) => {
		setNavigation(prev =>
			prev.map(item =>
				item.nazwa === nazwa && item.link === link ? values : item
			)
		)
		setIsEditView(false)
	}
	const openEditForm = () => setIsEditView(true)
	const openAddNewNavigationItem = () => setIsAddNewItemOpen(true)
	return (
		<>
			<Card className='flex items-center justify-between w-full pr-6'>
				{isEditView ? (
					<NavigationItemForm
						onCancel={onCancel}
						onSubmit={onSubmit}
						onDelete={onDelete}
						nazwa={nazwa}
						link={link}
					/>
				) : (
					<NavigationItem
						nazwa={nazwa}
						link={link}
						onDelete={onDelete}
						openEditForm={openEditForm}
						openAddNewNavigationItem={openAddNewNavigationItem}
					/>
				)}
			</Card>
			<CardContent className='p-0 pl-16'>
				{subnavigation.map(item => (
					<Subnavigation
						key={`subnav-${item.nazwa}-${item.link}`}
						{...item}
						setNavigation={setSubnavigation}
					/>
				))}
			</CardContent>
			{isAddNewItemOpen && (
				<CardContent className='bg-zinc-50 pt-6 pl-16'>
					<NavigationItemForm onSubmit={onSubSubmit} onCancel={onSubCancel} />
				</CardContent>
			)}
		</>
	)
}

export default Subnavigation
