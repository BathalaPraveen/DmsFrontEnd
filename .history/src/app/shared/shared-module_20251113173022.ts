import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// Components
import { HeaderComponent } from './components/header/header';
// import { FooterComponent } from './components/footer/footer';
// import { SidebarComponent } from './components/sidebar/sidebar';
// import { LayoutComponent } from './components/layout/layout';
// import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb';

// Factory function for translation files
export function HttpLoaderFactory(): TranslateHttpLoader {
  return new TranslateHttpLoader();
}


@NgModule({
  declarations: [
    // FooterComponent,
    // SidebarComponent,
    // LayoutComponent,
    // BreadcrumbComponent
  ],
  imports: [
    CommonModule,
    HeaderComponent,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    TranslateModule,
    HeaderComponent,
    // FooterComponent,
    // SidebarComponent,
    // LayoutComponent,
    // BreadcrumbComponent
  ],
})
export class SharedModule {}
