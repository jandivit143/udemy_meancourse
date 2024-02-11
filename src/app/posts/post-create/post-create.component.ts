import { Component, EventEmitter, Output } from '@angular/core';
import { Post } from '../post.model';
import { NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {
    enteredTitle = '';
    enteredContent = '';
    // using eventemitter
    // @Output()
    // postCreated = new EventEmitter<Post>();

    enteredValue = '';
    newPost = 'NO CONTENT';
    constructor(public postsService:PostsService){}

    // Using template reference variable
    // onAddPost(postInput:HTMLTextAreaElement){
    //     // console.log(postInput.value);
    //     // this.newPost = 'The user\'s post';
    //     this.newPost = postInput.value;
    // }

    // Using two way data binding
    // onAddPost(){
    //     this.newPost = this.enteredValue;
    // }

    // onAddPost(){
    //   const post:Post = {title: this.enteredTitle, content: this.enteredContent};
    //   this.postCreated.emit(post);
    // }

    // using ngForm and ngModel
    onAddPost(form:NgForm){
      if(form.invalid){
        return;
      }

      // using eventemitter
      // const post:Post = {title: form.value.title, content: form.value.content};
      // this.postCreated.emit(post);
      
      // using service
      this.postsService.addPost(form.value.title, form.value.content);
      form.resetForm();
    }
}
