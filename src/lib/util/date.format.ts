
export default class DateFormat
{
    private format: string
    constructor(date : Date)
    {
        this.format = date.toLocaleDateString('nl-NL');
    }

    get(): string
    {
        return this.format;
    }
}