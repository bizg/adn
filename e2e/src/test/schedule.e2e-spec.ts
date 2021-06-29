import { NavbarPage } from '../page/navbar/navbar.po';
import { SchedulePage } from '../page/schedule/schedule.po';
import { AppPage } from '../app.po';
import { browser } from 'protractor';

describe('workspace-project Schedule', () => {
    let page: AppPage;
    let navbar: NavbarPage;
    let schedule: SchedulePage;

    beforeEach(() => {
        page = new AppPage();
        navbar = new NavbarPage();
        schedule = new SchedulePage();
    });

    it('Should it create a schedule', () => {
        const SCHEDULE_SUBJECT = 'Pruebas unitarias';
        const SCHEDULE_NAME = 'Pruebas unitarias name';
        const SCHEDULE_DATE = '2021-06-01T05:00:00.000Z';
        const SCHEDULE_START_HOUR = '10:30';
        const SCHEDULE_END_HOUR = '11:31';
        const SCHEDULE_COUNT = schedule.countSchedule().then(val => val + 1);

        page.navigateTo();
        navbar.clickButtonSchedule();
        schedule.clickButtonCreateSchedule();
        schedule.insertSubjectSchedule(SCHEDULE_SUBJECT);
        schedule.insertNameSchedule(SCHEDULE_NAME);
        schedule.insertDateSchedule(SCHEDULE_DATE);
        schedule.insertStartHourSchedule(SCHEDULE_START_HOUR);
        schedule.insertEndHourSchedule(SCHEDULE_END_HOUR);
        schedule.clickButtonSaveSchedule();

        expect(SCHEDULE_COUNT).toBe(schedule.countSchedule());
    });

    it('Should it update a schedule', () => {
        const SCHEDULE_SUBJECT = 'Pruebas unitarias ACTUALIZACION';
        const SCHEDULE_NAME = 'Pruebas unitarias name';
        const SCHEDULE_DATE = '2021-06-01T05:00:00.000Z';
        const SCHEDULE_START_HOUR = '12:30';
        const SCHEDULE_END_HOUR = '13:31';
        const SCHEDULE_COUNT = schedule.countSchedule();
        const SCHEDULE_POSITION_EDIT = 1;

        page.navigateTo();
        navbar.clickButtonSchedule();
        schedule.clickButtonEditSchedule(SCHEDULE_POSITION_EDIT);
        browser.sleep(5000);
        schedule.insertSubjectSchedule(SCHEDULE_SUBJECT);
        schedule.insertNameSchedule(SCHEDULE_NAME);
        schedule.insertDateSchedule(SCHEDULE_DATE);
        schedule.insertStartHourSchedule(SCHEDULE_START_HOUR);
        schedule.insertEndHourSchedule(SCHEDULE_END_HOUR);
        browser.sleep(5000);
        schedule.clickButtonEditSaveSchedule();

        expect(SCHEDULE_COUNT).toBe(schedule.countSchedule());
    });

    it('Should it delete a schedule', () => {
        const SCHEDULE_COUNT = schedule.countSchedule().then(val => val - 1);
        const SCHEDULE_POSITION_DELETED = 1;

        page.navigateTo();
        navbar.clickButtonSchedule();
        schedule.clickButtonDeleteSchedule(SCHEDULE_POSITION_DELETED);

        expect(SCHEDULE_COUNT).toBe(schedule.countSchedule());
    });
});
