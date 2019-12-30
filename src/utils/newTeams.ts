import IPlayer from '../types/interface/IPlayer';

export const newTeams = (teams: IPlayer[][], teamNumber: string, player: IPlayer) => {
  return teams.map((team: IPlayer[], idx: number) => {

    let newTeam = team;

    if (idx === parseInt(teamNumber, 10)) {
      const exPlayer: any = team.find((pl: IPlayer) => pl._id === player._id);
      if (exPlayer) {
        const existPlayerIdx = team.findIndex((pl: IPlayer) => pl._id === exPlayer._id);
        newTeam = [...team.slice(0, existPlayerIdx), ...team.slice(existPlayerIdx + 1)];
      } else {
        newTeam = [...team, player];
      }
    }
    return newTeam;
  });
};
