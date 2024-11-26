import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/components/ui/card'
import { Menubar, MenubarMenu, MenubarTrigger } from '@/components/ui/menubar'
import { Move } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'

type Props = INavigationItem & {
	setNavigation: Dispatch<SetStateAction<INavigationItem[]>>
}

const NavigationItem = ({ nazwa, link, setNavigation }: Props) => {
	const handleDeleteItem = () =>
		setNavigation(prev => {
			console.log('prev: ', prev)
			let curr = prev.filter(item => item.nazwa !== nazwa && item.link !== link)
			console.log('curr: ', curr)
			return curr
		})
	return (
		<div className='flex items-center justify-between w-full pr-6'>
			<CardHeader className='relative pl-16'>
				<CardTitle>
					{nazwa}
					<Button variant='outline' className='ml-2'>
						kolekcja
					</Button>
				</CardTitle>
				<CardDescription>{link}</CardDescription>
				<Move className='absolute left-8 top-1/2 -translate-y-1/2' />
			</CardHeader>
			<Menubar>
				<MenubarMenu>
					<MenubarTrigger className='border-r-2' onClick={handleDeleteItem}>
						Usuń
					</MenubarTrigger>
					<MenubarTrigger className='border-r-2'>Edytuj</MenubarTrigger>
					<MenubarTrigger>Dodaj Pozycje Menu</MenubarTrigger>
				</MenubarMenu>
			</Menubar>
		</div>
	)
}

export default NavigationItem
