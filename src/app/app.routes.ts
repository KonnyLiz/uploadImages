import { Routes, RouterModule } from '@angular/router';
import { PhotosComponent } from './components/photos/photos.component';
import { UploadComponent } from './components/upload/upload.component';

const routes: Routes = [
    { path: 'photos', component: PhotosComponent },
    { path: 'upload', component: UploadComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'photos' }
];

export const APP_ROUTES = RouterModule.forRoot(routes);
