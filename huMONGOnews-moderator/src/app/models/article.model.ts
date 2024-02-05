import { Moderator } from './moderator.model';

export type ArticleState = 'DRAFT' | 'POST' | 'ARCHIVE';

export interface Article {
  readonly title: string;
  readonly titleImage: string; // base64 encoded
  readonly contents: string; // HTML format
  readonly dateCreated: Date;
  readonly dateStateUpdated: Date;
  readonly description: string;
  readonly state: ArticleState;
  readonly location: Location;
  readonly moderator: Moderator;
  readonly numberOfViews: number;
  readonly categoryId: string;
}
