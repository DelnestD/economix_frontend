import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetsTransactionsComponent } from './budgets-transactions.component';

describe('BudgetsTransactionsComponent', () => {
  let component: BudgetsTransactionsComponent;
  let fixture: ComponentFixture<BudgetsTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetsTransactionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BudgetsTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
