import IPlayer from './IPlayer';

export default interface IPlayday {
  _id: string
  points: Array<number>
  goals: Array<number>
  date: Date
  name: string
  teams: Array<IPlayer[]>
}
