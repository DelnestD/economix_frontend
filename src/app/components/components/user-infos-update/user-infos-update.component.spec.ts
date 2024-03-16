import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInfosUpdateComponent } from './user-infos-update.component';

describe('UserInfosUpdateComponent', () => {
  let component: UserInfosUpdateComponent;
  let fixture: ComponentFixture<UserInfosUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserInfosUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserInfosUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
