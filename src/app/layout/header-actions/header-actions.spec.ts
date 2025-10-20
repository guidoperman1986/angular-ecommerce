import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderActions } from './header-actions';
import { provideZonelessChangeDetection } from '@angular/core';

describe('HeaderActions', () => {
  let component: HeaderActions;
  let fixture: ComponentFixture<HeaderActions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderActions],
      providers: [provideZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderActions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
