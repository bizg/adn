import { by, element } from 'protractor';

export class SchedulePage {
    private linkCreateSchedule = element(by.id('createSchedule'));
    private buttonCreateSaveSchedule = element(by.id('createButtonSave'));
    private inputSubjectSchedule = element(by.id('createSubjet'));
    private inputNameSchedule = element(by.id('createName'));
    private inputDateSchedule = element(by.id('createDate'));
    private inputStartHourSchedule = element(by.id('createStartHour'));
    private inputEndHourSchedule = element(by.id('createEndHour'));
    private listSchedule = element.all(by.css('#listTableSchedule tbody .mat-row'));
    private buttonEditSaveSchedule = element(by.id('editButtonSave'));

    private buttonEditSchedule(index: number){
        return element(by.id(`edit-${index}`));
    }

    private buttonDeleteSchedule(index: number){
        return element(by.id(`delete-${index}`));
    }

    async clickButtonCreateSchedule() {
        await this.linkCreateSchedule.click();
    }

    async clickButtonSaveSchedule() {
        await this.buttonCreateSaveSchedule.click();
    }

    async clickButtonEditSaveSchedule() {
        await this.buttonEditSaveSchedule.click();
    }

    async insertSubjectSchedule(subjectSchedule) {
        await this.inputSubjectSchedule.sendKeys(subjectSchedule);
    }

    async insertNameSchedule(nameSchedule) {
        await this.inputNameSchedule.sendKeys(nameSchedule);
    }

    async insertDateSchedule(dateSchedule) {
        await this.inputDateSchedule.sendKeys(dateSchedule);
    }

    async insertStartHourSchedule(startHourSchedule) {
        await this.inputStartHourSchedule.sendKeys(startHourSchedule);
    }

    async insertEndHourSchedule(endHourSchedule) {
        await this.inputEndHourSchedule.sendKeys(endHourSchedule);
    }

    async countSchedule() {
        return this.listSchedule.count();
    }

    async clickButtonEditSchedule(index: number) {
        const button = this.buttonEditSchedule(index);
        await button.click();
    }

    async clickButtonDeleteSchedule(index: number) {
        const button = this.buttonDeleteSchedule(index);
        await button.click();
    }
}
