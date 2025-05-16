import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Define team types
export interface Team {
  id: string;
  name: string;
  logo: string;
  wins: number;
  pp: number;
  kp: number;
  total?: number;
  rank?: number;
}

// Define tournament metadata
export interface TournamentInfo {
  hostName: string;
  hostNameSecondLine: string;
  showPresents: boolean;
  weekNumber: number;
  dayNumber: number;
  showWeekDay: boolean;
  logoUrl: string;
  showLogo: boolean;
  facebook: string;
  instagram: string;
  youtube: string;
  showSocial: boolean;
  // Styling options
  hostNameColor: string;
  hostNameGradient: boolean;
  hostNameGradientFrom: string;
  hostNameGradientTo: string;
  secondLineColor: string;
  secondLineGradient: boolean;
  secondLineGradientFrom: string;
  secondLineGradientTo: string;
  standingsColor: string;
  standingsGradient: boolean;
  standingsGradientFrom: string;
  standingsGradientTo: string;
  rankBoxColor: string;
  rankNumberColor: string;
  backgroundImage: string;
}

// Default values
const defaultTeams: Team[] = Array(12).fill(null).map((_, index) => ({
  id: `team-${index + 1}`,
  name: `Team ${index + 1}`,
  logo: '',
  wins: 0,
  pp: 0,
  kp: 0,
}));

const defaultTournamentInfo: TournamentInfo = {
  hostName: 'Esports Host',
  hostNameSecondLine: '',
  showPresents: true,
  weekNumber: 1,
  dayNumber: 1,
  showWeekDay: true,
  logoUrl: '',
  showLogo: true,
  facebook: 'esports.tournament',
  instagram: 'esports.tournament',
  youtube: '@esportstournament',
  showSocial: true,
  // Default styling
  hostNameColor: '#00a8ff',
  hostNameGradient: true,
  hostNameGradientFrom: '#00a8ff',
  hostNameGradientTo: '#ff3778',
  secondLineColor: '#00a8ff',
  secondLineGradient: true,
  secondLineGradientFrom: '#00a8ff',
  secondLineGradientTo: '#ff3778',
  standingsColor: '#00a8ff',
  standingsGradient: true,
  standingsGradientFrom: '#00a8ff',
  standingsGradientTo: '#ff3778',
  rankBoxColor: '#4299e1',
  rankNumberColor: '#ffffff',
  backgroundImage: 'https://files.catbox.moe/yt2t9h.png',
};

// Create context
const TournamentContext = createContext<TournamentContextType | undefined>(undefined);

// Provider component
export const TournamentProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [teams, setTeams] = useState<Team[]>(() => {
    const savedTeams = localStorage.getItem('teams');
    return savedTeams ? JSON.parse(savedTeams) : defaultTeams;
  });

  const [tournamentInfo, setTournamentInfo] = useState<TournamentInfo>(() => {
    const savedInfo = localStorage.getItem('tournamentInfo');
    return savedInfo ? JSON.parse(savedInfo) : defaultTournamentInfo;
  });

  useEffect(() => {
    localStorage.setItem('teams', JSON.stringify(teams));
  }, [teams]);

  useEffect(() => {
    localStorage.setItem('tournamentInfo', JSON.stringify(tournamentInfo));
  }, [tournamentInfo]);

  const updateTeam = (id: string, data: Partial<Team>) => {
    setTeams(prevTeams => 
      prevTeams.map(team => 
        team.id === id ? { ...team, ...data } : team
      )
    );
  };

  const updateTournamentInfo = (data: Partial<TournamentInfo>) => {
    setTournamentInfo(prev => ({ ...prev, ...data }));
  };

  const getTeamsByRank = () => {
    return [...teams]
      .map(team => ({
        ...team,
        total: (team.pp + team.kp)
      }))
      .sort((a, b) => (b.total ?? 0) - (a.total ?? 0))
      .map((team, index) => ({
        ...team,
        rank: index + 1
      }));
  };

  const resetToDefault = () => {
    setTeams(defaultTeams);
    setTournamentInfo(defaultTournamentInfo);
  };

  return (
    <TournamentContext.Provider value={{
      teams,
      tournamentInfo,
      updateTeam,
      updateTournamentInfo,
      getTeamsByRank,
      resetToDefault
    }}>
      {children}
    </TournamentContext.Provider>
  );
};

// Custom hook to use the tournament context
export const useTournament = () => {
  const context = useContext(TournamentContext);
  if (context === undefined) {
    throw new Error('useTournament must be used within a TournamentProvider');
  }
  return context;
};