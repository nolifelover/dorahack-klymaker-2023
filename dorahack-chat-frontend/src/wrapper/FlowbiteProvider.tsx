import { Flowbite } from 'flowbite-react';
import { PropsWithChildren } from 'react';
import theme from '../constant/flowbite-theme';

export default function FlowbiteProvider({ children }: PropsWithChildren) {
  return <Flowbite theme={{ theme }}>{children}</Flowbite>;
}
