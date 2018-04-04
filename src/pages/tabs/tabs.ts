import { Component } from '@angular/core';

import { ContactPage } from '../contact/contact';
import { AccountPage } from '../account/account';
import { SearchPage } from '../search/search';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = SearchPage;
  tab2Root = AccountPage;
  tab3Root = ContactPage;

  constructor() {
      
  }
}
