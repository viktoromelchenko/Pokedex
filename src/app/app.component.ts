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

// export interface Istat {

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
  view: Ipokemon;
  infoPokemon: Array<any>;
  stat =[];
  statName = [];
  weight: number;
  types = [];
  type = []
  
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
        // console.log(this.Pokemons)
      })

  }
  nextList(){
     this.url = this.next;
     this.count++;
    //  console.log(this.count)
     this.ngOnInit();
  }

  previousList(){
    this.url = this.previous;
    this.count--;
    // console.log(this.count)
    this.ngOnInit();
  }
  
  onePokemon( pokemon: Ipokemon ) {
    this.statName = [];
    this.type = []
    this.view = pokemon
      this.http.get<any>(`${pokemon.url}`)
        .subscribe(stats => {
            this.infoPokemon = stats
            this.stat = stats.stats
            this.types = stats.types
            this.weight = stats.weight
            this.stat.reverse()
            this.stat.splice(0,3,this.stat[1],this.stat[2],this.stat[0])
            for(let i=0;i<this.stat.length; i++){
              this.statName.push(this.stat[i].stat)
            }
            for(let i=0;i<this.types.length; i++){
              this.type.push(this.types[i].type)
            }
            // console.log(this.view.name)
            // console.log(this.infoPokemon)
            console.log(this.type)
       });
      
  }
}
