import { AngularUdemyProjectPage } from './app.po';

describe('angular-udemy-project App', () => {
  let page: AngularUdemyProjectPage;

  beforeEach(() => {
    page = new AngularUdemyProjectPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
