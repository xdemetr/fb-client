import IPlayer from './IPlayer';

export default interface IPlayday {
  _id: string;
  points: number[];
  goals: number[];
  date: Date;
  name: string;
  teams: IPlayer[][];
}
