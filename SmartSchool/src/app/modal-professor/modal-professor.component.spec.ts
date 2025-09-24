import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalProfessorComponent } from './modal-professor.component';

describe('ModalProfessorComponent', () => {
  let component: ModalProfessorComponent;
  let fixture: ComponentFixture<ModalProfessorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalProfessorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalProfessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
