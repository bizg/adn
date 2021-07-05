import { by, element } from 'protractor';

export class NavbarPage {
    linkSchedule = element(by.id('schedule'));

    async clickBotonProductos() {
        await this.linkSchedule.click();
    }

    async clickButtonSchedule() {
        await this.linkSchedule.click();
    }
}
