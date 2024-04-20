import Fuse from 'fuse.js';

const TAGS: string[] = [
  'black',
  'blue',
  'copper',
  'giclee',
  'gold',
  'grey',
  'illustration',
  'mallard',
  'mixed media',
  'orange',
  'painting',
  'pink',
  'print',
  'purple',
  'red',
  'screen print',
  'silver',
  'varnish',
  'white',
];

export const getTagStore = () =>
  new Fuse(TAGS, {
    shouldSort: true,
    minMatchCharLength: 2,
    includeMatches: true,
  });
