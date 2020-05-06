import {enableProdMode} from '@angular/core'
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic'


import {environment} from './environments/environment'
import {AppModule} from './app/app.module'


// //TODO remove this lines for build
 import * as $ from 'jquery';
 import 'foundation-sites/dist/js/foundation'
  $(document).foundation();
// //

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
