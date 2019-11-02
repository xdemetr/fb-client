import IPlayer from './IPlayer';

export default interface IPlayday {
  _id: string
  points: [],
  goals: [],
  date: Date,
  name: string
  teams: [
    IPlayer[],
    IPlayer[],
    IPlayer[]
  ]
}
