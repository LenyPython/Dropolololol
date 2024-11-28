import { Menubar, MenubarMenu, MenubarTrigger } from '@/components/ui/menubar'
import { Move } from 'lucide-react'
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

type Props = {
	nazwa: string
	link: string
	onDelete: () => void
	openEditForm: () => void
	openAddNewNavigationItem: () => void
}
const NavigationItem: React.FC<Props> = ({
	nazwa,
	link,
	onDelete,
	openAddNewNavigationItem,
	openEditForm
}) => {
	return (
		<>
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
					<MenubarTrigger className='border-r-2' onClick={openEditForm}>
						Edytuj
					</MenubarTrigger>
					<MenubarTrigger onClick={openAddNewNavigationItem}>
						Dodaj Pozycje Menu
					</MenubarTrigger>
				</MenubarMenu>
			</Menubar>
		</>
	)
}

export default NavigationItem
