'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { SearchIcon } from 'lucide-react'
import { Trash2 } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form'
import { Dispatch, SetStateAction } from 'react'

const formSchema = z.object({
	nazwa: z
		.string({ required_error: 'Nazwa jest wymagana' })
		.min(3, 'Nazwa musi posiadać przynajmniej 3 znaki'),
	link: z.string({ required_error: 'Link nie może być pusty' })
	/* to delete 
		.regex(
			/^https?:\/\/.+/,
			'Link musi zaczynać się od podania protokołu http:// bądź https://'
		)
		*/
})

type formType = z.infer<typeof formSchema>

type Props = {
	setNavigation: Dispatch<SetStateAction<INavigationItem[]>>
	onCancel: () => void
}

const NavigationItemForm = ({ setNavigation, onCancel }: Props) => {
	const form = useForm<formType>({ resolver: zodResolver(formSchema) })
	const onSubmit = (values: formType) => {
		// to delete
		console.log(values)
		setNavigation(prev => [...prev, values])
		onCancel()
	}
	return (
		<Card className='relative w-4/5 pr-8'>
			<CardContent className='mt-6'>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<FormField
							control={form.control}
							name='nazwa'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nazwa</FormLabel>
									<FormControl>
										<Input {...field} placeholder='np. Promocje' />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='link'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Link</FormLabel>
									<FormControl>
										<div className='relative'>
											<Input
												{...field}
												className='pl-8'
												placeholder='Wklej lub wyszukaj'
											/>
											<SearchIcon className='absolute left-2 top-1/2 -translate-y-1/2 opacity-50' />
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button className='mt-4 mr-2' variant='outline' type='reset'>
							Anuluj
						</Button>
						<Button variant='outline' type='submit'>
							Dodaj
						</Button>
					</form>
				</Form>
			</CardContent>
			<button className='absolute top-10 right-5 opacity-50' onClick={onCancel}>
				<Trash2 />
			</button>
		</Card>
	)
}

export default NavigationItemForm
