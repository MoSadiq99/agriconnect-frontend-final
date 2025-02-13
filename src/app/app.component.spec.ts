import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

describe('AppComponent', () => {
	let component: AppComponent;
	let fixture: ComponentFixture<AppComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			// declarations: [AppComponent] // ❌ Remove this line
      imports: [AppComponent, RouterModule] // ✅ Import instead of declare
		});
		fixture = TestBed.createComponent(AppComponent);
		component = fixture.componentInstance;
	});

	it('should create the app', () => {
		expect(component).toBeTruthy();
	});

	it('should have as title "AgriConnect"', () => {
		expect(component.title).toEqual('AgriConnect');
	});

});
