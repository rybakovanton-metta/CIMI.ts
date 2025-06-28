<!-- 
This content is derived from the DMTF Cloud Infrastructure Management Interface (CIMI) Specification
DSP0263 Version 2.0.0, Copyright © 2012, 2013, 2016 Distributed Management Task Force, Inc. (DMTF)
Original specification: https://www.dmtf.org/standards/cimi
-->

# 5.14.1 Machine
An instantiated compute Resource that encapsulates both CPU and Memory. Table 16 describes the
Machine attributes.

## Table 16 – Machine attributes

- **state** (`string`)  
  The operational state of the Machine.  
  Allowed values are:  
  - **CREATING**: The Machine is in the process of being created.  
  - **STARTING**: The Machine is in the process of being started.  
  - **STARTED**: The Machine is available and ready for use.  
  - **STOPPING**: The Machine is in the process of being stopped.  
  - **STOPPED**: This value is the virtual equivalent of powering off a physical Machine. There is no saved CPU or memory state. Clause 5.14.1.2 defines the initial state of a Machine.  
  - **PAUSING**: The Machine in the process of being PAUSED.  
  - **PAUSED**: In this state the Machine and its virtual resources remain instantiated and resources remain allocated, similar to the "STARTED" state, but the Machine and its virtual resources are not enabled to perform tasks. This is equivalent to a “stand-by” state.  
  - **SUSPENDING**: The Machine is in the process of being suspended.  
  - **SUSPENDED**: In this state the Machine and its virtual resources are stored on nonvolatile storage. The Machine and its resources are not enabled to perform tasks.  
  - **CAPTURING**: If the Machine is undergoing the “capture” operation its state may be set to “CAPTURING”. If some operations that were accepted by the Machine before the capture are no longer available during the capture, the Machine shall be in the CAPTURING state.  
  - **RESTORING**: The Machine is in the process of being restored from a MachineImage.  
  - **DELETING**: The Machine is in the process of being deleted.  
  - **ERROR**: The Provider has detected an error in the Machine.  
  - **FAILED**: The Machine is not operational due to some error condition and in accordance to the Provider’s policies it is considered failed. This state calls for a recovery procedure, if any.  
  The operations that result in transitions to the above defined states are defined in clause 5.14.1.2.

- **cpu** (`integer`)  
  The amount of CPU that this Machine has.

- **memory** (`integer`)  
  The size of the memory (RAM) in kibibytes allocated to this Machine. If this value is increased, it implies that the Machine is allocated more RAM, and vice versa if the value is decreased.

- **disks** (`collection[Disk]`)  
  A reference to the list of disks (local storage) that are part of the Machine. Adding an element to this list creates a disk. The Disk Resources are components of the Machine.  
  **Note**: The Disk Resource type is defined in clause 5.14.1.1.1.

- **cpuArch** (`string`)  
  The CPU architecture that is supported by Machines created by using this configuration.  
  Allowed values are: 68000, Alpha, ARM, Itanium, MIPS, PA RISC, POWER, PowerPC, x86, x86 _64, z/Architecture, SPARC. Providers may define additional values.

- **cpuSpeed** (`integer`)  
  The approximate CPU speed of this Machine – in megahertz.

- **volumes** (`collection[locatedVolume]`)  
  A reference to the list of references to Volumes that are connected to this Machine. Adding a Volume to this list means that the Machine has some access to the data on the Volume. Removing a Volume from this list means that the Machine no longer has access to the data on the Volume.  
  **Note**: This Collection has the semantics of usage of the Volumes by the Machine (deleting the Machine does not cause the deletion of the referred Volumes). It is defined in clause 5.14.1.1.2.

- **interfaces** (`collection[NetworkInterface]`)  
  A reference to a list of references to NetworkInterfaces on this Machine. Each NetworkInterface Resource is a component of the Machine Resource. Each NetworkInterface instance represents an association between the Machine and a Network. NetworkInterfaces are defined in clause 5.16.13.

