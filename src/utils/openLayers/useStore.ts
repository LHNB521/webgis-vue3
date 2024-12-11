import { Map } from './config/import'
import { useOlStore } from '@/store'
const useStore = () => {
  const useOl = useOlStore()
  const setMap = (map: Map) => {
    useOl.setMap(map)
  }
  const getMap = (): Map => {
    return useOl.getMap()
  }
  return { setMap, getMap }
}
export default useStore
