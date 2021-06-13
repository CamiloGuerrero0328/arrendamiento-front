import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseMesComponent } from './response-mes.component';

describe('ResponseMesComponent', () => {
  let component: ResponseMesComponent;
  let fixture: ComponentFixture<ResponseMesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponseMesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponseMesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
