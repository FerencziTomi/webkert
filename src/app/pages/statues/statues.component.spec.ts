import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatuesComponent } from './statues.component';

describe('StatuesComponent', () => {
  let component: StatuesComponent;
  let fixture: ComponentFixture<StatuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatuesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
