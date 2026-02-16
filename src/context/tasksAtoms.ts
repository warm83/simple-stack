import { atom } from 'jotai'
import type { Task } from '../types/task'

export const tasksAtom = atom<Task[]>([])
export const tasksLoadingAtom = atom(true)
export const tasksErrorAtom = atom<string | null>(null)
