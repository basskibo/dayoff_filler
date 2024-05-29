// cypress/integration/dayoff_spec.js
import { globalConfiguration } from "../../config/configuration";
import dayjs from "dayjs";

describe('Day Off Platform Automation', () => {
	it('Logs in and adds a day off', () => {
		cy.visit('https://tracker.day-off.app/auth/login');
		// Select the login type (Company or Employee)
		cy.get('input[data-cy="loginType-employee"]').check({ force: true }); // or 'loginType-employee'
		cy.get('input[data-cy="email"]').type(globalConfiguration.username);
		cy.get('input[data-cy="password"]').type(globalConfiguration.password);
		// Submit the login form
		cy.get('button[data-cy="login_signin"]').click();
		// Wait for the login to complete and redirect
		cy.url().should('include', '/dashboard');
		cy.wait(1000)
		let currentDate = dayjs(globalConfiguration.startDate);
		console.log('today', currentDate.format('DD/MM/YYYY'))
		const today = globalConfiguration.endDate || dayjs();

		while (currentDate.isBefore(today) || currentDate.isSame(today, 'day')) {
			const formattedDate = currentDate.format('DD/MM/YYYY');
			// Check if the selected date is a working day
			if (isWorkingDay(currentDate)) {
				// cy.get('a[routerlink="/request-employee"]').click({ force: true, multiple: true });
				cy.visit('https://tracker.day-off.app/request-employee')
				// Open the ng-select dropdown
				cy.wait(1500)
				cy.get('ng-select[id="LeaveType"]').click();
				cy.contains('div.ng-option', globalConfiguration.workingFrom).click();
				cy.get('input[id="hoursDate"]').clear()
				cy.get('input[id="hoursDate"]').type(formattedDate)

				cy.get('#startHour .ngb-tp-hour input')
				.clear()
				.type('09');
				cy.get('#startHour .ngb-tp-minute input')
				.clear()
				.type('00');
				cy.get('.ngb-tp-meridian button').click({multiple: true});
			
				cy.get('#endHour .ngb-tp-hour input')
				.clear()
				.type('17');
				cy.get('#endHour .ngb-tp-minute input')
				.clear()
				.type('00');
				cy.get('textarea#message').click();
				cy.wait(500)
				cy.get('.m-form__actions button[type="submit"]').click();
				cy.visit('https://tracker.day-off.app/dashboard-employee')
			}
			// Move to the next day
			currentDate = currentDate.add(1, 'day');
		}
	});
});



function isWorkingDay(date) {
	const dayOfWeek = date.day();
	return dayOfWeek !== 0 && dayOfWeek !== 6; // Assuming working days are Monday to Friday
}
