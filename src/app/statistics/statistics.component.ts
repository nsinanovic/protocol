import { Component, OnInit } from '@angular/core';
import { Hero } from '../model/hero';

// tslint:disable-next-line:no-implicit-dependencies
import { Menu, MenuItemConstructorOptions, remote } from 'electron';

@Component({
    selector: 'app-statistics',
    templateUrl: './statistics.component.html'
})
export class StatisticsComponent implements OnInit {
    public heroes: Array<Hero>;

    ngOnInit() {
        this.getHeroes();
    }

    private deleteHero(hero: Hero) {
        hero.delete();
        this.getHeroes();
    }

    private initMenu(hero: Hero): Menu {
        const template: MenuItemConstructorOptions[] = [
            {
                label: `Delete ${hero.name}`,
                click: () => this.deleteHero(hero),
            },
        ];

        return remote.Menu.buildFromTemplate(template);
    }

    public onMenu(hero: Hero) {
        const menu = this.initMenu(hero);
        menu.popup({});
    }

    public getHeroes() {
        Hero.getAll()
            .then((heroes) => {
                this.heroes = heroes;
            });
    }

}
