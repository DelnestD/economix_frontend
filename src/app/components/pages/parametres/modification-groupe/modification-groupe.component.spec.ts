import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificationGroupeComponent } from './modification-groupe.component';

describe('ModificationGroupeComponent', () => {
  let component: ModificationGroupeComponent;
  let fixture: ComponentFixture<ModificationGroupeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificationGroupeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModificationGroupeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
