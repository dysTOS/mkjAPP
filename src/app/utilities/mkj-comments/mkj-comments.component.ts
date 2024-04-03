import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { GetListInput } from 'src/app/interfaces/api-middleware';
import { Kommentar } from 'src/app/models/Kommentar';
import { PermissionKey } from 'src/app/models/User';
import { ModelType } from 'src/app/models/_ModelType';
import { KommentarApiService } from 'src/app/services/api/kommentar-api.service';
import { UserService } from 'src/app/services/authentication/user.service';
import { InfoService } from 'src/app/services/info.service';

@Component({
  selector: 'mkj-comments',
  templateUrl: './mkj-comments.component.html',
  styleUrl: './mkj-comments.component.scss',
})
export class MkjCommentsComponent implements OnInit {
  @Input({ required: true }) modelType: ModelType;
  @Input({ required: true }) modelId: string;

  public comments: Kommentar[] = [];
  public commentText: string;
  public subCommentId: string;

  public saving = false;
  public initLoading = false;
  public isAdmin = this.userService.hasPermission(PermissionKey.USER_DELETE);
  public mitgliedId = this.userService.currentMitglied.value?.id;

  constructor(
    private apiService: KommentarApiService,
    private userService: UserService,
    private infoService: InfoService
  ) {}

  public ngOnInit(): void {
    this.initLoading = true;
    this.getComments().subscribe(() => (this.initLoading = false));
  }

  public getComments(parent?: Kommentar): Observable<void> {
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
        field: 'created_at',
        order: 'asc',
      },
    };
    const subject = new Subject<void>();
    this.apiService.getList(input).subscribe((response) => {
      if (parent) {
        parent.subComments = response.values;
        (parent as any).loading = false;
      } else {
        this.comments = response.values;
      }
      subject.next();
      subject.complete();
    });
    return subject;
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

  public deleteComment(comment: Kommentar): void {
    this.infoService
      .confirmDelete('Möchtest du diesen Kommentar wirklich löschen?', () => this.apiService.delete(comment.id))
      .subscribe((res) => {
        if (res?.id) {
          comment = res;
          this.comments = [...this.comments];
          return;
        }
        const parent = this.findParentComment(comment, this.comments);
        if (parent) {
          parent.subComments = parent.subComments?.filter((c) => c.id !== comment.id);
          parent.number_child_comments--;
        } else {
          this.comments = this.comments.filter((c) => c.id !== comment.id);
        }
      });
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
        return result;
      }
    }

    return null;
  }
}
