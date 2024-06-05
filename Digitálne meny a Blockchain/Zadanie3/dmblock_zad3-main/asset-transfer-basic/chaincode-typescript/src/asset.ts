/*
  SPDX-License-Identifier: Apache-2.0
*/

import {Object, Property} from 'fabric-contract-api';

@Object()
export class Flight {
    @Property()
    public ID: string;

    @Property()
    public from: string;

    @Property()
    public to: string;

    @Property()
    public dateTime: string;

    @Property()
    public availablePlaces: number;
}

@Object()
export class Reservation {
    @Property()
    public ID: string;

    @Property()
    public customerNames: string[];

    @Property()
    public customerEmail: string;

    @Property()
    public flightID: string;

    @Property()
    public nrOfSeats: number;

    @Property()
    public status: string;
}
