export const SELECTORS = {
    NAVBAR: {
        linkSchedule: (): HTMLLinkElement => document.querySelector('#schedule')
    },
    SCHEDULE: {
        LIST: {
            table: (): HTMLTableElement => document.querySelector('#listTableSchedule'),
            tableItemId: (index: number): HTMLElement => document.querySelector(`#item-id-${index}`),
            tableItemName: (index: number): HTMLElement => document.querySelector(`#item-name-${index}`),
            tableItemSubject: (index: number): HTMLElement => document.querySelector(`#item-subject-${index}`),
            tableItemDate: (index: number): HTMLElement => document.querySelector(`#item-date-${index}`),
            tableItemStartHour: (index: number): HTMLElement => document.querySelector(`#item-startHour-${index}`),
            tableItemEndHour: (index: number): HTMLElement => document.querySelector(`#item-endHour-${index}`),
            tableItemValue: (index: number): HTMLElement => document.querySelector(`#item-value-${index}`),
            tableItemButtonDelete: (index: number): HTMLButtonElement => document.querySelector(`#delete-${index}`),
            tableItemButtonEdit: (index: number): HTMLButtonElement => document.querySelector(`#edit-${index}`),
        },
        CREATE: {
            inputSubject: (): HTMLInputElement => document.querySelector('#createSubject'),
            inputName: (): HTMLInputElement => document.querySelector('#createName'),
            inputDate: (): HTMLInputElement => document.querySelector('#createDate'),
            inputStartHour: (): HTMLSelectElement => document.querySelector('#createStartHour'),
            inputEndHour: (): HTMLSelectElement => document.querySelector('#createEndHour'),
            buttonSave: (): HTMLButtonElement => document.querySelector('#createButtonSave'),
            buttonCloseModal: (): HTMLButtonElement => document.querySelector('#createButtonClose'),
            buttonOpenModal: (): HTMLButtonElement => document.querySelector('#createSchedule')
        },
        UPDATE: {
            inputSubject: (): HTMLInputElement => document.querySelector('#updateSubject'),
            inputName: (): HTMLInputElement => document.querySelector('#updateName'),
            inputDate: (): HTMLInputElement => document.querySelector('#updateDate'),
            inputStartHour: (): HTMLInputElement => document.querySelector('#updateStartHour'),
            inputEndHour: (): HTMLInputElement => document.querySelector('#updateEndHour'),
            buttonSave: (): HTMLButtonElement => document.querySelector('#editButtonSave'),
            buttonCloseModal: (): HTMLButtonElement => document.querySelector('#editButtonClose')
        }
    }
};
