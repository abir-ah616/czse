import React from 'react';
import { useTournament } from '../contexts/TournamentContext';

const SlotList: React.FC = () => {
  const { teams } = useTournament();
  
  // Split teams into rows of 2
  const rows = [];
  for (let i = 0; i < teams.length; i += 2) {
    rows.push(teams.slice(i, i + 2));
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="glass-darker rounded-t-lg p-3 text-center">
        <h2 className="text-xl font-orbitron tracking-wider font-bold text-gradient">
          SLOT LIST
        </h2>
      </div>
      
      <div className="glass rounded-b-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rows.map((row, rowIndex) => (
            <div key={`row-${rowIndex}`} className="flex flex-col gap-4">
              {row.map((team, index) => {
                const slotNumber = rowIndex * 2 + index + 1;
                
                return (
                  <div 
                    key={team.id}
                    className="flex items-center glass-lighter rounded-md p-2 border-l-4 border-primary hover:border-accent transition-all duration-300"
                  >
                    <div className="slot-number font-bold text-2xl w-12 text-center">{`#${slotNumber}`}</div>
                    
                    {team.logo && (
                      <div className="w-12 h-12 mx-2 overflow-hidden rounded-md bg-white/10 flex items-center justify-center">
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
                    
                    <span className="font-orbitron font-bold text-lg tracking-wide ml-2">{team.name}</span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SlotList;