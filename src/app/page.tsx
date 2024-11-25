import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/components/ui/card'
import { Menubar, MenubarMenu, MenubarTrigger } from '@/components/ui/menubar'
import AddMenu from '@/structures/AddMenu'
import NewMenu from '@/structures/NewMenu'
import { MenubarSeparator } from '@radix-ui/react-menubar'
import { Move } from 'lucide-react'

export default function Home() {
	return (
		<div className='min-h-screen bg-zinc-50 font-[family-name:var(--font-geist-sans)]'>
			<main className='flex flex-col gap-8 row-start-2 items-center sm:items-start'>
				<h1 className='text-2xl font-semibold'>Dodaj nawigacje</h1>
				<AddMenu />
				<NewMenu />
				<Card className='w-4/5'>
					<div className='flex items-center justify-between w-full pr-6'>
						<CardHeader className='relative pl-16'>
							<CardTitle>
								Promocje
								<Button variant='outline' className='ml-2'>
									kolekcja
								</Button>
							</CardTitle>
							<CardDescription>https://sample.com</CardDescription>
							<Move className='absolute left-8 top-1/2 -translate-y-1/2' />
						</CardHeader>
						<Menubar>
							<MenubarMenu>
								<MenubarTrigger className='border-r-2'>Usuń</MenubarTrigger>
								<MenubarTrigger className='border-r-2'>Edytuj</MenubarTrigger>
								<MenubarTrigger>Dodaj Pozycje Menu</MenubarTrigger>
							</MenubarMenu>
						</Menubar>
					</div>
					<CardContent className='bg-zinc-50'>
						<Button variant='outline' className='mt-6'>
							Dodaj pozycje menu
						</Button>
					</CardContent>
				</Card>
			</main>
		</div>
	)
}
