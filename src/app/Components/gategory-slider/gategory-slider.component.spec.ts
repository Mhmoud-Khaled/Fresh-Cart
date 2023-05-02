import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GategorySliderComponent } from './gategory-slider.component';

describe('GategorySliderComponent', () => {
  let component: GategorySliderComponent;
  let fixture: ComponentFixture<GategorySliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GategorySliderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GategorySliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
