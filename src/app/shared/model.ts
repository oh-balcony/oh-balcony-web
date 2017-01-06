export class SystemState {
    controllers: Controller[];
    zones: Zone[];
}

export abstract class Hardware {
    id: string;
    name: string;
}

export class HardwareReference {
    controllerId: string;
    componentId: string;
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

export class Zone {
    hardwareReferences: HardwareReference[];
}

export class HardwareInZone {
    pumps: Pump[] = [];
    valves: Valve[] = [];
    tanks: Tank[] = [];
    moistureSensors: MoistureSensor[] = [];
}

export class TimeRange {
    from: Date;
    to: Date;
}
