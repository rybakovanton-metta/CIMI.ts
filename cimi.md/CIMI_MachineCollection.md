## 5.14.2 MachineCollection Resource

A MachineCollection Resource represents the Collection of Machine Resources within a Provider and follows the Collection pattern defined in clause 5.5.12.

### 5.14.2.1 Operations

**NOTE:** The "add" operation requires that a MachineTemplate be used (see 4.2.1.1).

Upon successful processing of the "add" operation, unless otherwise specified by way of the MachineTemplate `initialState` attribute, the state of the new Machine shall be the value of the `DefaultInitialState` capability, if defined. If no `DefaultInitialState` capability is defined, the default value shall be **"STOPPED."** The semantics of `initialState` shall be equivalent to the Provider issuing the appropriate actions against the new Machine to move it into that state.

Note that this controls the actions of the hypervisor and the state of the resources within the Machine (e.g., the operating system) are also influenced by the data within the MachineImage used to create the new Machine. For example, if a new Machine's `initialState` is **"STARTED"** and a SNAPSHOT MachineImage was used to create the new Machine, the Machine would not be "booted" but rather resume executing from the saved state in the MachineImage.

If a Provider is unable to change the state of the new Machine to the appropriate `initialState` (either as specified by the MachineTemplate or as implied by the previous stated rules), the Machine creation shall fail.

If a Provider is unable to create the new Machine due to invalid or inconsistent credentials in the MachineTemplate, the Machine creation process shall fail. If any credentials are included in the MachineTemplate, they shall be part of the new Machine regardless of the type of MachineImage used.

