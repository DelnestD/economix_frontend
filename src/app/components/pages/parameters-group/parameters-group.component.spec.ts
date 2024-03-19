import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametersGroupComponent } from './parameters-group.component';

describe('ParametersGroupComponent', () => {
  let component: ParametersGroupComponent;
  let fixture: ComponentFixture<ParametersGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParametersGroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParametersGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
