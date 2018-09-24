import { TestBed, inject } from '@angular/core/testing';

import { ColorManipulationService } from './color-manipulation.service';

describe('ColorManipulationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ColorManipulationService]
    });
  });

  it('should be created', inject([ColorManipulationService], (service: ColorManipulationService) => {
    expect(service).toBeTruthy();
  }));
});
