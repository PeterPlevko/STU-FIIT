import { newSpecPage } from '@stencil/core/testing';
import { HomePage } from '../pprerko-home-page';

describe('router-app', () => {
  it('renders list', async () => {
    HomePage.MainRouter = null;
    const page = await newSpecPage({
      url: 'http://localhost:8080/',
      components: [HomePage],
      html: '<pprerko-home-page></pprerko-home-page>',

    });

    await page.waitForChanges();

    const child = await page.root.shadowRoot.firstElementChild;
    const child2 = page.root.shadowRoot.querySelector('.body')
    expect(child.tagName.toLocaleLowerCase()).toEqual("div");
    expect(child.firstElementChild.textContent).toEqual("Medical system");
    expect(child2.tagName.toLocaleLowerCase()).toEqual("div");
    expect(child2.firstElementChild.tagName.toLocaleLowerCase()).toEqual("mwc-button");
    expect(child2.lastElementChild.tagName.toLocaleLowerCase()).toEqual("mwc-button");
  });
});
