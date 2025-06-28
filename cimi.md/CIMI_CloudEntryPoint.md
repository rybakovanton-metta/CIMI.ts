<!-- 
This content is derived from the DMTF Cloud Infrastructure Management Interface (CIMI) Specification
DSP0263 Version 2.0.0, Copyright © 2012, 2013, 2016 Distributed Management Task Force, Inc. (DMTF)
Original specification: https://www.dmtf.org/standards/cimi
-->

## 5.12 Cloud Entry Point  
The Cloud Entry Point (CloudEntryPoint Resource) represents the entry point into the cloud defined by the CIMI Model. It provides a Consumer with a single address (URI) from which the Consumer can discover and access all Resources usable by this Consumer. A Cloud Provider may provide different Cloud Entry Points to different Consumers. The Cloud Entry Point (or CEP) implements a catalog of Resources, such as Systems, SystemTemplates, Machines, MachineTemplates, etc., that can be queried and browsed by the Consumer.  
If a Consumer issues a read on the CloudEntryPoint Resource, the Provider shall return a CloudEntryPoint Resource that only catalogs Resources on which this Consumer is allowed to perform operations. Table 8 describes the attributes for the CloudEntryPoint Resource.  
If the delete operation is advertised on the CEP, deleting the CloudEntryPoint Resource also deletes all referred Resources.

**Table 8 – CloudEntryPoint attributes**

Name: CloudEntryPoint  
Type URI: http://www.dmf.org/cimi/2/CloudEntryPoint

| Attribute | Type | Description |
|-----------|------|--------------|
| baseURI | URI | An absolute URI that references the "base URI" of the Provider. This URI shall be used to convert relative URIs to Resources within this Provider to absolute URIs. See the "URIs" clause of 5.5. |
| resourceMetadata | collection [ResourceMetadata] | A reference to ResourceMetadata Collection of this Cloud Entry Point. |
| systems | collection [System] | A reference to the SystemCollection of this Cloud Entry Point. |
| systemTemplates | collection [SystemTemplate] | A reference to the SystemTemplateCollection of this Cloud Entry Point. |
| machines | collection [Machine] | A reference to the MachineCollection of this Cloud Entry Point. |
| machineTemplates | collection [MachineTemplate] | A reference to the MachineTemplateCollection of this Cloud Entry Point. |
| machineConfigs | collection [MachineConfiguration] | A reference to the MachineConfigurationCollection of this Cloud Entry Point. |
| machineImages | collection [MachineImage] | A reference to the MachineImageCollection of this Cloud Entry Point. |
| credentials | collection [Credential] | A reference to the CredentialCollection of this Cloud Entry Point. |
| credentialTemplates | collection [CredentialTemplate] | A reference to the CredentialTemplateCollection of this Cloud Entry Point. |
| volumes | collection [Volume] | A reference to the VolumeCollection of this Cloud Entry Point. |
| volumeTemplates | collection [VolumeTemplate] | A reference to the VolumeTemplateCollection of this Cloud Entry Point. |
| volumeConfigs | collection [VolumeConfiguration] | A reference to the VolumeConfigurationCollection of this Cloud Entry Point. |
| volumeImages | collection [VolumeImage] | A reference to the VolumeImageCollection of this Cloud Entry Point. |
| networks | collection [Network] | A reference to the NetworkCollection of this Cloud Entry Point. |
| networkTemplates | collection [NetworkTemplate] | A reference to the NetworkTemplateCollection of this Cloud Entry Point. |
| segments | collection [ProtocolSegment] | A reference to the ProtocolSegmentCollection of this Cloud Entry Point. |
| segmentTemplates | collection [ProtocolSegmentTemplate] | A reference to the ProtocolSegmentTemplateCollection of this Cloud Entry Point. |
| endpoints | collection [ProtocolEndpoint] | A reference to the ProtocolEndpointCollection of this Cloud Entry Point. |
| endpointTemplates | collection [ProtocolEndpointTemplates] | A reference to the ProtocolEndpointTemplateCollection of this Cloud Entry Point. |
| interfaces | collection [NetworkInterface] | A reference to the NetworkInterfaceCollection of this Cloud Entry Point. |
| interfaceTemplates | collection [NetworkInterfaceTemplates] | A reference to the NetworkInterfaceTemplateCollection of this Cloud Entry Point. |
| networkServices | collection [NetworkService] | A reference to the NetworkServiceCollection of this Cloud Entry Point. |
| networkServiceTemplates | collection [NetworkServiceTemplate] | A reference to the NetworkServiceTemplateCollection of this Cloud Entry Point. |
| jobs | collection [Job] | A reference to the JobsCollection of this Cloud Entry Point. |
| meters | collection [Meter] | A reference to the MeterCollection of this Cloud Entry Point. |
| meterTemplates | collection [MeterTemplate] | A reference to the MeterTemplateCollection of this Cloud Entry Point. |
| meterConfigs | collection [MeterConfiguration] | A reference to the MeterConfigurationCollection of this Cloud Entry Point. |
| eventLogs | collection [EventLog] | A reference to the EventLogCollection of this Cloud Entry Point. |
| eventLogTemplates | collection [EventLogTemplate] | A reference to the EventLogTemplateCollection of this Cloud Entry Point. |

