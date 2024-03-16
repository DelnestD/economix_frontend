import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationGroupeComponent } from './creation-groupe.component';

describe('CreationGroupeComponent', () => {
  let component: CreationGroupeComponent;
  let fixture: ComponentFixture<CreationGroupeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreationGroupeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreationGroupeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
