import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgpaintComponent } from './ngpaint.component';

describe('NgpaintComponent', () => {
  let component: NgpaintComponent;
  let fixture: ComponentFixture<NgpaintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgpaintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgpaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
