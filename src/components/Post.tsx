import { format, formatDistanceToNow } from "date-fns"
import ptBR from "date-fns/locale/pt-BR"
import { Avatar } from "./Avatar";
import styles from "./Post.module.css";
import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";
import { Comment } from "./Comment";

interface Author {
    avatarUrl: string;
    name: string;
    role: string;
}

interface Content {
    type: 'paragraph' | 'link';
    content: string;
}

export interface PostType {
    id: number;
    author: Author;
    publishedAt: Date;
    content: Content[];
}

interface PostProps {
    post: PostType;
}

const comments = [
    'Muito bom Devon, parabéns!!'
];

export function Post({ post }: PostProps ) {

    const [comment, setComment] = useState(comments);
    const [newCommentText, setNewCommentText] = useState('')

    const publishedDateFormatted = format(post.publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
        locale: ptBR
    });
    const publishedDateRelativeToNow = formatDistanceToNow(post.publishedAt, {
        locale: ptBR,
        addSuffix: true
    });
    const dateTimeFormatted = format(post.publishedAt, "yyyy-MM-dd HH:mm:ss");

    function handleCreateNewComment(event: FormEvent) {
        event.preventDefault();
        setComment([...comment, newCommentText]);
        setNewCommentText('');
    }

    function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('');
        setNewCommentText(event.target.value)
    }

    function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('Esse campo é obrigatório!')
    }

    function deleteComment(commentToBeDeleted: string) {
        const commentsWithoutDeletedOne = comment.filter((element) => element != commentToBeDeleted);
        setComment(commentsWithoutDeletedOne);
    }

    const isNewCommentBlank = newCommentText.trim().length == 0;

    return (
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar 
                        src={post.author.avatarUrl}
                    />
                    <div className={styles.authorInfo}>
                        <strong>{post.author.name}</strong>
                        <span>{post.author.role}</span>
                    </div>
                </div>
                <time title={publishedDateFormatted} dateTime={dateTimeFormatted}>{publishedDateRelativeToNow}</time>
            </header>
            <div className={styles.content}>
                {post.content.map((element) => {
                    if(element.type == 'paragraph') {
                        return <p key={element.content}>{element.content}</p>
                    } else if(element.type == 'link') {
                        return <p key={element.content}><a href="#">{element.content}</a></p>
                    }
                })}
            </div>
            <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
                <strong>Deixe seu feedback</strong>
                <textarea
                    name="comment"
                    value={newCommentText}
                    placeholder="Deixe um comentário"
                    onChange={handleNewCommentChange}
                    onInvalid={handleNewCommentInvalid}
                    required
                />
                <footer>
                    <button type="submit" disabled={isNewCommentBlank}>Publicar</button>
                </footer>
            </form>
            <div className={styles.commentList}>
                {comment.map((element) => {
                    return (
                    <Comment 
                        key={element}
                        content={element}
                        onDeleteComment={deleteComment}
                    />)
                })}
            </div>
        </article>
    )
}