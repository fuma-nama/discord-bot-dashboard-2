import Icon from '@chakra-ui/icon';
import { useFeatureValue } from 'hooks/forms';
import { BsMusicNoteBeamed } from 'react-icons/bs';
import { FaGamepad } from 'react-icons/fa';
import { IoHappy } from 'react-icons/io5';
import { MdAddReaction } from 'react-icons/md';
import { MusicFeaturePanel } from './forms/MusicFeature';
import { FeatureConfig, FeaturesConfig } from './types';

export const features: FeaturesConfig = {
  music: {
    name: 'Music Player',
    description: 'Play music in Your Discord Server',
    icon: <Icon as={BsMusicNoteBeamed} />,
    useRender: (data) => {
      const result = useFeatureValue<'music'>({
        valid: (v) => v.message == null || v.message?.length > 0,
      });

      return result.render(<MusicFeaturePanel result={result} data={data} />);
    },
  },
  gaming: {
    name: 'Gaming',
    description: 'Enjoy playing games with your friends',
    icon: <Icon as={FaGamepad} />,
    useRender(data) {
      return {
        serialize: () => '{}',
        component: <></>,
      };
    },
  },
  'reaction-role': {
    name: 'Reaction Role',
    description: 'Give user a role when clicking on a button',
    icon: <Icon as={MdAddReaction} />,
    useRender(data) {
      return {
        serialize: () => '{}',
        component: <></>,
      };
    },
  },
  meme: {
    name: 'Memes Time',
    description: 'Send memes everyday',
    icon: <Icon as={IoHappy} />,
    useRender(data) {
      return {
        serialize: () => '{}',
        component: <></>,
      };
    },
  },
};
