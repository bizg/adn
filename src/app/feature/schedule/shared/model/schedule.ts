export class Schedule {

    id: number;
    subject: string;
    name: string;
    date: string;
    start_hour: string;
    end_hour: string;
    value: string;

    constructor(
        id: number,
        subject: string,
        name: string,
        date: string,
        start_hour: string,
        end_hour: string,
        value: string
    ) {
        this.id = id;
        this.subject = subject;
        this.name = name;
        this.date = date;
        this.start_hour = start_hour;
        this.end_hour = end_hour;
        this.value = value;
    }
}
