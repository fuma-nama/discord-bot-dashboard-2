import Icon from '@chakra-ui/icon';
import { BsMusicNoteBeamed } from 'react-icons/bs';
import { FaGamepad } from 'react-icons/fa';
import { IoHappy } from 'react-icons/io5';
import { MdAddReaction } from 'react-icons/md';
import { useMusicFeature } from './example/MusicFeature';
import { FeaturesConfig } from './types';

/**
 * Define information for each features
 *
 * There is an example:
 */
export const features: FeaturesConfig = {
  music: {
    name: 'Music Player',
    description: 'Play music in Your Discord Server',
    icon: <Icon as={BsMusicNoteBeamed} />,
    useRender: (data) => {
      return useMusicFeature(data);
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
