import type { Base64String } from "./types.js";
import type { CIMI_Resource } from "./resource.js";
import type { MachineImageRef, CredentialRef, VolumeRef, VolumeTemplateRef, AddressRef, NetworkRef, NetworkPortRef, MachineConfigurationRef, MeterTemplateRef, EventLogTemplateRef, DiskCollectionRef, VolumeCollectionRef, NetworkInterfaceCollectionRef, MachineImageCollectionRef, MeterCollectionRef, EventLogRef } from "./references.js";
export enum CIMI_CpuArch {
    _68000 = '68000',
    Alpha = 'Alpha',
    ARM = 'ARM',
    Itanium = 'Itanium',
    MIPS = 'MIPS',
    PA_RISC = 'PA_RISC',
    POWER = 'POWER',
    PowerPC = 'PowerPC',
    x86 = 'x86',
    x86_64 = 'x86_64',
    zArchitecture = 'zArchitecture',
    SPARC = 'SPARC',
    undefined = 'undefined'
}
export enum CIMI_MachineState {
    CREATING = 'CREATING',
    STARTING = 'STARTING',
    STARTED = 'STARTED',
    STOPPING = 'STOPPING',
    STOPPED = 'STOPPED',
    PAUSING = 'PAUSING',
    PAUSED = 'PAUSED',
    SUSPENDING = 'SUSPENDING',
    SUSPENDED = 'SUSPENDED',
    CAPTURING = 'CAPTURING',
    RESTORING = 'RESTORING',
    DELETING = 'DELETING',
    ERROR = 'ERROR',
    FAILED = 'FAILED'
}

export interface CIMI_MachineConfiguration {
    cpu: number;
    memory: number;
    disks: CIMI_Disk[];  // Properly typed array per CIMI spec 5.5.11
    cpuArch: CIMI_CpuArch;
    cpuSpeed?: number;  // Optional per spec
}

export enum CIMI_MachineImageState {
    CREATING = 'CREATING',
    AVAILABLE = 'AVAILABLE',
    DELETING = 'DELETING',
    ERROR = 'ERROR'
}
export enum CIMI_MachineImageType {
    IMAGE = 'IMAGE',
    SNAPSHOT = 'SNAPSHOT',
    PARTIAL_SNAPSHOT = 'PARTIAL_SNAPSHOT'
}
export interface CIMI_MachineImage {
    state: CIMI_MachineImageState;
    type: CIMI_MachineImageType;
    imageLocation: string;
    relatedImage?: MachineImageRef
}

export interface CIMI_Volume {
    initialLocation?: string;
    credential?: CredentialRef;
    volume: VolumeRef;
}

export interface CIMI_VolumeTemplate {
    initialLocation?: string;
    volumeTemplate: VolumeTemplateRef;
}

export interface CIMI_Disk {
    capacity: number; // in kilobytes
    initialLocation?: string;
}

export interface CIMI_LocatedVolume {
    volume: VolumeRef;
    initialLocation?: string;
}

export interface CIMI_NetworkInterface {
    address?: AddressRef[];
    network: NetworkRef;
    networkPort?: NetworkPortRef;
    state: string;
    mtu?: number;
}

export interface CIMI_NetworkInterfaceTemplate {
    address?: AddressRef[];
    network: NetworkRef;
    networkPort?: NetworkPortRef;
    state: string;
    mtu?: number;
}

export interface CIMI_MachineTemplate extends CIMI_Resource {
    initialState?: CIMI_MachineState;
    machineConfig?: MachineConfigurationRef;
    machineImage?: MachineImageRef;
    credential?: CredentialRef;
    volumes?: CIMI_Volume[];
    volumeTemplates?: CIMI_VolumeTemplate[];
    interfaceTemplates?: CIMI_NetworkInterfaceTemplate[];
    userData?: Base64String;
    meterTemplates?: MeterTemplateRef[];
    eventLogTemplate?: EventLogTemplateRef;
    genResourceMetadata?: MachineConfigurationRef;
}

export interface CIMI_MachineInterface extends CIMI_Resource {
    state: CIMI_MachineState; // The operational state of the Machine
    cpu: number; // The amount of CPU that this Machine has
    memory: number; // The size of the memory (RAM) in kibibytes
    disks: DiskCollectionRef; // collection[Disk] per CIMI spec
    cpuArch: CIMI_CpuArch; // The CPU architecture
    cpuSpeed?: number; // The approximate CPU speed in megahertz (optional per spec)
    volumes: VolumeCollectionRef; // collection[locatedVolume] per CIMI spec
    interfaces: NetworkInterfaceCollectionRef; // collection[NetworkInterface] per CIMI spec
    latestSnapshot?: MachineImageRef; // A reference to the latest SNAPSHOT
    snapshots: MachineImageCollectionRef; // collection[MachineImage] per CIMI spec
    meters: MeterCollectionRef; // collection[Meter] per CIMI spec
    eventLog?: EventLogRef; // A reference to the EventLog (optional per spec)
}

