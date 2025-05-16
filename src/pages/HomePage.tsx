import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Grid, Settings, Facebook, Instagram, Youtube } from 'lucide-react';
import { useTournament } from '../contexts/TournamentContext';

const HomePage: React.FC = () => {
  const { tournamentInfo } = useTournament();

  return (
    <div 
      className="min-h-screen w-full flex flex-col items-center justify-center p-6"
      style={{
        backgroundImage: `url('${tournamentInfo.backgroundImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="w-full max-w-4xl glass rounded-2xl p-8 animate-pulse-glow">
        <h1 className="text-4xl md:text-5xl font-orbitron font-bold text-center mb-2 hero-title">
          TOURNAMENT DASHBOARD
        </h1>
        <p className="text-center text-lg mb-12 opacity-80">
          Create, manage and share your tournament standings
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Link 
            to="/point-table" 
            className="glass-lighter hover:glass-darker p-6 rounded-xl flex flex-col items-center justify-center text-center transition-all duration-300 group"
          >
            <Trophy size={48} className="mb-4 text-yellow-400 group-hover:scale-110 transition-transform" />
            <h2 className="text-xl font-orbitron font-bold mb-2">Point Table</h2>
            <p className="text-sm opacity-70">View the current tournament standings</p>
          </Link>

          <Link 
            to="/slot-list" 
            className="glass-lighter hover:glass-darker p-6 rounded-xl flex flex-col items-center justify-center text-center transition-all duration-300 group"
          >
            <Grid size={48} className="mb-4 text-blue-400 group-hover:scale-110 transition-transform" />
            <h2 className="text-xl font-orbitron font-bold mb-2">Slot List</h2>
            <p className="text-sm opacity-70">Check the tournament slot assignments</p>
          </Link>

          <Link 
            to="/editor" 
            className="glass-lighter hover:glass-darker p-6 rounded-xl flex flex-col items-center justify-center text-center transition-all duration-300 group"
          >
            <Settings size={48} className="mb-4 text-purple-400 group-hover:scale-110 transition-transform" />
            <h2 className="text-xl font-orbitron font-bold mb-2">Editor Dashboard</h2>
            <p className="text-sm opacity-70">Manage tournament data and settings</p>
          </Link>
        </div>

        <div className="text-center pt-6 border-t border-white/10">
          <p className="mb-4 opacity-70">Created by MR. OPPY</p>
          
          <div className="flex justify-center gap-6">
            {tournamentInfo.facebook && (
              <a 
                href={`https://facebook.com/${tournamentInfo.facebook}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-colors"
              >
                <Facebook size={24} />
              </a>
            )}
            
            {tournamentInfo.instagram && (
              <a 
                href={`https://instagram.com/${tournamentInfo.instagram}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-pink-400 transition-colors"
              >
                <Instagram size={24} />
              </a>
            )}
            
            {tournamentInfo.youtube && (
              <a 
                href={`https://youtube.com/${tournamentInfo.youtube}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-red-500 transition-colors"
              >
                <Youtube size={24} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;