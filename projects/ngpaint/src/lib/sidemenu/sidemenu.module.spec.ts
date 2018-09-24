import { SidemenuModule } from './sidemenu.module';

describe('SidemenuModule', () => {
  let sidemenuModule: SidemenuModule;

  beforeEach(() => {
    sidemenuModule = new SidemenuModule();
  });

  it('should create an instance', () => {
    expect(sidemenuModule).toBeTruthy();
  });
});
