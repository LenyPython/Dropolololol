import { Menubar, MenubarMenu, MenubarTrigger } from '@/components/ui/menubar'
import { Move } from 'lucide-react'
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DraggableAttributes } from '@dnd-kit/core'
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities'

type Props = {
	nazwa: string
	link: string
	onDelete?: () => void
	openEditForm?: () => void
	openAddNewNavigationItem?: () => void
	handlers: {
		attributes?: DraggableAttributes
		listeners?: SyntheticListenerMap
	}
}
const NavigationItem: React.FC<Props> = ({
	nazwa,
	link,
	onDelete,
	openAddNewNavigationItem,
	openEditForm,
	handlers
}) => {
	const { attributes, listeners } = handlers
	return (
		<>
			<CardHeader className='relative pl-16'>
				<CardTitle>{nazwa}</CardTitle>
				<CardDescription>{link}</CardDescription>
				<Move
					{...attributes}
					{...listeners}
					className='absolute left-8 top-1/2 -translate-y-1/2'
				/>
			</CardHeader>
			<Menubar>
				<MenubarMenu>
					{onDelete && (
						<MenubarTrigger className='border-r-2' onClick={onDelete}>
							Usuń
						</MenubarTrigger>
					)}
					{openEditForm && (
						<MenubarTrigger className='border-r-2' onClick={openEditForm}>
							Edytuj
						</MenubarTrigger>
					)}
					{openAddNewNavigationItem && (
						<MenubarTrigger onClick={openAddNewNavigationItem}>
							Dodaj Pozycje Menu
						</MenubarTrigger>
					)}
				</MenubarMenu>
			</Menubar>
		</>
	)
}

export default NavigationItem
