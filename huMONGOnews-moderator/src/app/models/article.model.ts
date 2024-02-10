import { Location } from './location.model';
import { Moderator } from './moderator.model';

export type ArticleState = 'DRAFT' | 'POST' | 'ARCHIVE';

export interface Article {
  _id: string;
  title: string;
  titleImage: string; // base64 encoded
  contents: string; // HTML format
  dateCreated: Date;
  dateStateUpdated: Date;
  description: string;
  state: ArticleState;
  location: Location;
  moderator: string;
  numberOfViews: number;
  categoryId: string;
}

export type ReadonlyArticle = Readonly<Article>;
