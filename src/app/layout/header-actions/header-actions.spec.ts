import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderActions } from './header-actions';
import { provideZonelessChangeDetection } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

describe('HeaderActions', () => {
  let component: HeaderActions;
  let fixture: ComponentFixture<HeaderActions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderActions],
      providers: [provideZonelessChangeDetection(), {
        provide: ActivatedRoute,
        useValue: {
          params: new BehaviorSubject({ category: 'all' })
        }
      }]
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