Every above attribute of the CloudEntryPoint Resource has the following constraints by default (unless overridden per attribute):  
providerMandatory: false  
consumerMandatory: false  
mutable: true  
consumerWritable: true

Each of the Collections mentioned in Table 8 are defined within the related Resource definition clauses. For example, the MachineCollection Resource is defined in clause 5.14.2 as part of the Machine-related Resources. When implementing or using CloudEntryPoint, Providers and Consumers shall adhere to the syntax and semantics of its attributes as described in Table 8 as well as in the tables describing embedded Resources or related Collections. Both Consumer and Provider shall serialize this Resource as described below. The following pseudo-schemas (see notation in 1.3) describe the serialization of the Resource in both JSON and XML:

**JSON media type:** application/json

**JSON serialization:**
```json
{
  "resourceURI": "http://schemas.dmtf.org/cimi/2/CloudEntryPoint",
  "id": string,
  "name": string, ?
  "description": string, ?
  "created": string, ?
  "updated": string, ?
  "properties": { string: string, + }, ?
  "baseURI": string,
  "resourceMetadata": { "href": string }, ?
  "systems": { "href": string }, ?
  "systemTemplates": { "href": string }, ?
  "machines": { "href": string }, ?
  "machineTemplates": { "href": string }, ?
  "machineConfigs": { "href": string }, ?
  "machineImages": { "href": string }, ?
  "credentials": { "href": string }, ?
  "credentialTemplates": { "href": string }, ?
  "volumes": { "href": string }, ?
  "volumeTemplates": { "href": string }, ?
  "volumeConfigs": { "href": string }, ?
  "volumeImages": { "href": string }, ?
  "networks": { "href": string }, ?
  "networkTemplates": { "href": string }, ?
  "segments": { "href": string }, ?
  "segmentTemplates": { "href": string }, ?
  "endpoints": { "href": string }, ?
  "endpointTemplates": { "href": string }, ?
  "interfaces": { "href": string }, ?
  "interfaceTemplates": { "href": string }, ?
  "networkServices": { "href": string }, ?
  "networkServiceTemplates": { "href": string }, ?
  "jobs": { "href": string }, ?
  "meters": { "href": string }, ?
  "meterTemplates": { "href": string }, ?
  "meterConfigs": { "href": string }, ?
  "eventLogs": { "href": string }, ?
  "eventLogTemplates": { "href": string }, ?
  "operations": [
    { "rel": "edit", "href": string } ?
  ] ?
  ...
}
```

**XML media type:** application/xml

**XML serialization:**
```xml
<CloudEntryPoint xmlns="http://schemas.dmtf.org/cimi/2">
  <id> xs:anyURI </id>
  <name> xs:string </name> ?
  <description> xs:string </description> ?
  <created> xs:dateTime </created> ?
  <updated> xs:dateTime </updated> ?
  <properties>
    <property key="xs:string"> xs:string </property> *
  </properties>
  <baseURI> xs:anyURI </baseURI>
  <resourceMetadata href="xs:anyURI"/> ?
  <systems href="xs:anyURI"/> ?
  <systemTemplates href="xs:anyURI"/> ?
  <machines href="xs:anyURI"/> ?
  <machineTemplates href="xs:anyURI"/> ?
  <machineConfigs href="xs:anyURI"/> ?
  <machineImages href="xs:anyURI"/> ?
  <credentials href="xs:anyURI"/> ?
  <credentialTemplates href="xs:anyURI"/> ?
  <volumes href="xs:anyURI"/> ?
  <volumeTemplates href="xs:anyURI"/> ?
  <volumeConfigs href="xs:anyURI"/> ?
  <volumeImages href="xs:anyURI"/> ?
  <networks href="xs:anyURI"/> ?
  <networkTemplates href="xs:anyURI"/> ?
  <segments href="xs:anyURI"/> ?
  <segmentTemplates href="xs:anyURI"/> ?
  <endpoints href="xs:anyURI"/> ?
  <endpointTemplates href="xs:anyURI"/> ?
  <interfaces href="xs:anyURI"/> ?
  <interfaceTemplates href="xs:anyURI"/> ?
  <networkServices href="xs:anyURI"/> ?
  <networkServiceTemplates href="xs:anyURI"/> ?
  <jobs href="xs:anyURI"/> ?
  <meters href="xs:anyURI"/> ?
  <meterTemplates href="xs:anyURI"/> ?
  <meterConfigs href="xs:anyURI"/> ?
  <eventLogs href="xs:anyURI"/> ?
  <eventLogTemplates href="xs:anyURI"/> ?
  <operations>
    <operation rel="edit" href="xs:anyURI"/> *
  </operations>
  <xs:any>*
</CloudEntryPoint>
```
