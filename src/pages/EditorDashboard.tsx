import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Save, Trash2, RefreshCw } from 'lucide-react';
import { toast } from 'react-toastify';
import { useTournament, Team } from '../contexts/TournamentContext';

const EditorDashboard: React.FC = () => {
  const { teams, tournamentInfo, updateTeam, updateTournamentInfo, resetToDefault } = useTournament();
  const [activeTab, setActiveTab] = useState<'general' | 'pointTable' | 'slotList' | 'appearance'>('general');

  const handleTeamUpdate = (id: string, field: keyof Team, value: string | number) => {
    let processedValue: string | number = value;
    
    if (field === 'wins' || field === 'pp' || field === 'kp') {
      processedValue = value === '' ? 0 : Number(value);
    }
    
    updateTeam(id, { [field]: processedValue });
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all data to default? This cannot be undone.')) {
      resetToDefault();
      toast.success('All data has been reset to default.');
    }
  };

  const handleSave = () => {
    toast.success('All changes have been saved.');
  };

  return (
    <div className="min-h-screen w-full bg-background">
      <div className="w-full flex justify-between items-center p-4 glass-darker">
        <Link 
          to="/"
          className="px-4 py-2 rounded-full flex items-center gap-2 hover:bg-white/10 transition-all"
        >
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </Link>
        <h1 className="text-2xl font-orbitron font-bold">Editor Dashboard</h1>
        <div className="flex gap-2">
          <button
            onClick={handleReset}
            className="bg-error/20 hover:bg-error/40 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-all"
          >
            <RefreshCw size={16} />
            <span>Reset</span>
          </button>
          <button
            onClick={handleSave}
            className="bg-success/20 hover:bg-success/40 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-all"
          >
            <Save size={16} />
            <span>Save</span>
          </button>
        </div>
      </div>
      
      <div className="container mx-auto p-6">
        <div className="flex mb-6 border-b border-white/10">
          <button
            className={`py-3 px-6 font-medium ${activeTab === 'general' ? 'border-b-2 border-primary text-primary' : 'text-white/70'}`}
            onClick={() => setActiveTab('general')}
          >
            General Settings
          </button>
          <button
            className={`py-3 px-6 font-medium ${activeTab === 'pointTable' ? 'border-b-2 border-primary text-primary' : 'text-white/70'}`}
            onClick={() => setActiveTab('pointTable')}
          >
            Point Table Editor
          </button>
          <button
            className={`py-3 px-6 font-medium ${activeTab === 'slotList' ? 'border-b-2 border-primary text-primary' : 'text-white/70'}`}
            onClick={() => setActiveTab('slotList')}
          >
            Slot List Editor
          </button>
          <button
            className={`py-3 px-6 font-medium ${activeTab === 'appearance' ? 'border-b-2 border-primary text-primary' : 'text-white/70'}`}
            onClick={() => setActiveTab('appearance')}
          >
            Page Appearance
          </button>
        </div>
        
        {/* General Settings Tab */}
        {activeTab === 'general' && (
          <div className="glass rounded-lg p-6">
            <h2 className="text-xl font-orbitron mb-6 text-gradient">Tournament Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Tournament Host</label>
                <input
                  type="text"
                  value={tournamentInfo.hostName}
                  onChange={(e) => updateTournamentInfo({ hostName: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  type="text"
                  value={tournamentInfo.hostNameSecondLine}
                  onChange={(e) => updateTournamentInfo({ hostNameSecondLine: e.target.value })}
                  placeholder="Optional second line"
                  className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary mt-2"
                />
                <div className="mt-2 flex items-center">
                  <input
                    type="checkbox"
                    id="showPresents"
                    checked={tournamentInfo.showPresents}
                    onChange={(e) => updateTournamentInfo({ showPresents: e.target.checked })}
                    className="mr-2"
                  />
                  <label htmlFor="showPresents" className="text-sm">Show "PRESENTS" text</label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Logo URL</label>
                <input
                  type="text"
                  value={tournamentInfo.logoUrl}
                  onChange={(e) => updateTournamentInfo({ logoUrl: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="https://example.com/logo.png"
                />
                <div className="mt-2 flex items-center">
                  <input
                    type="checkbox"
                    id="showLogo"
                    checked={tournamentInfo.showLogo}
                    onChange={(e) => updateTournamentInfo({ showLogo: e.target.checked })}
                    className="mr-2"
                  />
                  <label htmlFor="showLogo" className="text-sm">Show logo</label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Week Number</label>
                <input
                  type="number"
                  value={tournamentInfo.weekNumber}
                  onChange={(e) => updateTournamentInfo({ weekNumber: Number(e.target.value) })}
                  className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  min="1"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Day Number</label>
                <input
                  type="number"
                  value={tournamentInfo.dayNumber}
                  onChange={(e) => updateTournamentInfo({ dayNumber: Number(e.target.value) })}
                  className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  min="1"
                />
                <div className="mt-2 flex items-center">
                  <input
                    type="checkbox"
                    id="showWeekDay"
                    checked={tournamentInfo.showWeekDay}
                    onChange={(e) => updateTournamentInfo({ showWeekDay: e.target.checked })}
                    className="mr-2"
                  />
                  <label htmlFor="showWeekDay" className="text-sm">Show Week/Day</label>
                </div>
              </div>
            </div>
            
            <h2 className="text-xl font-orbitron mt-8 mb-6 text-gradient">Social Media</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Facebook</label>
                <input
                  type="text"
                  value={tournamentInfo.facebook}
                  onChange={(e) => updateTournamentInfo({ facebook: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="username"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Instagram</label>
                <input
                  type="text"
                  value={tournamentInfo.instagram}
                  onChange={(e) => updateTournamentInfo({ instagram: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="username"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">YouTube</label>
                <input
                  type="text"
                  value={tournamentInfo.youtube}
                  onChange={(e) => updateTournamentInfo({ youtube: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="@channel"
                />
              </div>
            </div>
            
            <div className="mt-2 flex items-center">
              <input
                type="checkbox"
                id="showSocial"
                checked={tournamentInfo.showSocial}
                onChange={(e) => updateTournamentInfo({ showSocial: e.target.checked })}
                className="mr-2"
              />
              <label htmlFor="showSocial" className="text-sm">Show social media links</label>
            </div>
          </div>
        )}
        
        {/* Point Table Editor Tab */}
        {activeTab === 'pointTable' && (
          <div className="glass rounded-lg p-6">
            <h2 className="text-xl font-orbitron mb-6 text-gradient">Edit Team Points</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-3 px-2 text-left">Team</th>
                    <th className="py-3 px-2 text-left">Logo URL</th>
                    <th className="py-3 px-2 text-center">Wins</th>
                    <th className="py-3 px-2 text-center">PP</th>
                    <th className="py-3 px-2 text-center">KP</th>
                    <th className="py-3 px-2 text-center">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {teams.map((team) => (
                    <tr key={team.id} className="border-b border-white/10">
                      <td className="py-3 px-2">
                        <input
                          type="text"
                          value={team.name}
                          onChange={(e) => handleTeamUpdate(team.id, 'name', e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      </td>
                      <td className="py-3 px-2">
                        <input
                          type="text"
                          value={team.logo}
                          onChange={(e) => handleTeamUpdate(team.id, 'logo', e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary"
                          placeholder="https://example.com/logo.png"
                        />
                      </td>
                      <td className="py-3 px-2">
                        <input
                          type="number"
                          value={team.wins || 0}
                          onChange={(e) => handleTeamUpdate(team.id, 'wins', e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary text-center"
                          min="0"
                        />
                      </td>
                      <td className="py-3 px-2">
                        <input
                          type="number"
                          value={team.pp || 0}
                          onChange={(e) => handleTeamUpdate(team.id, 'pp', e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary text-center"
                          min="0"
                        />
                      </td>
                      <td className="py-3 px-2">
                        <input
                          type="number"
                          value={team.kp || 0}
                          onChange={(e) => handleTeamUpdate(team.id, 'kp', e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary text-center"
                          min="0"
                        />
                      </td>
                      <td className="py-3 px-2 text-center">
                        {(team.pp || 0) + (team.kp || 0)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-6">
              <p className="text-sm text-white/70">
                * Total points are calculated automatically (PP + KP). Teams will be ranked based on total points in the Point Table.
              </p>
            </div>
          </div>
        )}
        
        {/* Slot List Editor Tab */}
        {activeTab === 'slotList' && (
          <div className="glass rounded-lg p-6">
            <h2 className="text-xl font-orbitron mb-6 text-gradient">Edit Slot List</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {teams.map((team, index) => (
                <div key={team.id} className="glass-lighter p-4 rounded-lg">
                  <div className="flex items-center mb-4">
                    <span className="font-orbitron text-xl font-bold mr-4">Slot #{index + 1}</span>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Team Name</label>
                      <input
                        type="text"
                        value={team.name}
                        onChange={(e) => handleTeamUpdate(team.id, 'name', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Team Logo URL</label>
                      <input
                        type="text"
                        value={team.logo}
                        onChange={(e) => handleTeamUpdate(team.id, 'logo', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="https://example.com/logo.png"
                      />
                    </div>
                    
                    {team.logo && (
                      <div className="flex justify-center">
                        <div className="w-16 h-16 bg-white/10 rounded-md overflow-hidden">
                          <img 
                            src={team.logo} 
                            alt="Team logo preview" 
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/64?text=Error';
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Page Appearance Tab */}
        {activeTab === 'appearance' && (
          <div className="glass rounded-lg p-6">
            <h2 className="text-xl font-orbitron mb-6 text-gradient">Page Appearance</h2>

            <div className="space-y-8">
              {/* Background Image */}
              <div className="glass-lighter p-4 rounded-lg">
                <h3 className="text-lg font-orbitron mb-4">Background Image</h3>
                <div className="space-y-2">
                  <input
                    type="text"
                    value={tournamentInfo.backgroundImage}
                    onChange={(e) => updateTournamentInfo({ backgroundImage: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="https://example.com/background.png"
                  />
                  <p className="text-sm text-white/70">
                    Please upload your background image to <a href="https://catbox.moe/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">catbox.moe</a> and paste the URL here.
                  </p>
                </div>
              </div>

              {/* Host Name Colors */}
              <div className="glass-lighter p-4 rounded-lg">
                <h3 className="text-lg font-orbitron mb-4">Host Name Colors</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      id="hostNameGradient"
                      checked={tournamentInfo.hostNameGradient}
                      onChange={(e) => updateTournamentInfo({ hostNameGradient: e.target.checked })}
                      className="mr-2"
                    />
                    <label htmlFor="hostNameGradient">Use gradient</label>
                  </div>
                  
                  {tournamentInfo.hostNameGradient ? (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm mb-2">Gradient Start</label>
                        <input
                          type="color"
                          value={tournamentInfo.hostNameGradientFrom}
                          onChange={(e) => updateTournamentInfo({ hostNameGradientFrom: e.target.value })}
                          className="w-full h-10 rounded-md cursor-pointer"
                        />
                      </div>
                      <div>
                        <label className="block text-sm mb-2">Gradient End</label>
                        <input
                          type="color"
                          value={tournamentInfo.hostNameGradientTo}
                          onChange={(e) => updateTournamentInfo({ hostNameGradientTo: e.target.value })}
                          className="w-full h-10 rounded-md cursor-pointer"
                        />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <label className="block text-sm mb-2">Color</label>
                      <input
                        type="color"
                        value={tournamentInfo.hostNameColor}
                        onChange={(e) => updateTournamentInfo({ hostNameColor: e.target.value })}
                        className="w-full h-10 rounded-md cursor-pointer"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Second Line Colors */}
              <div className="glass-lighter p-4 rounded-lg">
                <h3 className="text-lg font-orbitron mb-4">Second Line Colors</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      id="secondLineGradient"
                      checked={tournamentInfo.secondLineGradient}
                      onChange={(e) => updateTournamentInfo({ secondLineGradient: e.target.checked })}
                      className="mr-2"
                    />
                    <label htmlFor="secondLineGradient">Use gradient</label>
                  </div>
                  
                  {tournamentInfo.secondLineGradient ? (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm mb-2">Gradient Start</label>
                        <input
                          type="color"
                          value={tournamentInfo.secondLineGradientFrom}
                          onChange={(e) => updateTournamentInfo({ secondLineGradientFrom: e.target.value })}
                          className="w-full h-10 rounded-md cursor-pointer"
                        />
                      </div>
                      <div>
                        <label className="block text-sm mb-2">Gradient End</label>
                        <input
                          type="color"
                          value={tournamentInfo.secondLineGradientTo}
                          onChange={(e) => updateTournamentInfo({ secondLineGradientTo: e.target.value })}
                          className="w-full h-10 rounded-md cursor-pointer"
                        />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <label className="block text-sm mb-2">Color</label>
                      <input
                        type="color"
                        value={tournamentInfo.secondLineColor}
                        onChange={(e) => updateTournamentInfo({ secondLineColor: e.target.value })}
                        className="w-full h-10 rounded-md cursor-pointer"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Overall Standings Colors */}
              <div className="glass-lighter p-4 rounded-lg">
                <h3 className="text-lg font-orbitron mb-4">Overall Standings Colors</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      id="standingsGradient"
                      checked={tournamentInfo.standingsGradient}
                      onChange={(e) => updateTournamentInfo({ standingsGradient: e.target.checked })}
                      className="mr-2"
                    />
                    <label htmlFor="standingsGradient">Use gradient</label>
                  </div>
                  
                  {tournamentInfo.standingsGradient ? (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm mb-2">Gradient Start</label>
                        <input
                          type="color"
                          value={tournamentInfo.standingsGradientFrom}
                          onChange={(e) => updateTournamentInfo({ standingsGradientFrom: e.target.value })}
                          className="w-full h-10 rounded-md cursor-pointer"
                        />
                      </div>
                      <div>
                        <label className="block text-sm mb-2">Gradient End</label>
                        <input
                          type="color"
                          value={tournamentInfo.standingsGradientTo}
                          onChange={(e) => updateTournamentInfo({ standingsGradientTo: e.target.value })}
                          className="w-full h-10 rounded-md cursor-pointer"
                        />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <label className="block text-sm mb-2">Color</label>
                      <input
                        type="color"
                        value={tournamentInfo.standingsColor}
                        onChange={(e) => updateTournamentInfo({ standingsColor: e.target.value })}
                        className="w-full h-10 rounded-md cursor-pointer"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Rank Box Colors */}
              <div className="glass-lighter p-4 rounded-lg">
                <h3 className="text-lg font-orbitron mb-4">Rank Box Colors (4-12)</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-2">Box Background Color</label>
                    <input
                      type="color"
                      value={tournamentInfo.rankBoxColor}
                      onChange={(e) => updateTournamentInfo({ rankBoxColor: e.target.value })}
                      className="w-full h-10 rounded-md cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Number Color</label>
                    <input
                      type="color"
                      value={tournamentInfo.rankNumberColor}
                      onChange={(e) => updateTournamentInfo({ rankNumberColor: e.target.value })}
                      className="w-full h-10 rounded-md cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditorDashboard;