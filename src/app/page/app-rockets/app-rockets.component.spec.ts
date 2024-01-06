import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppRocketsComponent } from './app-rockets.component';

describe('AppRocketsComponent', () => {
  let component: AppRocketsComponent;
  let fixture: ComponentFixture<AppRocketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppRocketsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppRocketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
