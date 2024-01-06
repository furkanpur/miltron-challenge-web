import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppRocketDetailsComponent } from './app-rocket-details.component';

describe('AppRocketDetailsComponent', () => {
  let component: AppRocketDetailsComponent;
  let fixture: ComponentFixture<AppRocketDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppRocketDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppRocketDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
