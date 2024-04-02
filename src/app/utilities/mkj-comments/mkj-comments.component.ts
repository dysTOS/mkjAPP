import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { GetListInput } from 'src/app/interfaces/api-middleware';
import { Kommentar } from 'src/app/models/Kommentar';
import { ModelType } from 'src/app/models/_ModelType';
import { KommentarApiService } from 'src/app/services/api/kommentar-api.service';

@Component({
  selector: 'mkj-comments',
  templateUrl: './mkj-comments.component.html',
  styleUrl: './mkj-comments.component.scss',
})
export class MkjCommentsComponent implements OnInit {
  @Input({ required: true }) modelType: ModelType;
  @Input({ required: true }) modelId: string;

  @ViewChild('inputTemplate') inputTemplate: any;

  public comments: Kommentar[] = [];
  public commentText: string;
  public subCommentId: string;

  public saving = false;

  constructor(private apiService: KommentarApiService) {}

  public ngOnInit(): void {
    this.getComments();
  }

  public getComments(parent?: Kommentar): void {
    if (parent) {
      (parent as any).loading = true;
    }

    const input: GetListInput<Kommentar> = {
      filterAnd: [
        {
          field: 'commentable_type',
          value: this.modelType,
        },
        {
          field: 'commentable_id',
          value: this.modelId,
        },
        {
          field: 'parent_comment_id',
          value: parent?.id || null,
          operator: '=',
        },
      ],
      sort: {
        field: 'updated_at',
        order: 'asc',
      },
    };

    this.apiService.getList(input).subscribe((response) => {
      if (parent) {
        parent.subComments = response.values;
        (parent as any).loading = false;
      } else {
        this.comments = response.values;
      }
    });
  }

  public createComment(parent?: Kommentar): void {
    this.saving = true;

    this.apiService
      .create({
        text: this.commentText,
        commentable_type: this.modelType,
        commentable_id: this.modelId,
        parent_comment_id: parent?.id,
      })
      .subscribe((response) => {
        this.insertComment(response);
        this.saving = false;
      });
  }

  public initCommentInput(comment: Kommentar, text?: string): void {
    this.subCommentId = this.subCommentId === comment.id ? null : comment.id;
    this.commentText = text || '';
  }

  private insertComment(comment: Kommentar): void {
    this.commentText = '';
    this.subCommentId = null;
    if (comment.parent_comment_id) {
      const parent = this.findParentComment(comment, this.comments);
      if (parent) {
        parent.subComments = [...(parent.subComments ?? []), comment];
        parent.number_child_comments++;
      }
    } else {
      this.comments.push(comment);
    }
  }

  private findParentComment(c: Kommentar, arr: Kommentar[]): Kommentar {
    for (const item of arr) {
      if (item.id === c.parent_comment_id) {
        return item;
      } else if (item.subComments) {
        const result = this.findParentComment(c, item.subComments);
        if (result) return result;
      }
    }

    return null;
  }
}
