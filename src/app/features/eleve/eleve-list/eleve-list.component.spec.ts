import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EleveListComponent } from './eleve-list.component';

describe('EleveListComponent', () => {
  let component: EleveListComponent;
  let fixture: ComponentFixture<EleveListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EleveListComponent]
    });
    fixture = TestBed.createComponent(EleveListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
