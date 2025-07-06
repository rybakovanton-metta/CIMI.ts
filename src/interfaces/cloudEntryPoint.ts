import type { URI } from "./types.js";
import type { CIMI_Resource } from "./resource.js";
import type { 
    ResourceMetadataCollectionRef,
    SystemCollectionRef,
    SystemTemplateCollectionRef,
    MachineCollectionRef,
    MachineTemplateCollectionRef,
    MachineConfigurationCollectionRef,
    MachineImageCollectionRef,
    CredentialCollectionRef,
    CredentialTemplateCollectionRef,
    VolumeCollectionRef,
    VolumeTemplateCollectionRef,
    VolumeConfigurationCollectionRef,
    VolumeImageCollectionRef,
    NetworkCollectionRef,
    NetworkTemplateCollectionRef,
    ProtocolSegmentCollectionRef,
    ProtocolSegmentTemplateCollectionRef,
    ProtocolEndpointCollectionRef,
    ProtocolEndpointTemplateCollectionRef,
    NetworkInterfaceCollectionRef,
    NetworkInterfaceTemplateCollectionRef,
    NetworkServiceCollectionRef,
    NetworkServiceTemplateCollectionRef,
    JobCollectionRef,
    MeterCollectionRef,
    MeterTemplateCollectionRef,
    MeterConfigurationCollectionRef,
    EventLogCollectionRef,
    EventLogTemplateCollectionRef
} from "./references.js";

export interface CIMI_CloudEntryPointInterface extends CIMI_Resource {
    baseURI: URI;
    resourceMetadata?: ResourceMetadataCollectionRef;
    systems?: SystemCollectionRef;
    systemTemplates?: SystemTemplateCollectionRef;
    machines?: MachineCollectionRef;
    machineTemplates?: MachineTemplateCollectionRef;
    machineConfigs?: MachineConfigurationCollectionRef;
    machineImages?: MachineImageCollectionRef;
    credentials?: CredentialCollectionRef;
    credentialTemplates?: CredentialTemplateCollectionRef;
    volumes?: VolumeCollectionRef;
    volumeTemplates?: VolumeTemplateCollectionRef;
    volumeConfigs?: VolumeConfigurationCollectionRef;
    volumeImages?: VolumeImageCollectionRef;
    networks?: NetworkCollectionRef;
    networkTemplates?: NetworkTemplateCollectionRef;
    segments?: ProtocolSegmentCollectionRef;
    segmentTemplates?: ProtocolSegmentTemplateCollectionRef;
    endpoints?: ProtocolEndpointCollectionRef;
    endpointTemplates?: ProtocolEndpointTemplateCollectionRef;
    interfaces?: NetworkInterfaceCollectionRef;
    interfaceTemplates?: NetworkInterfaceTemplateCollectionRef;
    networkServices?: NetworkServiceCollectionRef;
    networkServiceTemplates?: NetworkServiceTemplateCollectionRef;
    jobs?: JobCollectionRef;
    meters?: MeterCollectionRef;
    meterTemplates?: MeterTemplateCollectionRef;
    meterConfigs?: MeterConfigurationCollectionRef;
    eventLogs?: EventLogCollectionRef;
    eventLogTemplates?: EventLogTemplateCollectionRef;
}