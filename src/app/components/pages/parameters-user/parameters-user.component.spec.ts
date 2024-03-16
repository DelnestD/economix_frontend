import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametersUserComponent } from './parameters-user.component';

describe('ParametersUserComponent', () => {
  let component: ParametersUserComponent;
  let fixture: ComponentFixture<ParametersUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParametersUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParametersUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
