import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { formType } from '@/components/structures/NavigationItemForm'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function createId(values: formType, depth: number) {
	return `${depth}-${values.nazwa}-${values.link}`
}
