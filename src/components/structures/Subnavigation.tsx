import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/components/ui/card'
import { Menubar, MenubarMenu, MenubarTrigger } from '@/components/ui/menubar'
import { Move } from 'lucide-react'
import { Dispatch, SetStateAction, useState } from 'react'
import NavigationItemForm, {
	formType
} from '@/components/structures/NavigationItemForm'
import { INavigationItem } from '@/types'

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

	const onSubDelete = () => {
		setSubnavigation(prev =>
			prev.filter(item => item.nazwa !== nazwa && item.link !== link)
		)
		onSubCancel()
	}
	const onDelete = () => {
		setNavigation(prev =>
			prev.filter(item => item.nazwa !== nazwa && item.link !== link)
		)
		setIsEditView(false)
	}
	const onCancel = () => setIsEditView(false)
	// TODO add edition of specific field
	const onSubmit = (values: formType) => {
		setNavigation(prev => prev)
		setIsEditView(false)
	}
	if (isEditView)
		return (
			<NavigationItemForm
				onCancel={onCancel}
				onSubmit={onSubmit}
				onDelete={onDelete}
			/>
		)
	return (
		<>
			<Card className='flex items-center justify-between w-full pr-6'>
				<CardHeader className='relative pl-16'>
					<CardTitle>{nazwa}</CardTitle>
					<CardDescription>{link}</CardDescription>
					<Move className='absolute left-8 top-1/2 -translate-y-1/2' />
				</CardHeader>
				<Menubar>
					<MenubarMenu>
						<MenubarTrigger className='border-r-2' onClick={onDelete}>
							Usuń
						</MenubarTrigger>
						<MenubarTrigger
							className='border-r-2'
							onClick={() => setIsEditView(true)}
						>
							Edytuj
						</MenubarTrigger>
						<MenubarTrigger onClick={() => setIsAddNewItemOpen(true)}>
							Dodaj Pozycje Menu
						</MenubarTrigger>
					</MenubarMenu>
				</Menubar>
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
					<NavigationItemForm
						onSubmit={onSubSubmit}
						onCancel={onSubCancel}
						onDelete={onSubDelete}
					/>
				</CardContent>
			)}
		</>
	)
}

export default Subnavigation
