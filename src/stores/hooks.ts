import { UserInfo } from './../api/discord';
import { useNavigate, useParams } from 'react-router-dom';
import { useGuilds, useSelfUserQuery } from './queries';

export function useSelectedGuild() {
  const { guild } = useParams();
  const navigate = useNavigate();

  return {
    selected: guild,
    setSelected(guild: string) {
      navigate(`/guilds/${guild}`);
    },
  };
}

/**
 * never use this hook if the components isn't rendered inside AppLayout
 */
export function useSelfUser(): UserInfo {
  return useSelfUserQuery().data;
}

export function useGuildPreview(guild: string) {
  const query = useGuilds();

  return {
    guild: query.data?.find((g) => g.id === guild),
    query,
  };
}
