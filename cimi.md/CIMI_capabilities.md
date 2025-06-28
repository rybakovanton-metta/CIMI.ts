<!-- 
This content is derived from the DMTF Cloud Infrastructure Management Interface (CIMI) Specification
DSP0263 Version 2.0.0, Copyright © 2012, 2013, 2016 Distributed Management Task Force, Inc. (DMTF)
Original specification: https://www.dmtf.org/standards/cimi
-->

## 5.11.1 Capabilities

Table 7 describes the capability URIs defined by this specification. Providers may define new URIs and it is recommended that these URIs be dereferencable such that Consumers can discover the details of the new capability. The “Resource Name” column contains the name of the Resource that may contain the specified capability within its ResourceMetadata. The “Capability Name” column contains the name of the specified capability and shall be unique within the scope of the corresponding Resource. Each capability’s URI shall be constructed by appending the “Resource Name”, a slash (`/`), and the “Capability Name” to:

```
http://schemas.dmtf.org/cimi/2/capability/
```

For example, the Machine’s “InitialState” capability shall have a URI of:

```
http://schemas.dmtf.org/cimi/2/capability/Machine/InitialState
```

Capabilities that apply to the Provider in general, and are not specific to any one Resource, shall be associated with the CloudEntryPoint Resource. Each one of these capabilities may be set to some value, or may be absent. The meaning of an absent capability is defined as follows:

- For boolean-valued capabilities: same as a “false” value.  
- For other capabilities that use a single value or a list of values among an enumeration: same as no particular preference or restriction being enforced for this value.

**Table 7 – Capability URIs**

