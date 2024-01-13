// import { Injectable } from '@angular/core';
// import { AngularFirestore } from '@angular/fire/compat/firestore';
// import { UserType } from '../shared/user.interface';
// import { Observable, map } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class UserService {

//   constructor(private firestore: AngularFirestore) { }

//   addUser(userData: UserType){
//     this.firestore.collection("users").doc(userData.id).set(userData)
//   }

//   getUsers(){
//     return this.firestore.collection('users').get().pipe(map((querySnapshot) => {
//       return querySnapshot.docs.map((dataItem: any) => {
//         // console.log(dataItem.data()); //Console log individual users
//         const users = JSON.parse(JSON.stringify(dataItem.data(),this.deserialize));
//         return users
//       })
//     }))
//   }

//   getUserById(userId:string): Observable<UserType | null>{
//     return this.firestore.collection("users").doc(userId).get().pipe(map((doc) => {
//       if(doc.exists){
//         return doc.data() as UserType
//       }
//       else{
//         return null
//       }
//     }))
//   }

//   deserialize(key:any, value:any) {
//     let maskedValue = value;
//     if  ((key === 'createdDate')) {
//         maskedValue = value.seconds * 1000;
//     }
//     return maskedValue;
//   }

// }
