'use client'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { SearchIcon } from 'lucide-react'
import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form'
import { INavigationItem } from '@/types'

const formSchema = z.object({
	nazwa: z
		.string({ required_error: 'Nazwa jest wymagana i musi posiadać 3 znaki' })
		.min(3, 'Nazwa musi posiadać przynajmniej 3 znaki'),
	link: z
		.string({ required_error: 'Link nie może być pusty' })
		.regex(/^https?:\/\/(.+\..+)$/, 'Podaj poprawny link http(s)://domain.com')
})

export type formType = z.infer<typeof formSchema>

type Props = {
	onCancel: () => void
	onSubmit: (values: formType) => void
	onDelete?: () => void
	nazwa?: string
	link?: string
}

const NavigationItemForm: React.FC<Props> = ({
	onCancel,
	onSubmit,
	onDelete,
	nazwa = '',
	link = ''
}) => {
	const form = useForm<formType>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			nazwa,
			link
		}
	})
	return (
		<Card className='relative w-full pr-6'>
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
									<div className='relative'>
										<FormControl>
											<Input
												{...field}
												className='pl-8'
												placeholder='Wklej lub wyszukaj'
											/>
										</FormControl>
										<SearchIcon className='absolute left-2 top-1/2 -translate-y-1/2 opacity-50' />
									</div>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button
							className='mt-4 mr-2'
							variant='outline'
							type='reset'
							onClick={onCancel}
						>
							Anuluj
						</Button>
						<Button
							variant='outline'
							className='text-violet-500 border-violet-500 hover:bg-violet-100 hover:text-violet-800'
							type='submit'
						>
							Dodaj
						</Button>
					</form>
				</Form>
			</CardContent>
			{onDelete && (
				<button
					className='absolute top-10 right-5 opacity-50'
					onClick={() => onDelete()}
				>
					<Trash2 />
				</button>
			)}
		</Card>
	)
}

export default NavigationItemForm
