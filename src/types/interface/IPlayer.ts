import IPlayday from './IPlayday';

export default interface IPlayer {
  _id: string
  name: string
  handle: string
  box?: number
  image?: string
  damage?: boolean
  playdays: Array<{_id:string, name: string, result: number}> | null
}
