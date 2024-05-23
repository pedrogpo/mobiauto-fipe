import { useEffect, useState } from 'react'

/**
 * Hook para reslvver o problema de hidratação do NextJS, que atrasa o carregamento de dados do store até que seja renderizado no cliente
 *
 * @example
 * import useClientSideStore from './useClientSideStore';
 *
 * function App() {
 *   const localStore = useClientSideStore(store);
 *
 *   // Use localStore in your component
 * }
 */
export default function useClientSideStore<T>(store: T): T | null {
  const [localStore, setLocalStore] = useState<T | null>(null)

  useEffect(() => {
    setLocalStore(store)
  }, [])

  return localStore
}
