import * as Cesium from 'cesium'
import { token, option } from '../config/option'
export const useMap = (options: Cesium.Viewer.ConstructorOptions = option) => {
  const init = () => {
    Cesium.Ion.defaultAccessToken = token
    const map = new Cesium.Viewer('', {
      ...options,
    })
  }
  return { init }
}
export default useMap
