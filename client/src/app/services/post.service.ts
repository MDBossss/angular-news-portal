// import { Injectable } from '@angular/core';
// import { AngularFirestore } from '@angular/fire/compat/firestore';
// import { PostType } from '../shared/post.interface';
// import { map } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class PostService {

//   constructor(private firestore: AngularFirestore) { 
    
//   }

//   addPost(postData:PostType){
//     this.firestore.collection("posts").doc(postData.id).set(postData);
//   }

//   getPosts(){
//     return this.firestore.collection("posts").get().pipe(map((querySnapshot) => {
//       return querySnapshot.docs.map((dataItem:any) => {
//         const posts = JSON.parse(JSON.stringify(dataItem.data(),this.deserialize));
//         return posts
//       })
//     }))
//   }

//   getPostByUserId(userId:string){
//     return this.firestore.collection("posts",ref => ref.where("userId","==",userId)).get().pipe(map((querySnapshot) => {
//       return querySnapshot.docs.map((dataItem:any) => {
//         const posts = JSON.parse(JSON.stringify(dataItem.data(),this.deserialize));
//         return posts
//       })
//     }))
//   }

//   updatePost(postData:PostType){
//     return this.firestore.collection("posts").doc(postData.id).update(postData);
//   }

//   deletePost(postId:string){
//     return this.firestore.collection("posts").doc(postId).delete();
//   }


//   deserialize(key:any, value:any) {
//     let maskedValue = value;
//     if  ((key === 'createdDate')) {
//         maskedValue = value.seconds * 1000;
//     }
//     return maskedValue;
//   }

// }
