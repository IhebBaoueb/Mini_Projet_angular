import { numberToString } from "igniteui-angular-core";

export class OptionsItem {
    public constructor(init: Partial<OptionsItem>) {
        Object.assign(this, init);
    }

    public value: number;
    public category: string;
    public summary: string;

}
export class OptionChart extends Array<OptionsItem> {
    public constructor(option1:string,option2:string,option3:string,option4:string) {
        super();
        this.push(new OptionsItem(
        {
            value: this.getValue(option1),
            category: `IA`,
            summary: option1
        }));
        this.push(new OptionsItem(
        {
            value:  this.getValue(option2),
            category: `Reseaux`,
            summary: option2
        }));
        this.push(new OptionsItem(
        {
            value:  this.getValue(option3),
            category: `Cloud`,
            summary: option3
        }));
        this.push(new OptionsItem(
        {
            value:  this.getValue(option4),
            category: `Securité`,
            summary: option4
        }));
    }

    getValue(text:string){
        return Number(text.split(" ")[1].split("%")[0])
         
    }
}