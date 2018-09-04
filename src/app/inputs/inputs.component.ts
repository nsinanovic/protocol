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
    }

    public insertInput() {
        console.log(this.input);
        this.input.insert()
            .then(() => {
                console.log("Inserted!");
            });
    }

    public onFileChanged(event: any) {
        this.input.filename = event.target.files[0].name;
    }
}
