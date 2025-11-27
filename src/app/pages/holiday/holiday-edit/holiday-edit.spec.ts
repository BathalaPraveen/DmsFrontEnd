import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidayEdit } from './holiday-edit';

describe('HolidayEdit', () => {
  let component: HolidayEdit;
  let fixture: ComponentFixture<HolidayEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HolidayEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HolidayEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
