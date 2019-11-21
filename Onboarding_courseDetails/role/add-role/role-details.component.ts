import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToasterService } from 'angular2-toaster';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ICognizantRole} from 'src/app/providers/model/cognizantRole';
import { RoleService } from 'src/app/providers/service/onboarding/role.service';

@Component({
  selector: 'app-role-details',
  templateUrl: './role-details.component.html'
})
export class RoleDetailsComponent implements OnInit {
  roleId: string;
  mode: string;
  roleDetail: ICognizantRole;
  roleForm: FormGroup;
  submitted = false;
  status: string;
  formDigestDetail: any;


  constructor(private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private roleService: RoleService,
    private httpClient: HttpClient,
    private toasterService: ToasterService,
    private spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
    this.getFormDigest();
    this.createForm();
    this.route.params.subscribe(params => {
      this.roleId = params["id"]
    });

    if (this.roleId != "" && this.roleId != undefined && this.roleId != null) {
      this.roleService.getRoleById(this.roleId)
        .subscribe(model => {
          console.log(model);
          console.log(model.value);
          this.roleDetail = model.value;
          this.mode = "Update";
          this.bindData();
        });
    }
    else {
      this.mode = "Add";
    }
  }

  createForm() {
    this.roleForm = this.formBuilder.group({
      id: ['', [Validators.required]],
      code: ['', [Validators.required]],
      name: ['', [Validators.required]]
    });
  }

  get f() { return this.roleForm.controls; }

  private bindData() {
    const result = Object.assign({}, this.roleDetail);
    console.log(result);
    this.roleForm.setValue({
      id: result.roleId,
      code: result.code,
      name: result.name,
    });
  }

  onSubmit() {
    // // this.toasterService.pop("success", "Course Details", "Course Details Added Successfully");
    // // this.toasterService.pop("error", "Course Details", "Course Details Added Successfully");
    // // this.toasterService.pop("info", "Course Details", "Course Details Added Successfully");
    // // this.toasterService.pop("warning", "Course Details", "Course Details Added Successfully");
    this.submitted = true;
    if (this.roleForm.invalid) {
      return;
    }

    if (this.mode == "Update") {
      this.updateCourseDetail();
    }
    else {
      this.addCourseDetail();
    }
  }

  public addCourseDetail() {
    let listName = "Role";
    var itemType = this.getItemTypeForListName(listName);
    var item = {
      "__metadata": { "type": itemType },
      "RoleId": this.roleForm.get('id').value,
      "Code": this.roleForm.get('code').value,
      "Title": this.roleForm.get('name').value,
    };

    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json;charset=UTF-8;odata=verbose',
      'Cache-Control': 'no-cache',
      'accept': 'application/json;odata=verbose',
      "X-HTTP-Method": "POST",
      "X-RequestDigest": this.formDigestDetail.FormDigestValue
    });
    let options = {
      headers: httpHeaders,
    };
    this.spinnerService.show();
    var siteUrl = "https://cognizantonline.sharepoint.com/sites/TestWeb/_api/lists/getbytitle('" + listName + "')/items";
    this.httpClient.post<any>(siteUrl, JSON.stringify(item), options).subscribe((response: Response) => {
      this.spinnerService.hide();
      this.toasterService.pop("success", "Role Details", "Role Details Added Successfully");
      this.formDataClear();
      this.router.navigate(['/onboarding/role-detail']);
    }, error => {
      this.spinnerService.hide();
      this.toasterService.pop("error", "Role Details", "Error Occurred While Adding Role Details");
      console.log(error);
    });
  }

  public updateCourseDetail() {
    let listName = "Role";
    var itemType = this.getItemTypeForListName(listName);
    var item = {
      "__metadata": { "type": itemType },
      "RoleId": this.roleForm.get('id').value,
      "Code": this.roleForm.get('code').value,
      "Title": this.roleForm.get('name').value,
    };

    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json;charset=UTF-8;odata=verbose',
      'Cache-Control': 'no-cache',
      'Accept': 'application/json;odata=verbose',
      "X-HTTP-Method": "MERGE",
      "If-Match": "*",
      "X-RequestDigest": this.formDigestDetail.FormDigestValue
    });
    let options = {
      headers: httpHeaders,
    };
    this.spinnerService.show();
    var siteUrl = "https://cognizantonline.sharepoint.com/sites/TestWeb/_api/lists/getbytitle('" + listName + "')/items(" + this.roleId + ")";
    this.httpClient.post<any>(siteUrl, JSON.stringify(item), options).subscribe((response: Response) => {
      this.spinnerService.hide();
      this.toasterService.pop("success", "Role Details", "Role Details Updated Successfully");
      this.formDataClear();
      this.router.navigate(['/onboarding/role-detail']);
    }, error => {
      this.spinnerService.hide();
      this.toasterService.pop("error", "Role Details", "Error Occurred While Updating Role Details");
      console.log(error);
    });
  }

  public getItemTypeForListName(name) {
    return "SP.Data." + name.charAt(0).toUpperCase() + name.slice(1) + "ListItem";
  }

  public getFormDigest() {
    let options = {
      "accept": "application/json;odata=verbose",
      "contentType": "text/xml"
    };
    this.spinnerService.show();
    var siteUrl = "https://cognizantonline.sharepoint.com/sites/TestWeb/_api/contextinfo";
    this.httpClient.post(siteUrl, options).subscribe((response: Response) => {
      this.formDigestDetail = response;
      this.spinnerService.hide();
    }, error => {
      this.spinnerService.hide();
      console.log(error);
    });
  }

  private formDataClear() {
    this.roleForm.setValue({
      id: "",
      code: "",
      name: "",
    });
    this.submitted = false;
  }
}