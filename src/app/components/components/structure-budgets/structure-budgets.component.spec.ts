import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StructureBudgetsComponent } from './structure-budgets.component';

describe('StructureBudgetsComponent', () => {
  let component: StructureBudgetsComponent;
  let fixture: ComponentFixture<StructureBudgetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StructureBudgetsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StructureBudgetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
