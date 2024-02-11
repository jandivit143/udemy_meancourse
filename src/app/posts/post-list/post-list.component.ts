import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy{
    // posts = [
    //     {title: 'First Post', content: 'This is the first post\'s content'},
    //     {title: 'Second Post', content: 'This is the second post\'s content'},
    //     {title: 'Third Post', content: 'This is the third post\'s content'}
    // ];

    // using eventemitter
    // @Input()
    // posts:Post[] = [];
    
    // using posts service
    posts:Post[] = [];

    // subscription: we use subscription for preventing memory leaks from the component in our application
    private postsSub:Subscription | undefined;

    constructor(public postsService: PostsService){}
    ngOnInit() {
        this.posts = this.postsService.getPosts();
        this.postsSub = this.postsService.getPostUpdateListener().subscribe((posts: Post[]) => {
          this.posts = posts;
        });
    }

    ngOnDestroy() {
        console.log('unsubscribed from PostListComponent component!');
        this.postsSub?.unsubscribe();
    }
}