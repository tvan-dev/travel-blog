import { createContext } from 'react';
export type Context = {
  activeModal: 'create' | 'update' | null
  setActiveModal: React.Dispatch<React.SetStateAction<'create' | 'update' | null>>
}
export const BlogContext = createContext<Context | null>(null)