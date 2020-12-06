import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./authentication/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./authentication/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'forget-password',
    loadChildren: () => import('./authentication/forget-password/forget-password.module').then( m => m.ForgetPasswordPageModule)
  },
  {
    path: 'change-password',
    loadChildren: () => import('./authentication/change-password/change-password.module').then( m => m.ChangePasswordPageModule)
  },
  {
    path: 'course-detail',
    loadChildren: () => import('./shared/course-detail/course-detail.module').then( m => m.CourseDetailPageModule)
  },
  {
    path: 'old-quiz',
    loadChildren: () => import('./old-quiz/old-quiz.module').then( m => m.OldQuizPageModule)
  },
  {
    path: 'add-quiz',
    loadChildren: () => import('./add-quiz/add-quiz.module').then( m => m.AddQuizPageModule)
  },
  {
    path: 'attempt-quiz',
    loadChildren: () => import('./attempt-quiz/attempt-quiz.module').then( m => m.AttemptQuizPageModule)
  },
  {
    path: 'edit-profile',
    loadChildren: () => import('./shared/edit-profile/edit-profile.module').then( m => m.EditProfilePageModule)
  },
  {
    path: 'privacy',
    loadChildren: () => import('./shared/privacy/privacy.module').then( m => m.PrivacyPageModule)
  },
  {
    path: 'contact-us',
    loadChildren: () => import('./shared/contact-us/contact-us.module').then( m => m.ContactUsPageModule)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./shared/notifications/notifications.module').then( m => m.NotificationsPageModule)
  },
  {
    path: 'terms',
    loadChildren: () => import('./shared/terms/terms.module').then( m => m.TermsPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
