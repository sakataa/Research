import 'whatwg-fetch';
import AirportActionCreators from '../actions/AirportActionCreators';

class AirCheapApi {
    static fetchAirports() {
        return fetch('./airports.json')
            .then((response) => {
                console.log(response.json());
                return response.json();
            });
    }
    static fetchTickets(origin, destination) {
        return fetch('./flights.json')
            .then((response) => response.json());
    }
}

export default AirCheapApi;