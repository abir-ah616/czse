import React from 'react';
import { useTournament } from '../contexts/TournamentContext';

const PointTable: React.FC = () => {
  const { getTeamsByRank, tournamentInfo } = useTournament();
  const rankedTeams = getTeamsByRank();

  const getStandingsStyle = () => {
    if (tournamentInfo.standingsGradient) {
      return {
        background: `linear-gradient(to right, ${tournamentInfo.standingsGradientFrom}, ${tournamentInfo.standingsGradientTo})`,
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'transparent',
      };
    }
    return { color: tournamentInfo.standingsColor };
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="glass-darker rounded-t-lg p-3 text-center">
        <h2 
          className="text-xl font-orbitron tracking-wider font-bold"
          style={getStandingsStyle()}
        >
          OVERALL STANDINGS
        </h2>
      </div>
      
      <div className="glass rounded-b-lg overflow-hidden">
        <table className="w-full points-table">
          <thead>
            <tr className="glass-darker border-b border-white/10">
              <th className="text-left py-3 px-4 font-orbitron">RANK</th>
              <th className="w-14"></th>
              <th className="text-left font-orbitron">TEAM NAME</th>
              <th className="text-center font-orbitron">WINS</th>
              <th className="text-center font-orbitron">PP</th>
              <th className="text-center font-orbitron">KP</th>
              <th className="text-center font-orbitron">TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {rankedTeams.map((team) => (
              <tr key={team.id} className="team-row">
                <td className="text-center relative px-4">
                  <span className={`inline-flex justify-center items-center w-8 h-8 rounded-lg font-bold
                    ${team.rank === 1 ? 'rank-1' : 
                      team.rank === 2 ? 'rank-2' : 
                      team.rank === 3 ? 'rank-3' : 
                      ''}`}
                    style={{
                      background: team.rank && team.rank > 3 ? tournamentInfo.rankBoxColor : undefined,
                      color: team.rank && team.rank > 3 ? tournamentInfo.rankNumberColor : '#000000'
                    }}
                  >
                    {team.rank}
                  </span>
                </td>
                <td className="w-14 p-1">
                  {team.logo && (
                    <div className="w-10 h-10 overflow-hidden rounded-full bg-white/10 flex items-center justify-center">
                      <img 
                        src={team.logo} 
                        alt={`${team.name} logo`}
                        className="w-full h-full object-contain scale-[2]" 
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/40?text=Logo';
                        }}
                      />
                    </div>
                  )}
                </td>
                <td className="team-name font-orbitron text-white">{team.name}</td>
                <td className="text-center">{team.wins || 0}</td>
                <td className="text-center text-blue-300">{team.pp || 0}</td>
                <td className="text-center text-green-300">{team.kp || 0}</td>
                <td className="text-center text-yellow-300 font-bold">{team.total || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PointTable;