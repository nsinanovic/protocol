import { Component, OnInit } from '@angular/core';
import { Input } from '../inputs/input';

@Component({
    selector: 'app-inputs',
    templateUrl: './inputs.component.html'
})
export class InputsComponent implements OnInit {
    input: Input;

    ngOnInit() {
       this.input = new Input;
       this.input.name = '';
    }

    public insertInput() {
        this.input.insert()
            .then(() => {
                console.log("Inserted!");
            });
    }
}
