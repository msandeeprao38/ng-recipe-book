import { Component } from '@angular/core';
import { Response } from '@angular/http';

import { DataStorageService } from '../../shared/data-storage.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private dataStorageService: DataStorageService,
    private auth: AuthService) {}

  onSaveData() {
    this.dataStorageService.storeRecipes()
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
  }
  onFetchData() {
    this.dataStorageService.fetchRecipes();
  }
  onLogout() {
    this.auth.logout();
  }
  isAuthenticated() {
    return this.auth.isAuthenticated();
  }
}