- **latestSnapshot** (`ref`)  
  A reference to the SNAPSHOT representing the latest state captured for this Machine (either the most recent Snapshot or the last Snapshot reverted to).  
  **Constraints:**  
  Provider: support optional; mutable  
  Consumer: support optional; read-only

- **snapshots** (`collection[MachineImage]`)  
  A reference to the list of references to the MachineImages of type SNAPSHOT taken of this Machine. This Collection has the semantics of usage of SNAPSHOT MachineImages by the Machine (The deletion of the Machine does not cause the deletion of the referred Snapshots.)

- **meters** (`collection[Meter]`)  
  A reference to the list of Meters monitored for this Machine.

- **eventLog** (`ref`)  
  A reference to the EventLog of this Machine.
 
# 5.14.1.1 Collections
## 5.14.1.1.1 Disk Collection
The Resource type for each item of this Collection is "Disk", defined in Table 17:

### Table 17 – Disk attributes
- **capacity** (`integer`)  
  The initial capacity, in kilobytes, of the disk.

- **initialLocation** (`string`)  
  Operating System-specific location (path) in its namespace where this disk first appears. After deployment, Consumers may consider moving the location of this Disk. Support of this attribute indicates that the Provider can report this information back to the Consumer.


## 5.14.1.1.2 volumes Collection
The referred Resource type for each item of this Collection is “Volume”. However because there is an
accessory attribute (initialLocation), this is not a basic but an enhanced Volume Collection. The name
“locatedVolume” is used to define the type of each Collection item. The accessory attribute is defined in
Table 18:

### Table 18 – locatedVolume accessory attributes
- **initialLocation** (`string`)  
  Operating System-specific location (path) in its namespace where this Volume first appears. Note, once deployed, Consumers might move the location of this Volume. Support of this attribute indicates that the Provider can report this information back to the Consumer.

### 5.14.1.1.3 interfaces Collection
The Resource type for each item of this Collection is “NetworkInterface”, defined in clause 5.16.13.
The Collection is a basic NetworkInterfaceCollection as described in clause 5.16.14.

### 5.14.1.1.4 snapshots Collection
The Resource type for each item of this Collection is “MachineImage”. It is a basic MachineImage
Collection. Its serialization is described in the MachineImageCollection Resource clause.

### 5.14.1.1.5 meters Collection
The Resource type for each item of this Collection is “Meter” as defined in clause 5.17.3. There is no
accessory attribute for the items in this Collection, therefore, it is a basic Meter Collection (serialized as
described in 5.5.12). See the MeterCollection Resource clause.


## 5.14.1.2 Operations
This Resource supports the Read, Update, and Delete operations. Create is supported through the
MachineCollection Resource.
The following custom operations are also defined:
**start**
/link@rel: http://schemas.dmtf.org/cimi/2/action/start
This operation shall start a Machine.
Input parameters: None.
Output parameters: None.
During the processing of this operation, the Machine shall be in the “STARTING” state.
Upon successful completion of this operation, the Machine shall be in the "STARTED" state.
If a Machine is in the "STOPPED" state, starting it shall be the virtual equivalent of powering on a
physical machine. There is no restored CPU or Memory state, so the guest OS typically performs boot or
installation tasks.
If the Machine was in the "SUSPENDED" or "PAUSED" state, starting it shall have the effect of resuming
it.

**stop**
/link@rel: http://schemas.dmtf.org/cimi/2/action/stop
This operation shall stop a Machine.

Input parameters:
1) 2) "force" - type: boolean - optional.
A flag to indicate whether the Provider shall simulate a power off condition (force=true) or shall
simulate a shutdown operation that allows applications to save their state and the file system to
be made consistent (force=false). Inclusion of this parameter by Consumers is optional and if
not specified, the Provider may choose either mechanism. Providers are encouraged to
advertise this choice by way of the MachineStopForceDefault capability.
Output parameters: None.
During the processing of this operation, the Machine shall be in the "STOPPING" state.
Upon successful completion of this operation, the Machine shall be in the "STOPPED" state. Stopping a
Machine with force=true shall be the virtual equivalent of powering off a physical machine. There is no
saved CPU or Memory state. Stopping a Machine with force=false shall result in a machine with
consistent file systems.
A Consumer may re-issue a stop operation if the state is STOPPING, perhaps with force=true, but
Providers shall not issue a force=true stop operation on their own.

