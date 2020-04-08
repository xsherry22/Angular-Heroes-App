import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Hero } from './../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  hero: Hero;
  //@Input() decorator needed if external HeroesComponent.html will bind to it
  //activated route: info about route to this instance of heroDetailComponent
  //    route parameters extraced from url (id)
  //location: angular service for interacting with browser
  constructor(
    private route: ActivatedRoute,
    private location: Location, 
    private heroService: HeroService,
  ) { }

  ngOnInit(): void {
      this.getHero();
  }
  //javascript '+' converts string to number
  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void{
    this.location.back();
  }
  
  save(): void {
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }

}
