import { Component, Inject } from '@angular/core';
import { PermissionsService } from '@ng-web-apis/permissions';

@Component({
  selector: 'soundmemos-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    @Inject(PermissionsService) private permissionService: PermissionsService
  ) {
    const geolocationStatus$ = this.permissionService.state('geolocation');
    geolocationStatus$.subscribe((geolocationStatus) =>
      console.log(geolocationStatus)
    );
  }
}
