import { Component, OnInit } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ICognizantRole} from 'src/app/providers/model/cognizantRole';
import { RoleService } from 'src/app/providers/service/onboarding/role.service';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent implements OnInit {
  roleDetails: ICognizantRole[];
  currentPage: number = 0;
  totalItems: number;

  constructor(private roleDetailService: RoleService,
    private spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
    this.getRoleListDetails();
  }

  pageChanged(event: PageChangedEvent): void {
    this.currentPage = event.page;
    this.getRoleListDetails();
  }

  private getRoleListDetails() {
    const startItem = this.currentPage * 10;
    this.spinnerService.show();
    this.roleDetailService.getRoles(startItem).subscribe(model => {
      this.spinnerService.hide();
      this.roleDetails = model.roleDetail;
      this.totalItems = model.count;
    });
  }
}