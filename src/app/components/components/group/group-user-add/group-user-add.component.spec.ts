import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupUserAddComponent } from './group-user-add.component';

describe('GroupUserAddComponent', () => {
  let component: GroupUserAddComponent;
  let fixture: ComponentFixture<GroupUserAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupUserAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GroupUserAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
