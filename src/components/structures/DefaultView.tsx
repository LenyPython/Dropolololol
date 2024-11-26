import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CirclePlus } from 'lucide-react'

type Props = {
	onClick: () => void
}

const DefaultView = ({ onClick }: Props) => {
	return (
		<Card className='w-4/5'>
			<CardContent className='flex flex-col items-center'>
				<h3 className='font-semibold mt-6'>Menu jest puste</h3>
				<p>W tym menu nie ma jeszcze żadnych linków</p>
				<Button className='mt-6' onClick={onClick}>
					<CirclePlus />
					Dodaj pozycje menu
				</Button>
			</CardContent>
		</Card>
	)
}

export default DefaultView
