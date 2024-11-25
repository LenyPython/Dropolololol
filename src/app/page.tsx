import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export default function Home() {
	return (
		<div className='min-h-screen bg-zinc-50 font-[family-name:var(--font-geist-sans)]'>
			<main className='flex flex-col gap-8 row-start-2 items-center sm:items-start'>
				<h1>Dodaj nawigacje</h1>
				<Card>
					<CardHeader>
						<CardTitle>Nazwa</CardTitle>
					</CardHeader>
					<CardContent>
						<Input placeholder='email' />
						<Input placeholder='Link' />
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Pozycje Menu</CardTitle>
					</CardHeader>
					<CardContent>
						<Card className='bg-zinc-50'>
							<CardContent>
								<h3>Menu jest puste</h3>
								<p>W tyme menu nie ma jeszcze żadnych linków</p>
								<Button>text</Button>
							</CardContent>
						</Card>
					</CardContent>
				</Card>
			</main>
		</div>
	)
}
