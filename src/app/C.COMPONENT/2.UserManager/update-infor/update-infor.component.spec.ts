import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateInforComponent } from './update-infor.component';

describe('UpdateInforComponent', () => {
  let component: UpdateInforComponent;
  let fixture: ComponentFixture<UpdateInforComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateInforComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateInforComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
