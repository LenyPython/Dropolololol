import { formType } from '@/components/structures/NavigationItemForm'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function createId(values: formType, idx: number, depth: number) {
	return `${depth}-${idx}-${values.nazwa}`
}
