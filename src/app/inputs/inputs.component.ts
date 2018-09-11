import { Component, OnInit } from '@angular/core';
import { Input } from '../inputs/input';

@Component({
    selector: 'app-inputs',
    templateUrl: './inputs.component.html'
})
export class InputsComponent implements OnInit {
    input: Input;
    customers: Array<any>;

    ngOnInit() {
        this.input = new Input;
        this.customers = [{
            id: 1,
            firstname: 'Nusreta',
            lastname: 'Sinanovic',
            firmname: 'sd doo'
        }];
    }

    public insertInput() {       
        this.input.dateCreated = new Date();
        this.input.userId = 1;
        console.log(this.input);
        this.input.insert()
            .then(() => {
                console.log("Inserted!");
                this.input = new Input;
            });
    }

    public onFileChanged(event: any) {
        this.input.filename = event.target.files[0].name;
        this.input.filepath = '';
        this.input.uniquefilename = '';
    }
}
