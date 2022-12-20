import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawTableComponent } from './draw-table.component';

describe('DrawTableComponent', () => {
  let component: DrawTableComponent;
  let fixture: ComponentFixture<DrawTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrawTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
