import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EleveDetailsComponent } from './eleve-details.component';

describe('EleveDetailsComponent', () => {
  let component: EleveDetailsComponent;
  let fixture: ComponentFixture<EleveDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EleveDetailsComponent]
    });
    fixture = TestBed.createComponent(EleveDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
