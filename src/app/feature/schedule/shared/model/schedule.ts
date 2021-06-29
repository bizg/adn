export class Schedule {

    id: number;
    subject: string;
    name: string;
    date: string;
    startHour: string;
    endHour: string;
    value: string;

    constructor(
        id: number,
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
