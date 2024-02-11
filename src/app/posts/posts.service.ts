import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { Subject } from "rxjs";

@Injectable({
    providedIn:'root'
})
export class PostsService{
    private posts:Post[]=[];
    // using observable
    private postsUpdated = new Subject<Post[]>();

    getPosts(){
        // for using eventemitter (or) for using observable
        return [...this.posts];

        // using posts service
        // return this.posts;
    }

    // using observable
    getPostUpdateListener(){
        return this.postsUpdated.asObservable();
    }

    addPost(title:string, content:string){
        const post:Post = {title: title, content: content};
        this.posts.push(post);
        // using observable
        this.postsUpdated.next([...this.posts]);
    }
}