import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupUserListUpdateComponent } from './group-user-list-update.component';

describe('GroupUserListUpdateComponent', () => {
  let component: GroupUserListUpdateComponent;
  let fixture: ComponentFixture<GroupUserListUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupUserListUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GroupUserListUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
