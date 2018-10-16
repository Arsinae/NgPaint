import { TestBed, inject } from '@angular/core/testing';

import { PixelDrawingService } from './pixel-drawing.service';

describe('PixelDrawingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PixelDrawingService]
    });
  });

  it('should be created', inject([PixelDrawingService], (service: PixelDrawingService) => {
    expect(service).toBeTruthy();
  }));
});
