
import { ScrollToDirective } from './helpers/scrollTo.directives';
import { WINDOW_PROVIDERS } from './helpers/window.helpers';
import { NgModule } from '@angular/core';
// import { NgForm } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { NguCarouselModule } from "@ngu/carousel";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LandingRoutingModule } from './landing-routing.module';
import { ServicesComponent } from './components/services/services.component';
import { ServicesCauroselComponent } from './components/services-caurosel/services-caurosel.component';
import { TestimonialComponent } from './components/testimonial/testimonial.component';
import { TestimonialCauroselComponent } from './components/testimonial-caurosel/testimonial-caurosel.component';
import { PricingOneComponent } from './components/pricing-one/pricing-one.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { FooterComponent } from './components/footer/footer.component';
import { FeaturesComponent } from './components/features/features.component';
import { FeaturesTwoComponent } from './components/features-two/features-two.component';
import { BestComponent } from './components/best/best.component';
import { LeftImageComponent } from './components/left-image/left-image.component';
import { RightImageComponent } from './components/right-image/right-image.component';
import { TeamComponent } from './components/team/team.component';
import { NewsComponent } from './components/news/news.component';
import { FaqsComponent } from './components/faqs/faqs.component';
import { NewsTwoComponent } from './components/news-two/news-two.component';
import { IntroThreeComponent } from './components/intro-three/intro-three.component';
import { HeaderComponent } from './components/header/header.component';
import { HeaderWhiteComponent } from './components/header-white/header-white.component';
import { IntroTenComponent } from './components/intro-ten/intro-ten.component';
import { LandingV10Component } from './landing-v10/landing-v10.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { DemosComponent } from './components/demos/demos.component';
import { BlogDetailsComponent } from './components/blog-details/blog-details.component';
import { BlogDetailsPageComponent } from './blog-details-page/blog-details-page.component';

@NgModule({
  imports: [
    CommonModule,
    LandingRoutingModule,
    NguCarouselModule,
    NgbModule,

    FormsModule
  ],
  declarations: [
    ServicesComponent,
    ServicesCauroselComponent,
    TestimonialComponent,
    TestimonialCauroselComponent,
    PricingOneComponent,
    ContactFormComponent,
    FooterComponent,
    FeaturesComponent,
    FeaturesTwoComponent,
    BestComponent,
    LeftImageComponent,
    RightImageComponent,
    TeamComponent,
    NewsComponent,
    FaqsComponent,
    NewsTwoComponent,
    IntroThreeComponent,
    HeaderComponent,
    ScrollToDirective,
    HeaderWhiteComponent,
    IntroTenComponent,
    LandingV10Component,
    DemosComponent,
    BlogDetailsComponent,
    BlogDetailsPageComponent,
  ],
  exports: [
    HeaderComponent
  ],
  providers: [WINDOW_PROVIDERS]

  // exports: ScrollToDirective
})
export class LandingModule {}
