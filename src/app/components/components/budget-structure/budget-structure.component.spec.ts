import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetStructureComponent } from './budget-structure.component';

describe('BudgetStructureComponent', () => {
  let component: BudgetStructureComponent;
  let fixture: ComponentFixture<BudgetStructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetStructureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BudgetStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
