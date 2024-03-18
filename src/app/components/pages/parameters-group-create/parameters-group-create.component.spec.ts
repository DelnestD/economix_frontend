import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametersGroupCreateComponent } from './parameters-group-create.component';

describe('ParametersGroupCreateComponent', () => {
  let component: ParametersGroupCreateComponent;
  let fixture: ComponentFixture<ParametersGroupCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParametersGroupCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParametersGroupCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
