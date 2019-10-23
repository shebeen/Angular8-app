export default class Transaction{
    id : number;
    type : number;
    description : string;
    date : Date;
    amount: number;
    constructor(type:number,description:string,amount:number){
        this.type = type;
        this.description = description;
        this.amount = amount;
    }
    
}