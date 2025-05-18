import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaintingDialogComponent } from './painting-dialog.component';

describe('PaintingDialogComponent', () => {
  let component: PaintingDialogComponent;
  let fixture: ComponentFixture<PaintingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaintingDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaintingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
