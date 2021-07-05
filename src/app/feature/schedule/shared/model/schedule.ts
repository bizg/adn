export class Schedule {

    id: string;
    subject: string;
    name: string;
    date: string;
    startHour: string;
    endHour: string;
    value: string;

    constructor(
        id: string,
        subject: string,
        name: string,
        date: string,
        startHour: string,
        endHour: string,
        value: string
    ) {
        this.id = id;
        this.subject = subject;
        this.name = name;
        this.date = date;
        this.startHour = startHour;
        this.endHour = endHour;
        this.value = value;
    }
}
