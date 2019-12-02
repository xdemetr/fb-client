export type IPlayerPlayday = {
  _id: string,
  name: string
  playday: string
  result: number
}

export default interface IPlayer {
  _id: string
  name: string
  handle: string
  box: number
  image: string
  damage: boolean
  playdays: IPlayerPlayday[]
}
