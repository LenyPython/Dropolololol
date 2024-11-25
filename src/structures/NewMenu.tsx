import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { SearchIcon } from 'lucide-react'
import { Trash2 } from 'lucide-react'

const NewMenu = () => {
	return (
		<Card className='relative w-4/5 pr-8'>
			<CardContent className='mt-6'>
				<label htmlFor='name'>Nazwa</label>
				<Input type='text' name='name' placeholder='np. Promocje' />

				<label htmlFor='link' className='relative'>
					Link
				</label>
				<div className='relative'>
					<Input
						type='text'
						name='link'
						className='pl-7'
						placeholder='Wklej lub wyszukaj'
					/>
					<SearchIcon className='absolute left-2 top-1/2 -translate-y-1/2 opacity-50' />
				</div>

				<Button className='mt-4 mr-2' variant='outline'>
					Anuluj
				</Button>
				<Button variant='outline'>Dodaj</Button>
			</CardContent>
			<Trash2 className='absolute top-10 right-5 opacity-50' />
		</Card>
	)
}

export default NewMenu