| Resource Name       | Capability Name                     | Description                                                                                                                                                 |
|---------------------|-------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| CloudEntryPoint     | ExpandParameterQuery                | If true, the Provider shall support the `$expand` query parameter.                                                                                          |
| CloudEntryPoint     | FilterParameterQuery                | If true, the Provider shall support the `$filter` query parameter.                                                                                          |
| CloudEntryPoint     | FirstParameterAndLastParameterQuery | If true, the Provider shall support both the `$first` & `$last` query parameters.                                                                           |
| CloudEntryPoint     | SelectParameterQuery                | If true, the Provider shall support the `$select` query parameter.                                                                                          |
| CloudEntryPoint     | FormatParameterQuery                | If true, the Provider shall support the `$format` query parameter.                                                                                          |
| CloudEntryPoint     | OrderByParameterQuery               | If true, the Provider shall support the `$orderby` query parameter.                                                                                         |
| CloudEntryPoint     | QueryPathNotation                   | If true, the Provider shall support path-like notation with `$select` (see 4.1.6.3) to disambiguate between attributes of a Collection Resource and its items. |
| CloudEntryPoint     | MaxPropertyItems                    | If set, the Provider shall support a `Properties` attribute with ≤ the specified number of elements.                                                        |
| CloudEntryPoint     | ValueScopes                         | If true, the Provider shall support the use of attributes of type `valueScope` for any Resource created via a template.                                      |
| System              | SystemComponentTemplateByValue      | If true, the Provider shall support specifying ComponentTemplates by value in SystemTemplates.                                                               |
| Machine             | DefaultInitialState                 | If set, unless otherwise provided, the Provider shall set a new Machine to this state (compatible with `InitialStates`).                                      |
| Machine             | InitialStates                       | If set, and if using a MachineTemplate with an “initialState” attribute, a Consumer shall choose an initialState from this capability’s values.               |
| Machine             | MachineConfigByValue                | If true, the Provider shall support specifying MachineConfigurations by value (and set MachineTemplateByValue to true).                                       |
| Machine             | MachineCredentialByValue            | If true, the Provider shall support specifying Credentials by value in Machine create operations.                                                           |
| Machine             | MachineImageByValue                 | If true, the Provider shall support specifying MachineImages by value in Machine create operations.                                                          |
| Machine             | MachineVolumeTemplatesByValue       | If true, the Provider shall support specifying VolumeTemplates by value in Machine create operations.                                                        |
| Machine             | MachineTemplateByValue              | If true, the Provider shall support specifying MachineTemplates by value in Machine create operations.                                                       |
| Machine             | MachineStopForce                    | If true, the Provider shall support the “force” option on stop and restart operations on Machines.                                                          |
| Machine             | MachineStopForceDefault             | If true, the Provider shall forcefully stop Machines if no other indication is provided; otherwise, stop gracefully.                                         |
| Machine             | RestoreFromImage                    | If true, the Provider supports restoring Machines from non-SNAPSHOT MachineImages.                                                                           |
| Machine             | UserData                            | If set, indicates which userData injection method shall be used by the Provider.                                                                             |
| Machine             | MachineAvailabilityLevel            | If true, the Provider supports an availability level for the Machine Resource, advertised via extension attributes in ResourceMetadata.                       |
| Credential          | CredentialTemplateByValue           | If true, the Provider shall support specifying CredentialTemplates by value in Credential create operations.                                                 |
| Volume              | SharedVolumeSupport                 | If true, the Provider shall support that a single Volume Resource can be shared by multiple Machines.                                                        |
| Volume              | VolumeConfigByValue                 | If true, the Provider shall support specifying VolumeConfigurations by value in Volume create operations.                                                    |
| Volume              | VolumeImageByValue                  | If true, the Provider shall support specifying VolumeImages by value in Volume create operations.                                                            |
| Volume              | VolumeSnapshot                      | If true, the Provider shall support creating a new VolumeImage by referencing an existing Volume.                                                            |
| Volume              | VolumeTemplateByValue               | If true, the Provider shall support specifying VolumeTemplates by value in Volume create operations.                                                          |
| Volume              | VolumeAvailabilityLevel             | If true, the Provider supports an availability level for the Volume Resource, advertised via extension attributes in ResourceMetadata.                        |
| Network             | NetworkTemplateByValue              | If true, the Provider shall support specifying NetworkTemplates by value in Network create operations.                                                       |
| Network             | DefaultInitialState                 | If set, unless otherwise provided, the Provider shall set a new Network to this state (compatible with `InitialStates`).                                       |
| Network             | InitialStates                       | If set, and if using a NetworkTemplate with an “initialState” attribute, a Consumer shall choose an initialState from this capability’s values.                |
| NetworkInterface    | NetworkInterfaceTemplateByValue     | If true, the Provider shall support specifying NetworkInterfaceTemplates by value in NetworkInterface create operations.                                       |
| NetworkInterface    | DefaultInitialState                 | If set, unless otherwise provided, the Provider shall set a new NetworkInterface to this state (compatible with `InitialStates`).                               |
| NetworkInterface    | InitialStates                       | If set, and if using a NetworkInterfaceTemplate with an “initialState” attribute, a Consumer shall choose an initialState from this capability’s values.        |
| NetworkService      | NetworkServiceTemplateByValue       | If true, the Provider shall support specifying NetworkServiceTemplates by value in NetworkService create operations.                                           |
| NetworkService      | DefaultInitialState                 | If set, unless otherwise provided, the Provider shall set a new NetworkService to this state (compatible with `InitialStates`).                                  |
| NetworkService      | InitialStates                       | If set, and if using a NetworkServiceTemplate with an “initialState” attribute, a Consumer shall choose an initialState from this capability’s values.           |
| ProtocolEndpoint    | ProtocolEndpointTemplateByValue     | If true, the Provider shall support specifying ProtocolEndpointTemplates by value in ProtocolEndpoint create operations.                                         |
| ProtocolEndpoint    | DefaultInitialState                 | If set, unless otherwise provided, the Provider shall set a new ProtocolEndpoint to this state (compatible with `InitialStates`).                                |
| ProtocolEndpoint    | InitialStates                       | If set, and if using a ProtocolEndpointTemplate with an “initialState” attribute, a Consumer shall choose an initialState from this capability’s values.           |
| ProtocolSegment     | ProtocolSegmentTemplateByValue      | If true, the Provider shall support specifying ProtocolSegmentTemplates by value in ProtocolSegment create operations.                                           |
| ProtocolSegment     | DefaultInitialState                 | If set, unless otherwise provided, the Provider shall set a new ProtocolSegment to this state (compatible with `InitialStates`).                                  |
| ProtocolSegment     | InitialStates                       | If set, and if using a ProtocolSegmentTemplate with an “initialState” attribute, a Consumer shall choose an initialState from this capability’s values.            |
| Job                 | JobRetention                        | If set, the value indicates the minimum number of minutes a job shall be retained by the Provider before deletion.                                                |
| Meter               | MeterConfigByValue                  | If true, the Provider shall support specifying MeterConfigurations by value in Meter create operations.                                                          |
| Meter               | MeterTemplateByValue                | If true, the Provider shall support specifying MeterTemplates by value in Meter create operations.                                                              |
| EventLog            | Linked                              | If true, the Provider shall delete EventLogs associated with Resources when the Resource is deleted.                                                             |


  The following examples show the ResourceMetadata for a Machine that advertises some of its capabilities:
**JSON serialization:**
```json
{
  "resourceURI": "http://schemas.dmtf.org/cimi/2/ResourceMetadata",
  "id": "http://example.com/types/Machine",
  "typeURI": "http://schemas.dmtf.org/cimi/2/Machine",
  "name": "Machine",
  "capabilities": [
    {
      "uri": "http://schemas.dmtf.org/cimi/2/capability/Machine/MachineConfigByValue",
      "value": true
    },
    {
      "uri": "http://schemas.dmtf.org/cimi/2/capability/Machine/MachineImageByValue",
      "value": true
    },
    {
      "uri": "http://schemas.dmtf.org/cimi/2/capability/Machine/DefaultInitialState",
      "value": "STARTED"
    }
  ]
}
```
**XML serialization:**
```xml
<ResourceMetadata xmlns="http://schemas.dmtf.org/cimi/2">
  <id> http://example.org/types/Machine </id>
  <typeURI> http://schemas.dmtf.org/cimi/2/Machine </typeURI>
  <name> Machine </name>
  <capabilities>
    <capability uri="http://schemas.dmtf.org/cimi/2/capability/Machine/MachineConfigByValue">
      true
    </capability>
    <capability uri="http://schemas.dmtf.org/cimi/2/capability/Machine/MachineImageByValue">
      true
    </capability>
    <capability uri="http://schemas.dmtf.org/cimi/2/capability/Machine/DefaultInitialState">
      STARTED
    </capability>
  </capabilities>
</ResourceMetadata>
```