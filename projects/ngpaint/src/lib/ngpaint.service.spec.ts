import { TestBed, inject } from '@angular/core/testing';

import { NgpaintService } from './ngpaint.service';

describe('NgpaintService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgpaintService]
    });
  });

  it('should be created', inject([NgpaintService], (service: NgpaintService) => {
    expect(service).toBeTruthy();
  }));
});
