import React from 'react';
import { useTournament } from '../contexts/TournamentContext';
import { FacebookIcon, InstagramIcon, YoutubeIcon } from 'lucide-react';

interface FooterProps {
  isEditor?: boolean;
}

const Footer: React.FC<FooterProps> = ({ isEditor = false }) => {
  const { tournamentInfo } = useTournament();
  
  if (isEditor || !tournamentInfo.showSocial) {
    return null;
  }

  return (
    <div className="w-full py-4 flex justify-center items-center gap-6 glass-lighter rounded-md mt-4">
      {tournamentInfo.facebook && (
        <div className="flex items-center gap-2">
          <FacebookIcon size={18} className="text-blue-400" />
          <span className="text-sm font-medium">@{tournamentInfo.facebook}</span>
        </div>
      )}
      
      {tournamentInfo.instagram && (
        <div className="flex items-center gap-2">
          <InstagramIcon size={18} className="text-pink-400" />
          <span className="text-sm font-medium">@{tournamentInfo.instagram}</span>
        </div>
      )}
      
      {tournamentInfo.youtube && (
        <div className="flex items-center gap-2">
          <YoutubeIcon size={18} className="text-red-500" />
          <span className="text-sm font-medium">{tournamentInfo.youtube}</span>
        </div>
      )}
    </div>
  );
};

export default Footer;