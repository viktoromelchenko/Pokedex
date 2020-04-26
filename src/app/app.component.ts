import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Ipokemon {
 
  id: number;
  name: string;
  url: string;
}

// export class Pokemon implements Ipokemon{
//   constructor(
//     public id: number,
//     public name: string,
//     public url: string,
//   ){}
// }


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  Pokemons: Array<Ipokemon> = [];
  next:string;
  previous:string;
  id: number;
  count:number = 0;
  pokemon: Ipokemon
  view: Ipokemon
  
  url:string = 'http://pokeapi.co/api/v2/pokemon/?limit=12'
 

  constructor( private http: HttpClient){}

  ngOnInit(){
    this.http.get<any>(`${this.url}`)
      .subscribe( data => {
        this.Pokemons = data.results;
        this.next = data.next;
        this.previous = data.previous;
        if(this.count==0){
          for(let i=0; i<this.Pokemons.length;i++){
            this.Pokemons[i].id = i+1
          }
        }
        else if(this.count>0 ){
          for(let i=0; i<this.Pokemons.length;i++){
            this.Pokemons[i].id = i+1*(this.count*12+1)
          }
        }
        console.log(this.Pokemons)
      })

  }
  nextList(){
     this.url = this.next;
     this.count++;
     console.log(this.count)
     this.ngOnInit();
  }

  previousList(){
    this.url = this.previous;
    this.count--;
    console.log(this.count)
    this.ngOnInit();
  }
  
  onePokemon( pokemon: Ipokemon ) {
    console.log(pokemon)
    this.view = pokemon
      // this.http.get<Ipokemon>(`${this.pokemon.url}/${this.pokemon.id}`)
      //   .subscribe(pokemon => {
      //       this.view = pokemon
      //       console.log(this.view)
      //  });
      console.log(pokemon.url,pokemon.id)
  }
}
