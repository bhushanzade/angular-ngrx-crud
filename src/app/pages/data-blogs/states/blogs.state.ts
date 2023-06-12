
export interface IBlog {
  title: string;
  content: string;
}

export class Blog implements IBlog {
  _id: string = '';
  title: string = '';
  content: string = '';
  slug: string = '';
}

export interface BlogEntityState {
  items: Blog[];
  isLoaded: boolean;
  count: number;
  blog: Blog | null;
  slug: string;
}