import { useEffect, useState } from 'react';

export default function NextAndLastMatches() {
  const [upcoming, setUpcoming] = useState([]);
  const [upcomingIndex, setUpcomingIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  function isFuriaAcademyMatch(match) {
    if (!Array.isArray(match.teams)) return false;
    return match.teams.some(team =>
      team.name && team.name.toLowerCase().includes("furia academy")
    );
  }

  useEffect(() => {
    async function fetchData() {
      const upRes = await fetch('https://hltv-api.vercel.app/api/matches.json');
      const upMatches = await upRes.json();
      const furiaUpcoming = upMatches.filter(isFuriaAcademyMatch);
      setUpcoming(furiaUpcoming);
      setLoading(false);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (upcoming.length < 2) return;
    const interval = setInterval(() => {
      setUpcomingIndex(prev => (prev + 1) % upcoming.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [upcoming.length]);

  if (loading) {
    return (
      <div
        className="w-full max-w-lg p-4 mb-2 rounded-mac shadow-lg flex flex-col items-center justify-center text-center"
        style={{ background: "#bfa14a", color: "#23201a" }}
      >
        Carregando próxima partida...
      </div>
    );
  }

  const next = upcoming[upcomingIndex];

  function renderTeams(match) {
    if (!match) return null;
    if (!Array.isArray(match.teams) || match.teams.length !== 2) return "Times não informados";
    return (
      <div className="flex items-center gap-2 mb-1 justify-center">
        <img src={match.teams[0].logo} alt={match.teams[0].name} className="w-7 h-7 rounded" />
        <span className="font-bold">{match.teams[0].name}</span>
        <span className="mx-1">vs</span>
        <span className="font-bold">{match.teams[1].name}</span>
        <img src={match.teams[1].logo} alt={match.teams[1].name} className="w-7 h-7 rounded" />
      </div>
    );
  }

  function renderMatchInfo(match) {
    if (!match) return null;
    return (
      <>
        <div className="text-sm mb-1">
          {new Date(match.time).toLocaleString('pt-BR', { dateStyle: 'medium', timeStyle: 'short' })}
        </div>
        <div className="text-xs mb-1">
          {match.maps?.toUpperCase()} &bull; <span className="italic">{match.event && match.event.name}</span>
        </div>
        {match.event?.logo && (
          <img src={match.event.logo} alt={match.event.name} className="inline-block w-8 h-8 mr-2 align-middle" />
        )}
      </>
    );
  }

  return (
    <div
      className="w-full max-w-lg p-4 mb-2 rounded-mac shadow-lg flex flex-col items-center justify-center text-center"
      style={{ background: "#bfa14a", color: "#23201a" }}
    >
      <strong className="text-lg">Próxima partida FURIA Academy</strong>
      <br />
      {next ? (
        <>
          {renderTeams(next)}
          {renderMatchInfo(next)}
          <div className="text-xs mt-2">
            {upcoming.length > 1 && `Mostrando ${upcomingIndex + 1} de ${upcoming.length} próximas`}
          </div>
        </>
      ) : (
        <span>Nenhuma partida futura encontrada.</span>
      )}
    </div>
  );
}
