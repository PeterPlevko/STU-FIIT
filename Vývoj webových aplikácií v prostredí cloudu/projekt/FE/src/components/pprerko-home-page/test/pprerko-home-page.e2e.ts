import { newE2EPage } from '@stencil/core/testing';

describe('pp-ambulance-wl-app', () => {

  const entries = {};

  it('renders', async () => {
    const page = await newE2EPage();
    await page.setRequestInterception(true);

    page.on('response', response => {
      if (response.url() === 'http://localhost:3333/') {
        (page as any).removeAllListeners('request');

        page.on('request', interceptedRequest => {
          const url = interceptedRequest.url();
          const base = '/api/appointments';
          if(url.endsWith(`${base}/entries`)) {
            interceptedRequest.respond({
              status: 200,
              contentType: 'application/json',
              body: JSON.stringify(entries)
            });
          } else interceptedRequest.continue();
      });
    }});
    await page.setContent(`'<pprerko-home-page></pprerko-home-page>',`);

    const element = await page.find('pprerko-home-page');
    expect(element).toHaveClass('hydrated');
  });
});
