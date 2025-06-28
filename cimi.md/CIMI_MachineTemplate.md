<!-- 
This content is derived from the DMTF Cloud Infrastructure Management Interface (CIMI) Specification
DSP0263 Version 2.0.0, Copyright © 2012, 2013, 2016 Distributed Management Task Force, Inc. (DMTF)
Original specification: https://www.dmtf.org/standards/cimi
-->

A MachineTemplate represents the set of metadata and instructions used in the creation of a
Machine. Table 19 describes the MachineTemplate attributes.

# Table 19 – MachineTemplate attributes

- **initialState** (`string`)  
  The initial state of the new Machine.  
  Possible values include the nontransient states as specified by the Machine "state" attribute (e.g., STARTED, STOPPED) and are determined by the actions supported by the Provider. Providers should advertise the list of available values through the Machine's "initialStates" capability.

- **machineConfig** (`ref`)  
  A reference to the MachineConfiguration that is used to create a Machine from this MachineTemplate.  
  Note that the attributes of the MachineConfiguration may be specified rather than a reference to an existing MachineConfiguration Resource.

- **machineImage** (`ref`)  
  A reference to the MachineImage that is used to create a Machine from this MachineTemplate.

- **credential** (`ref`)  
  A reference to the Credential that is used to create the initial login credentials for the new Machine.  
  Note that the attributes of the Credential may be specified rather than a reference to an existing Credential Resource.

- **volumes** (`volume[]`)  
  potentially describing A list of structures, each containing a reference to an existing Volume and aspects of the way that the given Volume is to be connected to the Machine during its creation from this MachineTemplate. Each volume structure has the following attributes:  
  - **initialLocation** (`string`)  
    An Operating System-specific location (path) in its namespace where the Volume appears. Support of this attribute indicates that the Provider allows for Consumers to choose where the Volume appears.  
  - **credential** (`ref`)  
    Credential for accessing the Volume to be connected (if necessary).  
  - **volume** (`ref`)  
    Reference to the Volume that is connected.

- **volumeTemplates** (`volumeTemplate[]`)  
  Credentials for this Machine. A list of structures, each containing a reference to a VolumeTemplate from which a Volume is created and connected to the Machine resulting from this MachineTemplate. Each structure can potentially also include aspects of the way in which each created Volume is connected to the created Machine. Credentials associated with the new Volume are same as the If the Machine is created as part of a System creation, the Volumes created from these Templates are considered as part of that System without the need for these VolumeTemplates to also be listed in the volumeTemplates attribute of the relevant SystemTemplate. If the same VolumeTemplate reference is listed in both the volumeTemplates attribute of a SystemTemplate and in the volumeTemplates attribute of a MachineTemplate component of that SystemTemplate, this means that multiple, distinct Volume instances are created as part of the overall System creation. Each volumeTemplate structure has the following:  
  - **initialLocation** (`string`)  
    An Operating System-specific location (path) in its namespace where the Volume appears. Support of this attribute indicates that the Provider allows for Consumers to choose where the Volume appears.  
  - **volumeTemplate** (`ref`)  
    Reference to the VolumeTemplate that is used to create a new Volume. Note that the attributes of the VolumeTemplate may be specified rather than a reference to an existing VolumeTemplate Resource.

- **interfaceTemplates** (`NetworkInterfaceTemplate[]`)  
  A list of references to NetworkInterfaceTemplates that shall be used to create a new set of NetworkInterface Resources for the new Machine. Note that the attributes of a NetworkInterfaceTemplate may be given instead of a reference to an existing NetworkInterfaceTemplate Resource.

- **userData** (`string`)  
  A Base64 encoded string whose decoded version is to be injected into Machines created by using this Template. See the discussion of injection of user-defined data below.

- **meterTemplates** (`meterTemplates[]`)  
  A list of references to MeterTemplates that shall be used to create and connect a set of new Meters to the new Machine. Note that the attributes of the MeterTemplate may be specified rather than a reference to an existing MeterTemplate Resource.

- **eventLogTemplate** (`ref`)  
  A reference to an EventLogTemplate that shall be used to create and connect a new EventLog to the new Machine. Note that the attributes of the EventLogTemplate may be specified rather than a reference to an existing EventLogTemplate Resource.

- **genResourceMetadata** (`ref`)  
  A reference to a ResourceMetadata that shall be associated with every Machine generated from this Template.
