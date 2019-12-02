import IPlayer from '../types/interface/IPlayer';

export const newTeams = (teams: Array<IPlayer[]>, teamNumber: string, player: IPlayer) => {
  return teams.map((team: Array<IPlayer>, idx: number) => {
    if (idx === parseInt(teamNumber)) {
      const exPlayer: any = team.find((pl: IPlayer) => pl._id === player._id);
      if (exPlayer) {
        const existPlayerIdx = team.findIndex((pl: IPlayer) => pl._id === exPlayer._id);
        team = [...team.slice(0, existPlayerIdx), ...team.slice(existPlayerIdx + 1)];
      } else {
        team = [...team, player]
      }
    }
    return team
  });
};
