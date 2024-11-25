import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CirclePlus } from 'lucide-react'

const AddMenu = () => {
	return (
		<Card className='w-4/5'>
			<CardHeader>
				<CardTitle>Pozycje Menu</CardTitle>
			</CardHeader>
			<CardContent>
				<Card>
					<CardContent className='flex flex-col items-center bg-zinc-50'>
						<h3 className='font-semibold mt-6'>Menu jest puste</h3>
						<p>W tym menu nie ma jeszcze żadnych linków</p>
						<Button className='mt-6'>
							<CirclePlus />
							Dodaj pozycje menu
						</Button>
					</CardContent>
				</Card>
			</CardContent>
		</Card>
	)
}

export default AddMenu