**restart**
/link@rel: http://schemas.dmtf.org/cimi/2/action/restart
This operation shall restart a Machine. If the Machine is in the "STARTED" state, this operation shall
have the effect of executing the "stop" and then "start" operations. If the Machine is in the "STOPPED"
state, this operation shall have the effect of executing the "start" operation.
Input parameters:
1) 2) "force" - type: boolean - optional.
A flag to indicate whether the Provider shall simulate a power off condition (force=true) or shall
simulate a shutdown operation that allows applications to save their state and the file system to
be made consistent (force=false). Inclusion of this parameter by Consumers is optional and if
not specified, the Provider may choose either mechanism. Providers are encouraged to
advertise this choice by way of the MachineStopForceDefault capability.
Output parameters: None.
During the processing of this operation, the Machine shall be in the “STOPPING” or “STARTING” states,
as appropriate depending on its initial state.
Upon successful completion of this operation, the Machine shall be in the "STARTED" state. Restarting a
Machine shall be the virtual equivalent of powering off, and then powering on a physical machine. There
is no restored CPU or Memory state, so the guest OS typically performs boot or installation tasks.

**pause**
/link@rel: http://schemas.dmtf.org/cimi/2/action/pause
This operation shall pause a Machine.
Input parameters: None.
Output parameters: None.
During the processing of this operation, the Machine shall be in the "PAUSING" state.
Upon successful completion of this operation, the Machine shall be in the "PAUSED" state. Pausing a
Machine shall keep the Machine and its resources instantiated, but the Machine shall not be available
to perform any tasks. The current state of the CPU and Memory shall be retained in volatile memory.

**suspend**
/link@rel: http://schemas.dmtf.org/cimi/2/action/suspend
This operation shall suspend a Machine.
Input parameters: None.
Output parameters: None.
During the processing of this operation, the Machine shall be in the "SUSPENDING" state.
Upon successful completion of this operation, the Machine shall be in the "SUSPENDED" state.
Suspending a Machine shall keep the Machine and its resources instantiated, but the Machine shall
not be available to perform any tasks. The current state of the CPU and Memory shall be retained in
non-volatile memory.

**capture**
/link@rel: http://schemas.dmtf.org/cimi/2/action/capture
This operation shall create a new MachineImage from an existing Machine. This operation is defined
within the MachineImage Resource; see 5.14.7.1 for more details. Note that while this operation is
performed against a MachineImage, its presence in the Machine serialization is used to advertise
support for the operation.

**Snapshotting a Machine**
/link@rel: http://schemas.dmtf.org/cimi/2/action/snapshot
This operation shall create a new SNAPSHOT MachineImage from an existing Machine. This operation
is defined within the MachineImage Resource; see 5.14.7.1 for more details. Note that while this
operation is performed against a MachineImage, its presence in the Machine serialization is used to
advertise support for the operation.

**Restoring a Machine**
/link@rel: http://schemas.dmtf.org/cimi/2/action/restore
This operation shall restore a Machine from a previously created MachineImage.
Input parameters:
1) 2) "image" - type: URI - mandatory.
A reference to the Machine Image.
Output parameters: None.
During the processing of this operation, the Machine shall be in the "RESTORING" state.
Upon successful completion of this operation, the Machine shall be in the same state as the state
specified in the MachineImage, if specified. See 5.14.1.2 for more details.
Note that Providers can indicate support for restoring from non-SNAPSHOT MachineImages by way of
the Machine "RestoreFromImage" capability. If the RestoreFromImage capability is not supported, and
the restore operation is supported, the restore operation can only restore from a SNAPSHOT
MachineImage.

**connectvolume**
/link@rel: http://schemas.dmtf.org/cimi/2/action/connectvolume
This operation shall start a Machine.
Input parameters: Volume reference, initialLocation, Credentials, properties. The properties capture
Provider-specific options for the operation,
Output parameters: None.