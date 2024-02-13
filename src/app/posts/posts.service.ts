import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Post } from "./post.model";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
    providedIn:'root'
})
export class PostsService{
    private posts:Post[]=[];
    // using observable
    private postsUpdated = new Subject<Post[]>();

    constructor(private http: HttpClient){}

    getPosts() {
        // for using eventemitter (or) for using observable
        // return [...this.posts];

        // using posts service
        // return this.posts;

        // using http to get posts from server(backend)
        this.http.get<{message: string, posts: Post[]}>('http://localhost:3000/api/posts')
        // for assigning mongodb objectid(_id) value to Post interface _id
        .pipe(map((postData) => {
            return postData.posts.map(post => {
                return {
                    title: post.title,
                    content: post.content,
                    _id: post._id
                };
            });
        }))
        // before creating a Post model using mongoose
        // .subscribe((postData) => {
            // this.posts = postData.posts;
            // this.postsUpdated.next([...this.posts]);

        // after creating a Post model using mongoose
        .subscribe(transformedPosts => {
            // console.log('transformedPosts are',transformedPosts);
            this.posts = transformedPosts;
            this.postsUpdated.next([...this.posts]);
        });
    }

    // using observable
    getPostUpdateListener(){
        return this.postsUpdated.asObservable();
    }

    addPost(title:string, content:string){
        const post:Post = {_id: '', title: title, content: content};
        this.http.post<{message: string}>('http://localhost:3000/api/post', post)
        .subscribe((responseData) => {
            console.log(responseData.message);
            this.posts.push(post);
            // using observable
            this.postsUpdated.next([...this.posts]);
        });
    }
    
    deletePost(postId: string){
        this.http.delete('http://localhost:3000/api/post/' + postId).subscribe(() => {
            console.log('Deleted!');
            const updatedPosts = this.posts.filter(post => post._id !== postId);
            this.posts = updatedPosts;
            this.postsUpdated.next([...this.posts]);
        });
    }
}