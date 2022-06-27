import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Table } from 'primeng/table';
import { Genre } from 'src/app/model/genre';
import { Person } from 'src/app/model/person';
import { PersonValidationMessage } from 'src/app/model/person-validation-message';
import { PersonService } from 'src/app/service/person.service';

@Component({
  selector: 'app-people-calendar',
  templateUrl: './people-calendar.component.html',
  styleUrls: ['./people-calendar.component.scss']
})
export class PeopleCalendarComponent implements OnInit {

  @ViewChild('dt')
  public table!: Table;

  public displayNewPersonDialog: boolean = false;
  public personList: Person[] = [];
  public genres: Genre[];

  public newPersonFormGroup: FormGroup;

  public validationMessages: PersonValidationMessage;

  constructor(
    private formBuilder: FormBuilder,
    private personService: PersonService
  ) {
    this.genres = [
      {
        code: "F",
        name: "Femenino"
      },
      {
        code: "M",
        name: "Masculino"
      }
    ];

    this.newPersonFormGroup = this.formBuilder.group({
      firstName: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.maxLength(50)
        ])
      ),
      lastName: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.maxLength(50)
        ])
      ),
      documentNumber: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern("^[0-9]*$")
        ])
      ),
      genre: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.maxLength(1)
        ])
      ),
      age: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.maxLength(3),
          Validators.pattern("^[0-9]*$")
        ])
      )
    });

    this.validationMessages = {
      number: [
        { type: "required", message: "El consecutivo es requerido" },
        { type: "pattern", message: "El consecutivo ingresado no es válido" }
      ],
      firstName: [
        { type: "required", message: "El nombre es requerido" },
        { type: "maxlength", message: "La longitud máxima para el nombre es de 50 caracteres" }
      ],
      lastName: [
        { type: "required", message: "El apellido es requerido" },
        { type: "maxlength", message: "La longitud máxima para el apellido es de 50 caracteres" }
      ],
      documentNumber: [
        { type: "required", message: "El número de documento es requerido" },
        { type: "pattern", message: "El número de documento ingresado no es válido" },
        { type: "minlength", message: "La longitud mínima para el número de documento es de 3 caracteres" },
        { type: "maxlength", message: "La longitud máxima para el número de documento es de 20 caracteres" }
      ],
      genre: [
        { type: "required", message: "El género es requerido" },
        { type: "maxlength", message: "La longitud máxima para el género es de 1 caracter" }
      ],
      age: [
        { type: "required", message: "La edad es requerida" },
        { type: "maxlength", message: "La longitud máxima para el campo edad es de 3 caracteres" },
        { type: "pattern", message: "La edad ingresada no es válido" }
      ]
    };
  }

  showNewPersonDialog(): void {
    this.newPersonFormGroup.reset();
    this.displayNewPersonDialog = true;
  }

  hideNewPersonDialog(): void {
    this.displayNewPersonDialog = false;
  }

  async ngOnInit(): Promise<void> {

    let personDemoList: Person[] = [
      {
        firstName: "Andrés",
        lastName: "Guzmán",
        documentNumber: "10155584",
        genre: "M",
        age: "26"
      },
      {
        firstName: "Mr John",
        lastName: "Doe",
        documentNumber: "10155345584",
        genre: "M",
        age: "26"
      },
      {
        firstName: "Linus",
        lastName: "Torvalds",
        documentNumber: "101234584",
        genre: "M",
        age: "26"
      },
      {
        firstName: "Rasmus",
        lastName: "Lerdorf",
        documentNumber: "456334",
        genre: "M",
        age: "26"
      },
      {
        firstName: "Erich",
        lastName: "Gamma",
        documentNumber: "45436",
        genre: "M",
        age: "26"
      }
    ];

    let personListSaved: Person[] = await this.getPersonList();
    if (personListSaved.length == 0) {
      for (let auxPerson of personDemoList) {
        await this.savePerson(auxPerson).then(p => this.personList.push(p));
      }
    } else {
      this.personList = personListSaved;
    }
  }

  async savePerson(person: Person) {
    return await this.personService.savePerson(person);
  }

  async getPersonList(): Promise<Person[]> {
    return await this.personService.getPerson();
  }

  save(person: Person): void {
    this.savePerson(person).then(p => this.personList.push(p));
    this.displayNewPersonDialog = false;
  }

}
