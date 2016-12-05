export abstract class Hardware {
    id: string;
    name: string;
}

export class Controller extends Hardware {
    pumps: Pump[];
    valves: Valve[];
    tanks: Tank[];
    moistureSensors: MoistureSensor[];
}

export class Pump extends Hardware {
}

export class Valve extends Hardware {
}

export class Tank extends Hardware {
}

export class MoistureSensor extends Hardware {
}
