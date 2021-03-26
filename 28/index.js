class StarWars {
    mainPath = 'https://swapi.dev/api/';

    async getData(category) {
        const response = await fetch(this.mainPath + category);
        return response.json();
    }

    async getFilms() {
        const result = await this.getData('films');
        return result;
    }

    async getStarships() {
        const result = await this.getData('starships');
        return result;
    }

    async createObjectToUi() {
        const filmsResp = await this.getFilms();
        const shipsResp = await this.getStarships();
        const result = await Promise.all(
            filmsResp.results.map(async (film) => ({
                name: film.title,
                ships: await this.matchShipAndFilms(film, shipsResp.results),
            }))
        );
        return result;
    }

    async matchShipAndFilms(film, ships) {
        const result = await Promise.all(
            film.starships.map(async (s) => {
                const ship = ships.find((el) => el.url === s);
                if (!ship) {
                    const url = s.split('api/')[1];
                    const fetchedShip = await this.getData(url);
                    return fetchedShip.name;
                }
                return ship.name;
            })
        );
        return result;
    }
}

class Render {
    constructor(data) {
        this.renderList(data);
    }

    async renderList(result) {
        const films = await result;
        console.log(films);
        const ul = document.createElement('ul');
        document.body.append(ul);
        films.forEach((film) => {
            const filmContainer = document.createElement('li');
            const shipsContainer = document.createElement('ul');
            filmContainer.innerText = film.name;
            filmContainer.appendChild(shipsContainer);
            ul.append(filmContainer);
            film.ships.forEach((ship) => {
                const shipContainer = document.createElement('li');
                shipContainer.innerText = ship;
                shipsContainer.appendChild(shipContainer);
            });
        });
    }
}

new Render(new StarWars().createObjectToUi());

