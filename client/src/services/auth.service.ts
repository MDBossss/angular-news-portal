// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { UserType } from '../shared/user.interface';
// import { UserService } from './user.service';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   user: UserType | null = null;

//   constructor(
//     private auth: AngularFireAuth,
//     private router: Router,
//     private userService: UserService
//   ) {
//     this.auth.authState.subscribe((user) => {
//       console.log(user);
//       if (user !== null) {
//         const storedUser = localStorage.getItem('user');
//         if (storedUser) {
//           this.user = JSON.parse(storedUser);
//           this.router.navigate(['/']);
//         }
//       }
//     });
//   }

//   async login(email: string, password: string): Promise<boolean> {
//     try {
//       console.log('login function');
//       const res = await this.auth.signInWithEmailAndPassword(email, password);
//       console.log(res);
//       if (res.user) {
//         const uid = res.user.uid;
//         console.log(uid);
//         this.userService.getUserById(uid).subscribe((user) => {
//           this.user = user;
//           console.log(user);
//           localStorage.setItem('user', JSON.stringify(user));
//           console.log('success login');
//           this.router.navigate(['/']);
//         });
//       }

//       return true;
//     } catch (err) {
//       alert('Failed to login');
//       this.router.navigate(['/login']);
//       return false; // Unsuccessful login
//     }
//   }

//   async register(
//     email: string,
//     password: string,
//     username: string,
//     name: string
//   ): Promise<boolean> {
//     try {
//       console.log('register function');
//       const res = await this.auth.createUserWithEmailAndPassword(
//         email,
//         password
//       );
//       const newUser: UserType = {
//         id: res?.user?.uid!,
//         email,
//         password,
//         username,
//         name,
//       };
//       console.log(newUser);
//       this.userService.addUser(newUser);
//       this.router.navigate(['/login']);
//       return true; // Successful registration
//     } catch (err) {
//       this.router.navigate(['/register']);
//       alert('Failed to register');
//       return false; // Unsuccessful registration
//     }
//   }

//   async logout(): Promise<void> {
//     try {
//       await this.auth.signOut();
//       localStorage.removeItem('user');
//       this.router.navigate(['/login']);
//     } catch (err) {
//       console.error('Failed to log out:', err);
//       throw err; // You can handle or log the error here
//     }
//   }

//   getCurrentUser(): UserType | null {
//     return this.user;
//   }
// }
