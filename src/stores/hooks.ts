import { UserInfo, discord } from './../api/discord';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelfUserQuery } from './queries';

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
