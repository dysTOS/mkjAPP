import { ModelType } from './_ModelType';

export interface Kommentar {
  id?: string;
  text?: string;
  commentable_type?: ModelType;
  commentable_id?: string;
  mitglied_id?: number;
  mitglied_name?: string;
  number_child_comments?: number;
  parent_comment_id?: string;
  created_at?: string;
  updated_at?: string;
  subComments?: Kommentar[];
}
