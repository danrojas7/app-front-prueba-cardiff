import { Injectable } from '@angular/core';
import { Person } from '../model/person';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(
    private localStorageService: LocalStorageService
  ) {
  }

  async savePerson(person: Person): Promise<Person> {
    let personList: Person[] = await this.getPerson();
    person.number = String(personList.length + 1);
    personList.push(person);
    this.localStorageService.saveData("personList", JSON.stringify(personList));
    return person;
  }

  async getPerson(): Promise<Person[]> {
    let personList: string | null = this.localStorageService.getData("personList");
    return personList ? JSON.parse(personList) : [];
  }

}
