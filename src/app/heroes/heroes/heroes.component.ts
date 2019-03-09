import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../heroes.service';
import { Hero } from '../hero';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  providers: [ HeroesService ],
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[];
  editHero: Hero;
  // editHero: Hero; // the hero currently being edited
  constructor(private heroesService: HeroesService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroesService.getHeroes()
        .subscribe(heroes => this.heroes = heroes)
  }

  add(name: string): void {
    // The server will generate the id of this new hero
    const newHero: Hero = { name } as Hero;
    this.heroesService.addHero(newHero)
        .subscribe(hero => this.heroes.push(hero))
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero)
    this.heroesService.deleteHero(hero.id).subscribe();
  }

  edit(hero) {
    this.editHero = hero
  }

  update() {
    if (this.editHero) {
      this.heroesService.updateHero(this.editHero)
          .subscribe(hero => {
            // replace the hero in the heroes list with update from server
            const ix = hero ? this.heroes.findIndex(h => h.id === hero.id) : -1;
            if(ix > -1) {
              this.heroes[ix] = hero;
            }
          })
          this.editHero = undefined;
    }
  }

  search(searchTerm: string) {
    this.editHero = undefined;
    if(searchTerm) {
      this.heroesService.searchHeroes(searchTerm)
          .subscribe(heroes => this.heroes = heroes)
    }
  }

}
