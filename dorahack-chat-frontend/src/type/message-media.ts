import { PageInfo } from './common';
import { MessageStateOptional } from './message';

export type MediaContent = {
  content: string;
  optional: MessageStateOptional;
};

export type MediaContentWithPageInfo = PageInfo & {
  results: MediaContent[];
};
