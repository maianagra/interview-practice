interface Comment {
  id: number;
  text: string;
  replies: Comment[];
}

interface FlatComment {
  id: number;
  text: string;
}

export function flattenNestedComments(comments: Comment[]): FlatComment[] {
  const flatReplies: FlatComment[] = [];

  function extractReplies(comment: Comment): void {
    flatReplies.push({ id: comment.id, text: comment.text });

    if (comment.replies.length > 0) {
      for (const reply of comment.replies) {
        extractReplies(reply);
      }
    }
  }

  for (const comment of comments) {
    extractReplies(comment);
  }

  return flatReplies;
}
