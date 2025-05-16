import React from 'react';
import { useTournament } from '../contexts/TournamentContext';

interface HeaderProps {
  isEditor?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isEditor = false }) => {
  const { tournamentInfo } = useTournament();
  
  if (isEditor) {
    return null;
  }

  const getHostNameStyle = () => {
    if (tournamentInfo.hostNameGradient) {
      return {
        background: `linear-gradient(to right, ${tournamentInfo.hostNameGradientFrom}, ${tournamentInfo.hostNameGradientTo})`,
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'transparent',
      };
    }
    return { color: tournamentInfo.hostNameColor };
  };

  const getSecondLineStyle = () => {
    if (tournamentInfo.secondLineGradient) {
      return {
        background: `linear-gradient(to right, ${tournamentInfo.secondLineGradientFrom}, ${tournamentInfo.secondLineGradientTo})`,
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'transparent',
      };
    }
    return { color: tournamentInfo.secondLineColor };
  };

  return (
    <div className="w-full px-6 py-4 flex justify-between items-center tournament-header">
      <div className="w-1/4">
        {tournamentInfo.showWeekDay && (
          <div className="text-sm font-orbitron text-white text-left">
            <span className="font-bold">Week {tournamentInfo.weekNumber}</span>
            <span className="mx-2">•</span>
            <span className="font-bold">Day {tournamentInfo.dayNumber}</span>
          </div>
        )}
      </div>
      
      <div className="w-1/2 flex flex-col items-center justify-center">
        <h2 
          className="text-2xl md:text-3xl font-orbitron font-bold uppercase tracking-wider"
          style={getHostNameStyle()}
        >
          {tournamentInfo.hostName}
        </h2>
        {tournamentInfo.hostNameSecondLine && (
          <h2 
            className="text-2xl md:text-3xl font-orbitron font-bold uppercase tracking-wider mt-1"
            style={getSecondLineStyle()}
          >
            {tournamentInfo.hostNameSecondLine}
          </h2>
        )}
        {tournamentInfo.showPresents && (
          <div className="text-sm uppercase tracking-widest mt-1 opacity-80">
            PRESENTS
          </div>
        )}
      </div>
      
      <div className="w-1/4 flex justify-end">
        {tournamentInfo.showLogo && tournamentInfo.logoUrl && (
          <div className="w-16 h-16 flex items-center justify-center">
            <img 
              src={tournamentInfo.logoUrl} 
              alt="Tournament Logo" 
              className="w-full h-full object-contain scale-[3.0]"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;